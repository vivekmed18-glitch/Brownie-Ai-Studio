import React, { useState } from 'react';
import { MOCK_HOOKS, MOCK_THUMBNAILS } from '../data/presets';
import { Wand2, Copy, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

export const ThumbnailMaker: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyHook = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Top AI Hooks Section */}
      <div className="glass-panel rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-brownie-400" /> AI Hook Line Generator
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              Extracted highest converting opening hooks directly from your video speech content.
            </p>
          </div>
          <span className="bg-brownie-500/10 border border-brownie-500/20 text-brownie-400 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 font-mono">
            <Sparkles className="h-3.5 w-3.5" /> High Retention
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOCK_HOOKS.map((hook) => (
            <div
              key={hook.id}
              className="bg-[#0A0A0B] border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-brownie-400 uppercase tracking-wider bg-brownie-500/10 px-2 py-0.5 rounded border border-brownie-500/20">
                    {hook.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {hook.score}% Virality Score
                  </span>
                </div>
                <p className="text-xs font-semibold text-white/90 leading-relaxed">
                  "{hook.text}"
                </p>
              </div>

              <button
                onClick={() => handleCopyHook(hook.id, hook.text)}
                className="mt-3 flex items-center justify-center gap-1.5 w-full bg-[#1C1C1F] hover:bg-[#242428] border border-white/5 text-xs font-semibold text-white/80 hover:text-white py-1.5 rounded-lg transition-colors"
              >
                {copiedId === hook.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-brownie-400" /> Copy Hook
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Thumbnail Mockup Cards */}
      <div className="glass-panel rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-studio-border pb-3 mb-4">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-brownie-400" /> AI Thumbnail Cover Concepts
            </h3>
            <p className="text-xs text-studio-muted mt-0.5">
              4 distinct thumbnail cover options generated from video frame compositions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_THUMBNAILS.map((thumb) => (
            <div
              key={thumb.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-studio-border bg-studio-bg transition-all hover:scale-[1.02] hover:border-brownie-500"
            >
              {/* Fake Cover Graphic */}
              <div className={`h-48 w-full bg-gradient-to-br ${thumb.bgGradient} flex flex-col justify-between p-4 relative`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-white/90 px-2 py-0.5 rounded w-fit">
                  {thumb.style}
                </span>

                <div className="space-y-1">
                  <h4 className="text-base font-black text-amber-300 uppercase tracking-tight leading-tight drop-shadow-md">
                    {thumb.title}
                  </h4>
                  <p className="text-xs font-bold text-white drop-shadow">
                    {thumb.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-studio-card text-center border-t border-studio-border">
                <button className="text-xs font-bold text-brownie-400 hover:text-white transition-colors">
                  Download Thumbnail PNG
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
