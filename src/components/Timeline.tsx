import React, { useRef, useState } from 'react';
import { Word } from '../types/studio';
import { Scissors, Play, Pause, ZoomIn, ZoomOut, Volume2, Plus, Type, Music, Smile, Layers, Clock, ShieldAlert } from 'lucide-react';

interface TimelineProps {
  words: Word[];
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTimeSeek: (time: number) => void;
  onTogglePlay: () => void;
  onTrimVideo?: (startTime: number, endTime: number) => void;
  onUpdateWordTiming?: (id: string, start: number, end: number) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  words,
  currentTime,
  duration = 10,
  isPlaying,
  onTimeSeek,
  onTogglePlay,
  onTrimVideo,
  onUpdateWordTiming
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Trim handle bounds (seconds)
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(duration || 10);
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 1x to 3x timeline zoom

  const effectiveDuration = Math.max(duration || 10, words.length > 0 ? words[words.length - 1].end + 1 : 10);

  // Recommended Shorts / Reels Clipping Intervals
  const CLIP_PRESETS = [
    { label: '⚡ Viral Hook (0-5s)', start: 0, end: 5 },
    { label: '🔥 Shorts Clip (0-15s)', start: 0, end: 15 },
    { label: '🎬 Reel Highlights (0-30s)', start: 0, end: Math.min(30, effectiveDuration) },
    { label: '✨ Full Video', start: 0, end: effectiveDuration }
  ];

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const seekTime = parseFloat((pct * effectiveDuration).toFixed(2));
    onTimeSeek(seekTime);
  };

  const handleApplyPresetTrim = (start: number, end: number) => {
    setTrimStart(start);
    setTrimEnd(end);
    if (onTrimVideo) {
      onTrimVideo(start, end);
    }
    onTimeSeek(start);
  };

  // Helper to format timestamps: 00:05 / 01:30
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  return (
    <div className="glass-panel p-4 rounded-2xl space-y-3 w-full border border-white/10 shadow-2xl">
      {/* Timeline Header Toolbar (WhiteStair Style) */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/5 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Layers className="h-4 w-4 text-brownie-400" /> Multi-Track Timeline & Video Clipper
          </h3>
          <span className="text-[10px] text-brownie-400 font-mono bg-brownie-500/10 border border-brownie-500/20 px-2 py-0.5 rounded-full font-bold" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {effectiveDuration.toFixed(1)}s Total
          </span>
        </div>

        {/* Quick Action Toolbar Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-1 bg-brownie-500 text-black font-bold px-2.5 py-1 rounded-lg hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5 fill-black" /> : <Play className="h-3.5 w-3.5 fill-black ml-0.5" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <span className="w-[1px] h-4 bg-white/10 mx-1" />

          {/* Quick Clip Presets */}
          <span className="text-white/40 text-[11px] font-mono hidden sm:inline">Rec Clips:</span>
          {CLIP_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handleApplyPresetTrim(preset.start, preset.end)}
              className="bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Timing Info Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 flex flex-wrap items-center justify-between text-xs text-amber-300 gap-2">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Recommended Short-Form Clip Lengths:</strong> <strong>5s-12s</strong> (Hooks), <strong>15s-30s</strong> (Shorts & Reels), <strong>60s Max</strong>.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/60 font-mono text-[11px]">Active Cut Range:</span>
          <span className="bg-black/60 px-2 py-0.5 rounded text-brownie-400 font-mono font-bold" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {trimStart.toFixed(1)}s → {trimEnd.toFixed(1)}s ({(trimEnd - trimStart).toFixed(1)}s clip)
          </span>
        </div>
      </div>

      {/* Main Multi-Track Visual Timeline Box */}
      <div className="relative bg-[#060608] rounded-xl border border-white/10 p-3 select-none space-y-2 overflow-hidden">
        {/* Time Ruler Ticks Top Bar */}
        <div className="relative h-5 border-b border-white/10 text-[9px] font-mono text-white/40 flex justify-between px-1">
          <span>00:00</span>
          <span>{formatTime(effectiveDuration * 0.25)}</span>
          <span>{formatTime(effectiveDuration * 0.5)}</span>
          <span>{formatTime(effectiveDuration * 0.75)}</span>
          <span>{formatTime(effectiveDuration)}</span>
        </div>

        {/* Interactive Playhead & Waveform Container */}
        <div
          ref={containerRef}
          onClick={handleTimelineClick}
          className="relative h-28 cursor-pointer group bg-gradient-to-b from-zinc-950 to-black rounded-lg border border-white/5 overflow-hidden"
        >
          {/* Audio Waveform Graphic Lines */}
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-20 pointer-events-none">
            {Array.from({ length: 60 }).map((_, i) => {
              const hPct = Math.floor(20 + Math.sin(i * 0.5) * 60 + Math.cos(i * 0.8) * 20);
              return (
                <div
                  key={i}
                  className="w-1 bg-brownie-400 rounded-full"
                  style={{ height: `${Math.max(15, Math.min(90, hPct))}%` }}
                />
              );
            })}
          </div>

          {/* Track 1: Subtitle / Word Caption Chips Track */}
          <div className="absolute top-2 inset-x-0 h-10 px-2 flex items-center pointer-events-none">
            {words.map((w) => {
              const leftPct = (w.start / effectiveDuration) * 100;
              const widthPct = Math.max(1.5, ((w.end - w.start) / effectiveDuration) * 100);
              const isActive = currentTime >= w.start && currentTime <= w.end;

              return (
                <div
                  key={w.id}
                  className={`absolute h-7 px-1.5 rounded flex items-center justify-center text-[10px] font-bold border transition-all truncate ${
                    isActive
                      ? 'bg-brownie-500 text-black border-amber-300 shadow-md shadow-brownie-500/30 scale-105 z-10'
                      : 'bg-white/10 text-white/80 border-white/10'
                  }`}
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  title={`${w.word} (${w.start}s - ${w.end}s)`}
                >
                  <span className="truncate">{w.word}</span>
                </div>
              );
            })}
          </div>

          {/* Track 2: Video Audio Track Bar */}
          <div className="absolute bottom-3 inset-x-2 h-7 bg-purple-950/40 border border-purple-500/30 rounded-lg flex items-center px-3 gap-2 pointer-events-none">
            <Music className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
            <span className="text-[10px] font-mono text-purple-300 truncate">Video Audio Stream & Voice Track</span>
          </div>

          {/* Trim Box Highlight Overlay */}
          <div
            className="absolute top-0 bottom-0 bg-brownie-500/15 border-x-2 border-brownie-500 pointer-events-none"
            style={{
              left: `${(trimStart / effectiveDuration) * 100}%`,
              width: `${Math.max(0, ((trimEnd - trimStart) / effectiveDuration) * 100)}%`
            }}
          />

          {/* Red Playhead Scrub Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)] z-30 pointer-events-none transition-all duration-75"
            style={{ left: `${Math.max(0, Math.min(100, (currentTime / effectiveDuration) * 100))}%` }}
          >
            <div className="h-3 w-3 -ml-1.25 -mt-0.5 bg-red-500 rounded-full border-2 border-white shadow-md" />
          </div>
        </div>
      </div>

      {/* Manual Start / End Timestamp Input Cut Controls */}
      <div className="flex flex-wrap items-center justify-between pt-1 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4 text-brownie-400" />
          <span className="font-bold text-white">Manual Cut Range:</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-white/50 text-[11px] font-mono">Start (s):</span>
            <input
              type="number"
              min="0"
              max={trimEnd - 0.5}
              step="0.1"
              value={trimStart}
              onChange={(e) => {
                const val = Math.max(0, parseFloat(e.target.value) || 0);
                setTrimStart(val);
                if (onTrimVideo) onTrimVideo(val, trimEnd);
              }}
              className="w-16 bg-black/60 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono font-bold outline-none focus:border-brownie-500"
            />
          </div>

          <span className="text-white/40 font-mono">to</span>

          <div className="flex items-center gap-1.5">
            <span className="text-white/50 text-[11px] font-mono">End (s):</span>
            <input
              type="number"
              min={trimStart + 0.5}
              max={effectiveDuration}
              step="0.1"
              value={trimEnd}
              onChange={(e) => {
                const val = Math.min(effectiveDuration, parseFloat(e.target.value) || effectiveDuration);
                setTrimEnd(val);
                if (onTrimVideo) onTrimVideo(trimStart, val);
              }}
              className="w-16 bg-black/60 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono font-bold outline-none focus:border-brownie-500"
            />
          </div>

          <button
            onClick={() => onTimeSeek(trimStart)}
            className="flex items-center gap-1 bg-brownie-500/20 hover:bg-brownie-500/30 text-brownie-400 border border-brownie-500/40 text-xs font-bold px-3 py-1 rounded-lg transition-colors"
          >
            Preview Cut Clip
          </button>
        </div>
      </div>
    </div>
  );
};
