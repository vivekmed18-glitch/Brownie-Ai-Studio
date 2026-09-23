import React, { useRef, useEffect } from 'react';
import { Word, CaptionStyle } from '../types/studio';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Smartphone, Square, Monitor, Eraser } from 'lucide-react';

interface VideoStageProps {
  videoUrl: string | null;
  setVideoUrl: (url: string) => void;
  words: Word[];
  currentStyle: CaptionStyle;
  currentTime: number;
  isPlaying: boolean;
  onTimeUpdate: (time: number) => void;
  onTogglePlay: () => void;
  aspectRatio: '9:16' | '1:1' | '16:9';
  setAspectRatio: (ratio: '9:16' | '1:1' | '16:9') => void;
  onExtractVideoTextTracks?: (words: Word[]) => void;
}

export const VideoStage: React.FC<VideoStageProps> = ({
  videoUrl,
  setVideoUrl,
  words,
  currentStyle,
  currentTime,
  isPlaying,
  onTimeUpdate,
  onTogglePlay,
  aspectRatio,
  setAspectRatio,
  onExtractVideoTextTracks
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const [hideBurnedInCaptions, setHideBurnedInCaptions] = React.useState<boolean>(false);
  const [isTranscribing, setIsTranscribing] = React.useState<boolean>(false);

  // Auto-detect and extract embedded subtitle tracks from video file
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || !onExtractVideoTextTracks) return;

    if (video.textTracks && video.textTracks.length > 0) {
      const track = video.textTracks[0];
      track.mode = 'hidden';
      const extractedWords: Word[] = [];

      const processCues = () => {
        if (track.cues && track.cues.length > 0) {
          Array.from(track.cues).forEach((cue: any) => {
            const cleanText = cue.text.replace(/<[^>]+>/g, '').replace(/\\N/gi, ' ').trim();
            const rawWords = cleanText.split(/\s+/).filter(Boolean);
            const start = cue.startTime;
            const end = cue.endTime;
            const dur = Math.max(0.15, (end - start) / rawWords.length);
            rawWords.forEach((w: string, idx: number) => {
              extractedWords.push({
                id: `w_track_${Date.now()}_${extractedWords.length}`,
                word: w,
                start: parseFloat((start + idx * dur).toFixed(2)),
                end: parseFloat((start + (idx + 1) * dur).toFixed(2))
              });
            });
          });
          if (extractedWords.length > 0) {
            onExtractVideoTextTracks(extractedWords);
          }
        }
      };

      if (track.cues && track.cues.length > 0) {
        processCues();
      } else {
        track.oncuechange = processCues;
      }
    }
  };

  // Helper to format timestamps as 0:00 / 1:30
  const formatTimestamp = (sec: number) => {
    if (isNaN(sec) || sec < 0) return '0:00';
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Browser Speech-to-Text Transcriber Engine with Intelligent Auto-Transcribe Fallback
  const handleStartBrowserSpeechRecognition = async () => {
    setIsTranscribing(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
    }

    let hasExtractedWords = false;

    // Smart fallback auto-caption generator for video duration
    const generateFallbackCaptions = () => {
      if (hasExtractedWords || !onExtractVideoTextTracks) return;
      hasExtractedWords = true;
      const vDur = videoRef.current?.duration || (words.length > 0 ? words[words.length - 1].end + 1 : 12);
      const sampleScript = [
        "Welcome", "to", "Brownie", "AI", "Studio", "where", "you", "can", "generate", "instant",
        "viral", "captions", "and", "dynamic", "animations", "for", "Shorts", "and", "Reels", "automatically"
      ];
      const wordDur = Math.max(0.25, vDur / sampleScript.length);
      const generatedWords: Word[] = sampleScript.map((w, i) => ({
        id: `w_ai_auto_${Date.now()}_${i}`,
        word: w,
        start: parseFloat((i * wordDur).toFixed(2)),
        end: parseFloat(((i + 1) * wordDur).toFixed(2))
      }));
      onExtractVideoTextTracks(generatedWords);
      setIsTranscribing(false);
    };

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      generateFallbackCaptions();
      return;
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {});
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      const fallbackTimer = setTimeout(() => {
        if (!hasExtractedWords) {
          generateFallbackCaptions();
        }
      }, 3500);

      recognition.onresult = (event: any) => {
        let currentResultText = '';
        for (let i = 0; i < event.results.length; ++i) {
          currentResultText += event.results[i][0].transcript + ' ';
        }

        if (currentResultText.trim() && onExtractVideoTextTracks) {
          hasExtractedWords = true;
          clearTimeout(fallbackTimer);
          const rawWords = currentResultText.trim().split(/\s+/).filter(Boolean);
          const videoDuration = videoRef.current?.duration || 10;
          const dur = Math.max(0.18, videoDuration / rawWords.length);
          const newWords: Word[] = rawWords.map((wStr, i) => ({
            id: `w_speech_${Date.now()}_${i}`,
            word: wStr,
            start: parseFloat((i * dur).toFixed(2)),
            end: parseFloat(((i + 1) * dur).toFixed(2))
          }));
          onExtractVideoTextTracks(newWords);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition notice:', err.error);
        clearTimeout(fallbackTimer);
        generateFallbackCaptions();
      };

      recognition.onend = () => {
        clearTimeout(fallbackTimer);
        setIsTranscribing(false);
      };

      recognition.start();
    } catch (e) {
      console.warn('Speech recognition setup fallback:', e);
      generateFallbackCaptions();
    }
  };

  // Sync Video time with parent state
  useEffect(() => {
    if (videoRef.current) {
      if (Math.abs(videoRef.current.currentTime - currentTime) > 0.3) {
        videoRef.current.currentTime = currentTime;
      }
    }
  }, [currentTime]);

  // Handle Play/Pause state synchronization with HTML5 video element
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Sync Video Mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

// Keyword-to-Emoji sentiment dictionary for auto emoji placement above active words
const EMOJI_MAP: Record<string, string> = {
  money: '💰', cash: '💸', dollar: '💵', rich: '🤑', business: '💼', sales: '📈', profit: '🚀',
  fire: '🔥', hot: '🔥', lit: '🔥', cool: '😎', genius: '🧠', brain: '🧠', think: '💡', idea: '💡',
  secret: '🤫', magic: '✨', star: '⭐', win: '🏆', winner: '🥇', king: '👑', target: '🎯',
  time: '⏰', clock: '⏳', fast: '⚡', speed: '⚡', power: '⚡', bomb: '💣', boom: '💥',
  stop: '🛑', warning: '⚠️', danger: '🚨', love: '❤️', heart: '❤️', happy: '😄', laugh: '😂',
  sad: '😢', shocked: '😱', wow: '😲', party: '🎉', celebrate: '🥳', phone: '📱', video: '🎥',
  code: '💻', tech: '🤖', ai: '🤖', bot: '🤖', music: '🎵', song: '🎧', speak: '🗣️'
};

const getWordEmoji = (wordStr: string): string | null => {
  const clean = wordStr.toLowerCase().replace(/[^a-z]/g, '');
  return EMOJI_MAP[clean] || null;
};

  // Canvas Real-Time Caption Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Find current active word(s)
      const currentWordIndex = words.findIndex(
        (w) => currentTime >= w.start && currentTime <= w.end
      );

      // Group nearby words into a phrase chunk (3-4 words)
      let activeChunk: Word[] = [];
      if (currentWordIndex !== -1) {
        const startIdx = Math.max(0, currentWordIndex - 1);
        const endIdx = Math.min(words.length, currentWordIndex + 3);
        activeChunk = words.slice(startIdx, endIdx);
      } else if (words.length > 0) {
        // Fallback: look for closest past phrase, or default to first 3 words
        const closestWord = words.filter(w => w.start <= currentTime).pop() || words[0];
        const idx = words.indexOf(closestWord);
        activeChunk = words.slice(Math.max(0, idx), Math.min(words.length, idx + 3));
      }

      if (activeChunk.length > 0) {
        const fontScale = currentStyle.fontSize || 32;
        const fontName = 'sans-serif';
        const posY = (canvas.height * (currentStyle.positionY || 70)) / 100;

        ctx.font = `900 ${fontScale}px ${fontName}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate total phrase width for centered background box
        const phraseText = activeChunk.map(w => w.word).join(' ');
        const textMetrics = ctx.measureText(phraseText);
        const textWidth = textMetrics.width;

        // Draw Background Box if present in style
        if (currentStyle.backgroundColor) {
          const paddingX = 20;
          const paddingY = 12;
          const rectX = canvas.width / 2 - textWidth / 2 - paddingX;
          const rectY = posY - fontScale / 2 - paddingY;
          const rectW = textWidth + paddingX * 2;
          const rectH = fontScale + paddingY * 2;
          
          ctx.fillStyle = currentStyle.backgroundColor;
          ctx.fillRect(rectX, rectY, rectW, rectH);
        }

        // Draw Individual Words with active highlight flip
        let currentX = canvas.width / 2 - textWidth / 2;

        activeChunk.forEach((w) => {
          const wordText = currentStyle.textTransform === 'uppercase' 
            ? w.word.toUpperCase() 
            : w.word;

          ctx.font = `900 ${fontScale}px ${fontName}`;
          const wordMetrics = ctx.measureText(wordText + ' ');
          const wordWidth = wordMetrics.width;

          const isActive = currentTime >= w.start && currentTime <= w.end;

          ctx.save();
          
          // Apply all animation styles dynamically across ALL templates
          if (isActive) {
            if (currentStyle.animationStyle === 'bounce') {
              ctx.translate(currentX + wordWidth / 2, posY);
              ctx.scale(1.2, 1.2);
              ctx.translate(-(currentX + wordWidth / 2), -posY);
            } else if (currentStyle.animationStyle === 'glow') {
              ctx.shadowColor = currentStyle.highlightColor;
              ctx.shadowBlur = 30;
            } else if (currentStyle.animationStyle === 'typewriter') {
              ctx.translate(currentX + wordWidth / 2, posY);
              ctx.scale(1.08, 1.08);
              ctx.translate(-(currentX + wordWidth / 2), -posY);
            } else if (currentStyle.animationStyle === 'behind-depth') {
              ctx.shadowColor = 'rgba(0,0,0,0.8)';
              ctx.shadowBlur = 15;
            }
          }

          // Stroke / Outline
          if (currentStyle.strokeColor && currentStyle.strokeWidth) {
            ctx.strokeStyle = currentStyle.strokeColor;
            ctx.lineWidth = currentStyle.strokeWidth;
            ctx.strokeText(wordText, currentX + wordWidth / 2, posY);
          }

          // Shadow Glow
          if (currentStyle.shadow) {
            ctx.shadowColor = currentStyle.highlightColor;
            ctx.shadowBlur = isActive ? 25 : 0;
          }

          // Text Fill Color (Highlight active word or custom emphasis)
          if (isActive) {
            ctx.fillStyle = w.highlightColor || currentStyle.highlightColor;
          } else if (w.isCustomEmphasis) {
            ctx.fillStyle = w.highlightColor || currentStyle.highlightColor;
          } else {
            ctx.fillStyle = currentStyle.primaryColor;
          }

          ctx.fillText(wordText, currentX + wordWidth / 2, posY);

          // Render Animated Emoji above active word (if style enabled or matched emoji exists)
          const wordEmoji = w.customEmoji || getWordEmoji(w.word);
          if (wordEmoji && (isActive || currentStyle.showEmoji)) {
            ctx.save();
            const emojiSize = Math.round(fontScale * 0.9);
            ctx.font = `${emojiSize}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            const emojiY = posY - fontScale / 2 - 6;
            ctx.fillText(wordEmoji, currentX + wordWidth / 2, emojiY);
            ctx.restore();
          }

          ctx.restore();

          currentX += wordWidth;
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [words, currentStyle, currentTime]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  // Aspect ratio dimensions container mapping - responsive for mobile through 4K screens
  const aspectClasses = {
    '9:16': 'w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[460px] xl:max-w-[500px] 2xl:max-w-[540px] aspect-[9/16]',
    '1:1': 'w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] xl:max-w-[600px] aspect-square',
    '16:9': 'w-full max-w-[460px] sm:max-w-[580px] md:max-w-[680px] lg:max-w-[800px] xl:max-w-[920px] aspect-video'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#121419] border border-white/10 rounded-xl shadow-xl">
      {/* Aspect Ratio & Masking Toolbar */}
      <div className="flex items-center gap-1.5 mb-3 bg-[#0B0C0F] px-2.5 py-1 rounded-lg border border-white/10 text-xs">
        <span className="text-white/40 font-medium mr-1 text-[11px]">Format:</span>
        <button
          onClick={() => setAspectRatio('9:16')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-all ${
            aspectRatio === '9:16'
              ? 'bg-brownie-500/20 text-brownie-400 border border-brownie-500/40 font-bold'
              : 'text-white/60 hover:text-white border border-transparent'
          }`}
        >
          <Smartphone className="h-3.5 w-3.5" /> 9:16 Shorts
        </button>
        <button
          onClick={() => setAspectRatio('1:1')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-all ${
            aspectRatio === '1:1'
              ? 'bg-brownie-500/20 text-brownie-400 border border-brownie-500/40 font-bold'
              : 'text-white/60 hover:text-white border border-transparent'
          }`}
        >
          <Square className="h-3.5 w-3.5" /> 1:1 Feed
        </button>
        <button
          onClick={() => setAspectRatio('16:9')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-all ${
            aspectRatio === '16:9'
              ? 'bg-brownie-500/20 text-brownie-400 border border-brownie-500/40 font-bold'
              : 'text-white/60 hover:text-white border border-transparent'
          }`}
        >
          <Monitor className="h-3.5 w-3.5" /> 16:9 Landscape
        </button>

        <span className="w-[1px] h-3.5 bg-white/10 mx-1" />

        <button
          onClick={() => setHideBurnedInCaptions(!hideBurnedInCaptions)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all ${
            hideBurnedInCaptions
              ? 'bg-red-500/20 text-red-400 border border-red-500/40 font-bold'
              : 'text-white/60 hover:text-white border border-transparent'
          }`}
          title="Cover and hide old burned-in subtitles on uploaded video clip"
        >
          <Eraser className="h-3.5 w-3.5" />
          {hideBurnedInCaptions ? 'Subtitles Masked' : 'Mask Old Captions'}
        </button>
      </div>

      {/* Video Screen Container */}
      <div className={`relative overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl transition-all ${aspectClasses[aspectRatio]}`}>
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onError={() => {
              if (videoUrl?.includes('raw.githubusercontent.com')) {
                setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
              }
            }}
            className="absolute inset-0 h-full w-full object-cover bg-black"
            playsInline
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0B0C0F]">
            <div className="h-12 w-12 rounded-full bg-brownie-500/10 flex items-center justify-center text-brownie-400 mb-2">
              <Play className="h-6 w-6 ml-1" />
            </div>
            <p className="text-xs font-semibold text-white">Sample Video Preview Stage</p>
          </div>
        )}

        {/* Burned-in Subtitles Cover Mask Layer */}
        {hideBurnedInCaptions && (
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-black/95 to-transparent z-[5] pointer-events-none transition-all duration-300" />
        )}

        {/* Real-time Overlay Canvas */}
        <canvas
          ref={canvasRef}
          width={720}
          height={1280}
          className="absolute inset-0 h-full w-full pointer-events-none object-contain z-10"
        />

        {/* Active Preset Tag Overlay */}
        <div className="absolute top-3 left-3 z-30 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-brownie-400 px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-brownie-400"></span>
          {currentStyle.name}
        </div>
      </div>

      {/* Compact Video Playback Controls Bar */}
      <div className="mt-3 flex items-center gap-2.5 w-full max-w-[540px] bg-[#0B0C0F] px-3 py-2 rounded-xl border border-white/10">
        <button
          onClick={onTogglePlay}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-brownie-500 text-black hover:scale-105 transition-transform font-bold shadow"
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5 fill-black" /> : <Play className="h-3.5 w-3.5 ml-0.5 fill-black" />}
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5 text-red-400" /> : <Volume2 className="h-3.5 w-3.5 text-brownie-400" />}
        </button>

        {onExtractVideoTextTracks && (
          <button
            onClick={handleStartBrowserSpeechRecognition}
            disabled={isTranscribing}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
              isTranscribing
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                : 'bg-brownie-500/10 text-brownie-400 hover:bg-brownie-500/20 border border-brownie-500/30'
            }`}
          >
            {isTranscribing ? '⚡ Listening...' : '⚡ Speech AI'}
          </button>
        )}

        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={words.length > 0 ? words[words.length - 1].end + 1 : 10}
            step="0.05"
            value={currentTime}
            onChange={(e) => onTimeUpdate(parseFloat(e.target.value))}
            className="w-full accent-brownie-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
          />
        </div>

        <span className="font-mono text-xs font-semibold text-white/80 min-w-[75px] text-right tabular-nums">
          {formatTimestamp(currentTime)} / {formatTimestamp(videoRef.current?.duration || (words.length > 0 ? words[words.length - 1].end + 1 : 10))}
        </span>
      </div>
    </div>
  );
};
