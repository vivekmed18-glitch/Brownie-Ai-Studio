import React from 'react';
import { Sparkles, Download, Wand2, Scissors, Layers, Film, Upload, Undo2, Redo2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'editor' | 'styles' | 'thumbnails' | 'tools';
  setActiveTab: (tab: 'editor' | 'styles' | 'thumbnails' | 'tools') => void;
  onExportVideo: () => void;
  onExportSRT: () => void;
  onUploadFile: (file: File) => void;
  onUploadSubtitleFile?: (file: File) => void;
  isExporting: boolean;
  videoTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onExportVideo,
  onExportSRT,
  onUploadFile,
  onUploadSubtitleFile,
  isExporting,
  videoTitle = 'Untitled_Clip.mp4'
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0C0F]/95 backdrop-blur-md px-4 h-14 flex items-center">
      <div className="mx-auto flex max-w-[1700px] w-full items-center justify-between gap-4">
        {/* Left: Brand Logo & Active Project Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brownie-400 to-brownie-600 shadow-md">
            <Sparkles className="h-4 w-4 text-black fill-black" />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-white tracking-tight">
              brownie<span className="text-brownie-400 font-black">AI</span>
            </span>
            <span className="text-white/20 font-light">/</span>
            <span className="text-xs text-white/70 font-mono font-medium max-w-[140px] sm:max-w-[200px] truncate" title={videoTitle}>
              {videoTitle}
            </span>
          </div>
        </div>

        {/* Center: Main Editor Navigation Tabs */}
        <nav className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#121419] p-1 shadow-inner">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
              activeTab === 'editor'
                ? 'bg-brownie-500/20 text-brownie-400 border border-brownie-500/40 shadow-sm'
                : 'text-white/60 hover:text-white/90 border border-transparent'
            }`}
          >
            <Film className="h-3.5 w-3.5" />
            Editor
          </button>

          <button
            onClick={() => setActiveTab('styles')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
              activeTab === 'styles'
                ? 'bg-brownie-500/20 text-brownie-400 border border-brownie-500/40 shadow-sm'
                : 'text-white/60 hover:text-white/90 border border-transparent'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Styles
          </button>

          <button
            onClick={() => setActiveTab('thumbnails')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
              activeTab === 'thumbnails'
                ? 'bg-brownie-500/20 text-brownie-400 border border-brownie-500/40 shadow-sm'
                : 'text-white/60 hover:text-white/90 border border-transparent'
            }`}
          >
            <Wand2 className="h-3.5 w-3.5" />
            Hooks
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
              activeTab === 'tools'
                ? 'bg-brownie-500/20 text-brownie-400 border border-brownie-500/40 shadow-sm'
                : 'text-white/60 hover:text-white/90 border border-transparent'
            }`}
          >
            <Scissors className="h-3.5 w-3.5" />
            Tools
          </button>
        </nav>

        {/* Right: Quick Action Controls & Export */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo controls */}
          <div className="hidden sm:flex items-center gap-0.5 bg-[#121419] border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => {}}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => {}}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80 transition-colors hover:bg-white/10">
            <Upload className="h-3.5 w-3.5 text-brownie-400" />
            <span className="hidden md:inline">Upload Media</span>
            <input
              type="file"
              multiple
              accept="video/*,audio/*,.ass,.srt,.vtt,.json"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  onUploadFile(e.target.files[0]);
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

          <button
            onClick={onExportSRT}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80 transition-colors hover:bg-white/10"
          >
            <Download className="h-3.5 w-3.5 text-brownie-400" />
            SRT
          </button>

          <button
            onClick={onExportVideo}
            disabled={isExporting}
            className="flex items-center gap-1.5 rounded-lg bg-brownie-500 hover:bg-brownie-400 text-black px-3.5 py-1 text-xs font-bold transition-all shadow-md shadow-brownie-500/20 disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {isExporting ? 'Exporting...' : 'Export MP4'}
          </button>
        </div>
      </div>
    </header>
  );
};
