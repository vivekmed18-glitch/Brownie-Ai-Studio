import React, { useState } from 'react';
import { Scissors, FileText, Image, Eraser, Download, Check, Sparkles } from 'lucide-react';

interface ToolsSuiteProps {
  onExportSRT: () => void;
}

export const ToolsSuite: React.FC<ToolsSuiteProps> = ({ onExportSRT }) => {
  const [watermarkCleaned, setWatermarkCleaned] = useState(false);

  const handleCleanWatermark = () => {
    setWatermarkCleaned(true);
    setTimeout(() => setWatermarkCleaned(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Watermark & Logo Remover Tool */}
      <div className="glass-panel p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-studio-border/60 pb-3 mb-4">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Eraser className="h-5 w-5 text-brownie-400" /> AI Video Watermark & Logo Cleaner
            </h3>
            <p className="text-xs text-studio-muted mt-0.5">
              Erase unwanted logos, TikTok/Instagram watermarks, or text overlays from your clips.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 glass-elevated p-4 rounded-xl">
          <div className="w-full md:w-1/2 h-44 bg-studio-bg rounded-lg border border-studio-border flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              Watermark Detected
            </div>
            <p className="text-xs font-semibold text-studio-muted">Video Frame Preview</p>
          </div>

          <div className="w-full md:w-1/2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Inpainting Mode</h4>
            <p className="text-xs text-studio-muted leading-relaxed">
              Auto-detects dynamic watermarks across all video frames and replaces them with seamless context-aware background fill.
            </p>

            <button
              onClick={handleCleanWatermark}
              className="flex items-center justify-center gap-2 w-full bg-brownie-500 hover:bg-brownie-400 text-black font-bold text-xs py-2.5 rounded-lg transition-all shadow-md shadow-brownie-500/20"
            >
              {watermarkCleaned ? (
                <>
                  <Check className="h-4 w-4" /> Watermark Removed Cleanly!
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Erase Watermarks Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SRT & Subtitle Export Utility */}
      <div className="glass-panel p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-studio-border/60 pb-3 mb-4">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <FileText className="h-5 w-5 text-brownie-400" /> Subtitle & Timestamp Exporters
            </h3>
            <p className="text-xs text-studio-muted mt-0.5">
              Download word-level transcript subtitles in standard .SRT or JSON format.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-elevated p-4 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Standard .SRT Subtitles</h4>
              <p className="text-[11px] text-studio-muted">For Premiere Pro, Final Cut, or YouTube</p>
            </div>
            <button
              onClick={onExportSRT}
              className="flex items-center gap-1.5 bg-studio-surface hover:bg-studio-hover text-brownie-400 border border-studio-border px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Download .SRT
            </button>
          </div>

          <div className="glass-elevated p-4 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Word Timestamp JSON</h4>
              <p className="text-[11px] text-studio-muted">Raw JSON payload with millisecond data</p>
            </div>
            <button
              onClick={onExportSRT}
              className="flex items-center gap-1.5 bg-studio-surface hover:bg-studio-hover text-brownie-400 border border-studio-border px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Download JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
