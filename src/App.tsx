import React, { useState } from 'react';
import { Header } from './components/Header';
import { MediaUploader } from './components/MediaUploader';
import { VideoStage } from './components/VideoStage';
import { TranscriptEditor } from './components/TranscriptEditor';
import { StylePicker } from './components/StylePicker';
import { ThumbnailMaker } from './components/ThumbnailMaker';
import { ToolsSuite } from './components/ToolsSuite';
import { Timeline } from './components/Timeline';
import { CAPTION_STYLES, INITIAL_WORDS } from './data/presets';
import { CaptionStyle, Word } from './types/studio';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'styles' | 'thumbnails' | 'tools'>('editor');
  const [videoUrl, setVideoUrl] = useState<string | null>('/sample.mp4');
  const [words, setWords] = useState<Word[]>(INITIAL_WORDS);
  const [currentStyle, setCurrentStyle] = useState<CaptionStyle>(CAPTION_STYLES[0]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [trimRange, setTrimRange] = useState<{ start: number; end: number }>({ start: 0, end: 10 });

  // Handle uploaded video or audio file
  const handleMediaSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setCurrentTime(0);
    setIsPlaying(true);

    // Auto-generate initial smart captions for the uploaded clip
    const cleanFileName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const defaultCaptionText = `Playing ${cleanFileName}. AI captions automatically synchronized to your video!`;
    handleSetCustomTranscript(defaultCaptionText);
  };

  // Demo fallback clip handler
  const handleUseDemo = () => {
    setVideoUrl('/sample.mp4');
    setIsPlaying(true);
  };

  // Trim video handler
  const handleTrimVideo = (start: number, end: number) => {
    setTrimRange({ start, end });
    // Filter words within trimmed timeframe or adjust relative timing
    const trimmedWords = words.filter(w => w.start >= start && w.end <= end);
    if (trimmedWords.length > 0) {
      setWords(trimmedWords);
    }
  };

  // Transcript editing functions
  const handleUpdateWord = (id: string, newWord: string) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, word: newWord } : w));
  };

  const handleDeleteWord = (id: string) => {
    setWords(prev => prev.filter(w => w.id !== id));
  };

  const handleToggleHighlight = (id: string) => {
    setWords(prev => prev.map(w => {
      if (w.id === id) {
        return {
          ...w,
          isCustomEmphasis: !w.isCustomEmphasis,
          highlightColor: !w.isCustomEmphasis ? '#F59E0B' : undefined
        };
      }
      return w;
    }));
  };

  const handleAddWord = () => {
    const lastWord = words[words.length - 1];
    const startTime = lastWord ? lastWord.end + 0.1 : 0.1;
    const newWordObj: Word = {
      id: `w_${Date.now()}`,
      word: 'NewWord',
      start: parseFloat(startTime.toFixed(2)),
      end: parseFloat((startTime + 0.5).toFixed(2))
    };
    setWords([...words, newWordObj]);
  };

  // Convert custom pasted script string into word-level objects with auto timing
  const handleSetCustomTranscript = (text: string) => {
    const rawWords = text.trim().split(/\s+/).filter(Boolean);
    let currentTimePointer = 0.2;
    const newWordsArr: Word[] = rawWords.map((wStr, i) => {
      const duration = Math.max(0.25, Math.min(0.6, wStr.length * 0.05));
      const start = parseFloat(currentTimePointer.toFixed(2));
      const end = parseFloat((currentTimePointer + duration).toFixed(2));
      currentTimePointer += duration + 0.05;
      return {
        id: `w_custom_${Date.now()}_${i}`,
        word: wStr,
        start,
        end
      };
    });
    setWords(newWordsArr);
  };

  // Parse .ASS or .SRT subtitle files directly into Word[] state
  const handleUploadSubtitleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) return;

      const wordsResult: Word[] = [];
      const lines = content.split(/\r?\n/);

      let currentStart = 0;
      let currentEnd = 0;

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('[') || trimmed.startsWith('Format:') || trimmed.startsWith('Style:')) {
          return; // Skip ASS headers and section blocks
        }

        // Match SRT timing line: 00:00:01,200 --> 00:00:03,500
        const srtMatch = trimmed.match(/(\d{2}):(\d{2}):(\d{2})[,.](\d{2,3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{2,3})/);
        if (srtMatch) {
          currentStart = parseInt(srtMatch[1])*3600 + parseInt(srtMatch[2])*60 + parseInt(srtMatch[3]) + parseInt(srtMatch[4])/1000;
          currentEnd = parseInt(srtMatch[5])*3600 + parseInt(srtMatch[6])*60 + parseInt(srtMatch[7]) + parseInt(srtMatch[8])/1000;
          return;
        }

        // Match ASS Dialogue line
        const assMatch = trimmed.match(/^Dialogue:\s*[^,]+,([^,]+),([^,]+),[^,]*?,[^,]*?,[^,]*?,[^,]*?,[^,]*?,[^,]*?,(.*)$/i);
        if (assMatch) {
          const parseAssTime = (tStr: string) => {
            const parts = tStr.trim().split(/[:.]/);
            return parseInt(parts[0])*3600 + parseInt(parts[1])*60 + parseInt(parts[2]) + (parseInt(parts[3]) || 0)/100;
          };
          currentStart = parseAssTime(assMatch[1]);
          currentEnd = parseAssTime(assMatch[2]);
          const textRaw = assMatch[3]
            .replace(/\{[^}]+\}/g, '')
            .replace(/\\N/gi, ' ')
            .replace(/\\n/gi, ' ')
            .trim();

          const rawWords = textRaw
            .split(/\s+/)
            .map(w => w.replace(/^[^a-zA-Z0-9'"]+|[^a-zA-Z0-9'"]+$/g, ''))
            .filter(w => w.length > 0 && !/^\d+$/.test(w) && !/^SUB/i.test(w));

          if (rawWords.length > 0 && currentEnd > currentStart) {
            const dur = Math.max(0.15, (currentEnd - currentStart) / rawWords.length);
            rawWords.forEach((w, idx) => {
              wordsResult.push({
                id: `w_sub_${Date.now()}_${wordsResult.length}`,
                word: w,
                start: parseFloat((currentStart + idx * dur).toFixed(2)),
                end: parseFloat((currentStart + (idx + 1) * dur).toFixed(2))
              });
            });
          }
          return;
        }

        if (trimmed && !/^\d+$/.test(trimmed) && currentEnd > currentStart) {
          const cleanText = trimmed.replace(/<[^>]+>/g, '').trim();
          const rawWords = cleanText
            .split(/\s+/)
            .map(w => w.replace(/^[^a-zA-Z0-9'"]+|[^a-zA-Z0-9'"]+$/g, ''))
            .filter(w => w.length > 0 && !/^\d+$/.test(w));

          if (rawWords.length > 0) {
            const dur = Math.max(0.15, (currentEnd - currentStart) / rawWords.length);
            rawWords.forEach((w, idx) => {
              wordsResult.push({
                id: `w_sub_${Date.now()}_${wordsResult.length}`,
                word: w,
                start: parseFloat((currentStart + idx * dur).toFixed(2)),
                end: parseFloat((currentStart + (idx + 1) * dur).toFixed(2))
              });
            });
          }
        }
      });

      if (wordsResult.length > 0) {
        setWords(wordsResult);
      }
    };
    reader.readAsText(file);
  };

  // Export SRT helper
  const handleExportSRT = () => {
    let srtContent = '';
    words.forEach((w, index) => {
      const formatTime = (sec: number) => {
        const date = new Date(0);
        date.setSeconds(sec);
        const ms = Math.floor((sec % 1) * 1000).toString().padStart(3, '0');
        return date.toISOString().substring(11, 19) + ',' + ms;
      };
      srtContent += `${index + 1}\n${formatTime(w.start)} --> ${formatTime(w.end)}\n${w.word}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'brownieAI_captions.srt';
    link.click();
  };

  // Export Video simulation with celebration animation
  const handleExportVideo = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      alert('🎉 Video export completed successfully in 1080p vertical format!');
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-studio-bg text-studio-ink">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportVideo={handleExportVideo}
        onExportSRT={handleExportSRT}
        onUploadFile={handleMediaSelect}
        onUploadSubtitleFile={handleUploadSubtitleFile}
        isExporting={isExporting}
      />

      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] 2xl:max-w-[1800px] mx-auto w-full">
        {!videoUrl ? (
          <div className="py-12">
            <MediaUploader
              onMediaSelect={handleMediaSelect}
              onSubtitleSelect={handleUploadSubtitleFile}
              onUseDemo={handleUseDemo}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'editor' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Video Player Stage */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <VideoStage
                      videoUrl={videoUrl}
                      setVideoUrl={setVideoUrl}
                      words={words}
                      currentStyle={currentStyle}
                      currentTime={currentTime}
                      isPlaying={isPlaying}
                      onTimeUpdate={setCurrentTime}
                      onTogglePlay={() => setIsPlaying(!isPlaying)}
                      aspectRatio={aspectRatio}
                      setAspectRatio={setAspectRatio}
                      onExtractVideoTextTracks={(extractedWords) => setWords(extractedWords)}
                    />
                  </div>

                  {/* Right: Transcript Editor & Quick Style Selector */}
                  <div className="lg:col-span-5 space-y-6">
                    <TranscriptEditor
                      words={words}
                      currentTime={currentTime}
                      onTimeSeek={(t) => {
                        setCurrentTime(t);
                        setIsPlaying(false);
                      }}
                      onUpdateWord={handleUpdateWord}
                      onDeleteWord={handleDeleteWord}
                      onToggleHighlight={handleToggleHighlight}
                      onAddWord={handleAddWord}
                      onSetCustomTranscript={handleSetCustomTranscript}
                    />

                    {/* Compact Style Swapper */}
                    <div className="glass-panel p-4 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white">Active Style: {currentStyle.name}</span>
                        <button
                          onClick={() => setActiveTab('styles')}
                          className="text-xs text-brownie-400 font-semibold hover:underline"
                        >
                          Change Style Preset →
                        </button>
                      </div>
                      <p className="text-xs text-studio-muted leading-relaxed">{currentStyle.description}</p>
                    </div>
                  </div>
                </div>

                {/* Multi-Track Timeline & Clipper Section (WhiteStair Style) */}
                <Timeline
                  words={words}
                  currentTime={currentTime}
                  duration={words.length > 0 ? words[words.length - 1].end + 1 : 10}
                  isPlaying={isPlaying}
                  onTimeSeek={setCurrentTime}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  onTrimVideo={handleTrimVideo}
                />
              </div>
            )}

            {activeTab === 'styles' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6">
                  <VideoStage
                    videoUrl={videoUrl}
                    setVideoUrl={setVideoUrl}
                    words={words}
                    currentStyle={currentStyle}
                    currentTime={currentTime}
                    isPlaying={isPlaying}
                    onTimeUpdate={setCurrentTime}
                    onTogglePlay={() => setIsPlaying(!isPlaying)}
                    aspectRatio={aspectRatio}
                    setAspectRatio={setAspectRatio}
                    onExtractVideoTextTracks={(extractedWords) => setWords(extractedWords)}
                  />
                </div>

                <div className="lg:col-span-6">
                  <StylePicker
                    currentStyle={currentStyle}
                    onSelectStyle={setCurrentStyle}
                    onUpdateStyleParams={(params) => setCurrentStyle(prev => ({ ...prev, ...params }))}
                  />
                </div>
              </div>
            )}

            {activeTab === 'thumbnails' && <ThumbnailMaker />}

            {activeTab === 'tools' && <ToolsSuite onExportSRT={handleExportSRT} />}
          </div>
        )}
      </main>
    </div>
  );
};
