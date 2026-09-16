import React from 'react';
import { Sparkles, Download, Wand2, Scissors, HelpCircle, Layers, Film, Upload } from 'lucide-react';

interface HeaderProps {
  activeTab: 'editor' | 'styles' | 'thumbnails' | 'tools';
  setActiveTab: (tab: 'editor' | 'styles' | 'thumbnails' | 'tools') => void;
  onExportVideo: () => void;
  onExportSRT: () => void;
  onUploadFile: (file: File) => void;
  onUploadSubtitleFile?: (file: File) => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onExportVideo,
  onExportSRT,
  onUploadFile,
  onUploadSubtitleFile,
  isExporting
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-studio-border bg-studio-bg/95 backdrop-blur-md px-4 py-2.5">
      <div className="mx-auto flex max-w-[1600px] 2xl:max-w-[1800px] w-full items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brownie-400 to-brownie-600 shadow-md shadow-brownie-500/10">
            <Sparkles className="h-5 w-5 text-black fill-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white font-sans tracking-tight" style={{ letterSpacing: '-0.025em' }}>
                brownie<span className="text-brownie-400 font-black">AI</span>
              </span>
              <span className="rounded-full bg-brownie-500/10 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-brownie-400 border border-brownie-500/20">
                PRO 2.0
              </span>
            </div>
            <p className="text-[10px] text-studio-muted font-medium hidden sm:block">Transcript-First Dynamic Captions Engine</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 rounded-xl border border-white/5 bg-[#141416] p-1">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'editor'
                ? 'bg-brownie-500/15 text-brownie-400 border border-brownie-500/40 shadow-sm'
                : 'text-white/60 hover:text-white/90 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Film className="h-3.5 w-3.5" />
            Studio Editor
          </button>

          <button
            onClick={() => setActiveTab('styles')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'styles'
                ? 'bg-brownie-500/15 text-brownie-400 border border-brownie-500/40 shadow-sm'
                : 'text-white/60 hover:text-white/90 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Caption Styles
          </button>

          <button
            onClick={() => setActiveTab('thumbnails')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'thumbnails'
                ? 'bg-brownie-500/15 text-brownie-400 border border-brownie-500/40 shadow-sm'
                : 'text-white/60 hover:text-white/90 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Wand2 className="h-3.5 w-3.5" />
            AI Hooks & Covers
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'tools'
                ? 'bg-brownie-500/15 text-brownie-400 border border-brownie-500/40 shadow-sm'
                : 'text-white/60 hover:text-white/90 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Scissors className="h-3.5 w-3.5" />
            Tools Suite
          </button>
        </nav>

        {/* Action / Export Buttons */}
        <div className="flex items-center gap-2">
          <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            <Upload className="h-3.5 w-3.5 text-brownie-400" />
            <span>Upload Video + Subtitles</span>
            <input
              type="file"
              multiple
              accept="video/*,audio/*,.ass,.srt,.vtt,.json"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  onUploadFile(e.target.files[0]);
                  // Handle multiple files if user uploaded clip + subtitle together
                  Array.from(e.target.files).forEach((file) => {
                    if (file.name.match(/\.(ass|srt|vtt|json)$/i) && onUploadSubtitleFile) {
                      onUploadSubtitleFile(file);
                    }
                  });
                }
              }}
              className="hidden"
            />
          </label>

          {onUploadSubtitleFile && (
            <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-brownie-500/30 bg-brownie-500/10 px-3 py-1.5 text-xs font-bold text-brownie-400 transition-colors hover:bg-brownie-500/20">
              <Upload className="h-3.5 w-3.5" />
              <span>Upload .ASS/.SRT</span>
              <input
                type="file"
                accept=".ass,.srt,.vtt,.json"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onUploadSubtitleFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </label>
          )}

          <button
            onClick={onExportSRT}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Download className="h-3.5 w-3.5 text-brownie-400" />
            SRT Subtitles
          </button>

          <button
            onClick={onExportVideo}
            disabled={isExporting}
            className="flex items-center gap-2 rounded-lg cta-glow-button px-4 py-1.5 text-xs font-bold transition-all disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            {isExporting ? 'Exporting MP4...' : 'Export Video (1080p)'}
          </button>
        </div>
      </div>
    </header>
  );
};
