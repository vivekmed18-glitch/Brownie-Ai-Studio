import React, { useRef, useEffect } from 'react';
import { Word, CaptionStyle } from '../types/studio';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Smartphone, Square, Monitor } from 'lucide-react';

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
  setAspectRatio
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync Video time with parent state
  useEffect(() => {
    if (videoRef.current) {
      if (Math.abs(videoRef.current.currentTime - currentTime) > 0.3) {
        videoRef.current.currentTime = currentTime;
      }
    }
  }, [currentTime]);

  // Handle Play/Pause sync
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

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
      } else {
        // Fallback: look for closest past phrase
        const closestWord = words.filter(w => w.start <= currentTime).pop();
        if (closestWord) {
          const idx = words.indexOf(closestWord);
          activeChunk = words.slice(Math.max(0, idx - 1), Math.min(words.length, idx + 2));
        }
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
          
          // Apply animation styles
          if (isActive) {
            if (currentStyle.animationStyle === 'bounce') {
              ctx.translate(currentX + wordWidth / 2, posY);
              ctx.scale(1.15, 1.15);
              ctx.translate(-(currentX + wordWidth / 2), -posY);
            }
          }

          // Stroke / Outline
          if (currentStyle.strokeColor && currentStyle.strokeWidth) {
            ctx.strokeStyle = currentStyle.strokeColor;
            ctx.lineWidth = currentStyle.strokeWidth;
            ctx.strokeText(wordText, currentX + wordWidth / 2, posY);
          }

          // Glow Shadow
          if (currentStyle.shadow) {
            ctx.shadowColor = currentStyle.highlightColor;
            ctx.shadowBlur = isActive ? 20 : 0;
          }

          // Text Fill Color (Highlight if active or custom emphasis)
          if (isActive) {
            ctx.fillStyle = w.highlightColor || currentStyle.highlightColor;
          } else if (w.isCustomEmphasis) {
            ctx.fillStyle = w.highlightColor || currentStyle.highlightColor;
          } else {
            ctx.fillStyle = currentStyle.primaryColor;
          }

          ctx.fillText(wordText, currentX + wordWidth / 2, posY);
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
    <div className="flex flex-col items-center justify-center p-5 glass-panel rounded-2xl">
      {/* Aspect Ratio Toolbar */}
      <div className="flex items-center gap-1.5 mb-4 bg-[#0A0A0B] px-3 py-1.5 rounded-xl border border-white/5 text-xs">
        <span className="text-white/40 font-medium mr-1 text-[11px]">Aspect Ratio:</span>
        <button
          onClick={() => setAspectRatio('9:16')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all ${
            aspectRatio === '9:16'
              ? 'bg-brownie-500/15 text-brownie-400 border border-brownie-500/40 font-bold'
              : 'text-white/60 hover:text-white border border-transparent'
          }`}
        >
          <Smartphone className="h-3.5 w-3.5" /> 9:16 Shorts
        </button>
        <button
          onClick={() => setAspectRatio('1:1')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all ${
            aspectRatio === '1:1'
              ? 'bg-brownie-500/15 text-brownie-400 border border-brownie-500/40 font-bold'
              : 'text-white/60 hover:text-white border border-transparent'
          }`}
        >
          <Square className="h-3.5 w-3.5" /> 1:1 Feed
        </button>
        <button
          onClick={() => setAspectRatio('16:9')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all ${
            aspectRatio === '16:9'
              ? 'bg-brownie-500/15 text-brownie-400 border border-brownie-500/40 font-bold'
              : 'text-white/60 hover:text-white border border-transparent'
          }`}
        >
          <Monitor className="h-3.5 w-3.5" /> 16:9 Landscape
        </button>
      </div>

      {/* Video Screen Container */}
      <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl transition-all ${aspectClasses[aspectRatio]}`}>
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onError={() => {
              // Fallback to secondary sample video if primary fails to load
              if (videoUrl?.includes('raw.githubusercontent.com')) {
                setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
              }
            }}
            className="absolute inset-0 h-full w-full object-cover bg-gradient-to-tr from-purple-950 via-zinc-900 to-amber-950"
            playsInline
            muted
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-zinc-900 to-black">
            <div className="h-16 w-16 rounded-full bg-brownie-500/10 flex items-center justify-center text-brownie-400 mb-3 animate-pulse">
              <Play className="h-8 w-8 ml-1" />
            </div>
            <p className="text-sm font-semibold text-white">Sample Video Preview Stage</p>
            <p className="text-xs text-studio-muted mt-1">Upload a clip or click sample to test live caption rendering</p>
          </div>
        )}

        {/* Real-time Overlay Canvas */}
        <canvas
          ref={canvasRef}
          width={720}
          height={1280}
          className="absolute inset-0 h-full w-full pointer-events-none object-contain"
        />

        {/* Style Tag Overlay */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-brownie-400 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-brownie-400 animate-ping"></span>
          {currentStyle.name} ({currentStyle.animationStyle})
        </div>
      </div>

      {/* Playback Controls */}
      <div className="mt-4 flex items-center gap-4 w-full max-w-[540px] bg-[#0A0A0B] px-4 py-2.5 rounded-xl border border-white/5">
        <button
          onClick={onTogglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brownie-500 text-black hover:scale-105 transition-transform font-bold shadow-md shadow-brownie-500/20"
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 ml-0.5 fill-black" />}
        </button>

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

        <span className="font-mono text-xs text-white/50 min-w-[50px] text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {currentTime.toFixed(1)}s
        </span>
      </div>
    </div>
  );
};
