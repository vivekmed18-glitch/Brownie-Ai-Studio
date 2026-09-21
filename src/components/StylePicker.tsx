import React, { useState } from 'react';
import { CaptionStyle, Category } from '../types/studio';
import { CAPTION_STYLES } from '../data/presets';
import { Check, Sparkles, Layers, Sliders } from 'lucide-react';

interface StylePickerProps {
  currentStyle: CaptionStyle;
  onSelectStyle: (style: CaptionStyle) => void;
  onUpdateStyleParams: (params: Partial<CaptionStyle>) => void;
}

const CATEGORIES: string[] = [
  'All',
  'Behind the Person',
  'Popular',
  'Real Estate',
  'Playful',
  'Multiline',
  'Dynamic',
  'Editorial',
  'Social',
  'Neon & FX',
  'Retro',
  'Creators',
  'Desi'
];

export const StylePicker: React.FC<StylePickerProps> = ({
  currentStyle,
  onSelectStyle,
  onUpdateStyleParams
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sort styles so 'Behind the Person' templates appear at the top when 'All' is selected
  const allStylesSorted = [...CAPTION_STYLES].sort((a, b) => {
    if (a.category === 'Behind the Person' && b.category !== 'Behind the Person') return -1;
    if (a.category !== 'Behind the Person' && b.category === 'Behind the Person') return 1;
    return 0;
  });

  const filteredStyles = selectedCategory === 'All' 
    ? allStylesSorted 
    : CAPTION_STYLES.filter(s => s.category === selectedCategory);

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Layers className="h-4 w-4 text-brownie-400" /> Caption Style Preset Gallery
        </h3>
        <span className="text-xs text-brownie-400 font-mono font-bold bg-brownie-500/10 border border-brownie-500/20 px-2 py-0.5 rounded-full" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {CAPTION_STYLES.length} Kinetic Looks
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none border-b border-white/5">
        {CATEGORIES.map((cat) => {
          const isAI = ['Behind the Person', 'Popular', 'Real Estate', 'Playful', 'Multiline', 'Editorial'].includes(cat);
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative whitespace-nowrap px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'text-brownie-400'
                  : 'text-white/50 hover:text-white/90'
              }`}
            >
              <span>{cat === 'Behind the Person' ? 'Behind the Person 🎭' : cat}</span>
              {isAI && (
                <span className="rounded bg-brownie-500/20 text-brownie-400 text-[9px] font-mono font-extrabold px-1 py-0.2">
                  AI
                </span>
              )}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brownie-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Category Header Sub-Description Banner */}
      <div className="py-2 px-1 border-b border-white/5 mb-3 flex items-center justify-between text-xs">
        <span className="text-white font-bold flex items-center gap-1.5">
          {selectedCategory === 'All' ? 'Featured AI Captions' : selectedCategory}
          <span className="text-[10px] text-brownie-400 font-mono bg-brownie-500/10 border border-brownie-500/20 px-1.5 py-0.2 rounded font-extrabold">AI</span>
        </span>
        <span className="text-studio-muted text-[11px]">
          {selectedCategory === 'Real Estate' && 'Show property prices, listing numbers, and stories with layered captions.'}
          {selectedCategory === 'Behind the Person' && '3D Depth AI floating text layered behind subject silhouette.'}
          {selectedCategory === 'Popular' && 'Top viral caption presets used by 10M+ view creators.'}
          {selectedCategory === 'Playful' && 'Animated organic cursive & bold bouncy lettering.'}
          {selectedCategory === 'Multiline' && 'Multi-line fluid text blocks for fast commentary.'}
          {selectedCategory === 'All' && 'Select any template to test live kinetic caption animations.'}
        </span>
      </div>

      {/* Vertical 9:16 Preset Cards Grid (Moonshot Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 overflow-y-auto max-h-[520px] p-1">
        {filteredStyles.map((style) => {
          const isSelected = currentStyle.id === style.id;
          const isBehindPerson = style.category === 'Behind the Person' || style.animationStyle === 'behind-depth';

          return (
            <div
              key={style.id}
              onClick={() => onSelectStyle(style)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all aspect-[9/16] h-60 sm:h-64 flex flex-col justify-between p-3 select-none ${
                isSelected
                  ? 'border-brownie-500 ring-4 ring-brownie-500/30 shadow-2xl shadow-brownie-500/30 scale-[1.02]'
                  : 'border-white/10 hover:border-white/40 hover:scale-[1.03] shadow-lg'
              }`}
            >
              {/* Full-Bleed Realistic Background Image Cover */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${style.posterUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'})` }}
              />

              {/* Dark Gradient Overlay for Caption Contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />

              {/* Top-Left Corner Diagonal Ribbon / Badge */}
              {style.badgeText && (
                <div className="absolute top-2 left-2 z-20">
                  <span className="bg-gradient-to-r from-cyan-500 to-teal-400 text-black text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full shadow-md border border-white/20">
                    {style.badgeText}
                  </span>
                </div>
              )}

              {/* Top-Right Gold Crown / Pro Badge */}
              <div className="absolute top-2 right-2 z-20">
                {isBehindPerson ? (
                  <span className="bg-amber-500/90 text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                    👑 AI
                  </span>
                ) : isSelected ? (
                  <span className="h-5 w-5 rounded-full bg-brownie-500 text-black flex items-center justify-center shadow-md">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                ) : null}
              </div>

              {/* 3D Depth Cutout Layer Effect for 'Behind the Person' */}
              {isBehindPerson && (
                <div 
                  className="absolute inset-0 bg-cover bg-center pointer-events-none z-10 opacity-70 mix-blend-screen"
                  style={{ backgroundImage: `url(${style.posterUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'})` }}
                />
              )}

              {/* Center Styled Caption Text Overlay */}
              <div className="relative z-10 my-auto text-center px-2">
                <p
                  style={{
                    fontFamily: style.fontFamily,
                    color: style.primaryColor,
                    textTransform: style.textTransform || 'none',
                    textShadow: style.shadow || '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)'
                  }}
                  className="hover-kinetic-text text-base sm:text-lg font-black tracking-wide leading-tight drop-shadow-lg transition-transform"
                >
                  {style.name.split(' ')[0]}{' '}
                  <span style={{ color: style.highlightColor }}>
                    {style.name.split(' ')[1] || ''}
                  </span>
                </p>
              </div>

              {/* Bottom Footer Title Label */}
              <div className="relative z-20 text-center pt-2 border-t border-white/10 backdrop-blur-sm bg-black/40 rounded-b-xl -mx-3 -mb-3 p-2">
                <span className="text-xs font-bold text-white drop-shadow truncate block">{style.name}</span>
                <span className="text-[10px] text-white/60 font-mono block">{style.category}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Style Parameter Customizer Sliders */}
      <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Sliders className="h-3.5 w-3.5 text-brownie-400" /> Fine-Tune Active Style
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-white/50 text-[10px] font-mono font-medium block mb-1">
              Font Size ({currentStyle.fontSize}px)
            </label>
            <input
              type="range"
              min="20"
              max="60"
              value={currentStyle.fontSize}
              onChange={(e) => onUpdateStyleParams({ fontSize: parseInt(e.target.value) })}
              className="w-full accent-brownie-500 h-1 bg-white/10 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="text-white/50 text-[10px] font-mono font-medium block mb-1">
              Text Stroke ({currentStyle.strokeWidth || 0}px)
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={currentStyle.strokeWidth || 0}
              onChange={(e) => onUpdateStyleParams({ strokeWidth: parseInt(e.target.value), strokeColor: currentStyle.strokeColor || '#000000' })}
              className="w-full accent-brownie-500 h-1 bg-white/10 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="text-white/50 text-[10px] font-mono font-medium block mb-1">
              Vertical Position ({currentStyle.positionY}%)
            </label>
            <input
              type="range"
              min="20"
              max="90"
              value={currentStyle.positionY}
              onChange={(e) => onUpdateStyleParams({ positionY: parseInt(e.target.value) })}
              className="w-full accent-brownie-500 h-1 bg-white/10 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <label className="text-white/70 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={!!currentStyle.showEmoji}
                onChange={(e) => onUpdateStyleParams({ showEmoji: e.target.checked })}
                className="accent-brownie-500 h-3.5 w-3.5 rounded cursor-pointer"
              />
              Auto Emojis ✨
            </label>
          </div>
        </div>

        {/* Color Accent Pickers */}
        <div className="flex items-center gap-4 text-xs pt-1">
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[10px] font-mono">Active Word:</span>
            <input
              type="color"
              value={currentStyle.highlightColor.startsWith('#') ? currentStyle.highlightColor : '#FACC15'}
              onChange={(e) => onUpdateStyleParams({ highlightColor: e.target.value })}
              className="h-6 w-8 bg-transparent cursor-pointer rounded border border-white/20"
              title="Change active word highlight color"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[10px] font-mono">Base Text:</span>
            <input
              type="color"
              value={currentStyle.primaryColor.startsWith('#') ? currentStyle.primaryColor : '#FFFFFF'}
              onChange={(e) => onUpdateStyleParams({ primaryColor: e.target.value })}
              className="h-6 w-8 bg-transparent cursor-pointer rounded border border-white/20"
              title="Change base text color"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
