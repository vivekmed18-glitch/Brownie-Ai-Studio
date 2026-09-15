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

      {/* Preset Visual Cards Grid */}
      <div className="grid grid-cols-2 gap-3 mt-3 overflow-y-auto max-h-[460px] pr-1">
        {filteredStyles.map((style) => {
          const isSelected = currentStyle.id === style.id;
          const isBehindPerson = style.category === 'Behind the Person' || style.animationStyle === 'behind-depth';

          return (
            <div
              key={style.id}
              onClick={() => onSelectStyle(style)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border transition-all flex flex-col justify-between h-36 ${
                isSelected
                  ? 'border-brownie-500 bg-brownie-500/10 shadow-lg shadow-brownie-500/20 ring-2 ring-brownie-500/50 scale-[1.01]'
                  : 'border-white/10 bg-[#0A0A0B] hover:border-white/30 hover:bg-[#1C1C1F]'
              }`}
            >
              {/* Card Image / Gradient Preview Header */}
              <div className="relative h-24 w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-950 overflow-hidden flex items-center justify-center p-2">
                {/* Background Poster Image for 'Behind the Person' 3D depth styles */}
                {isBehindPerson && (
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity" style={{ backgroundImage: `url(${style.posterUrl || '/ai_human.jpg'})` }} />
                )}

                {/* Subtle Grid overlay for high craft look */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px]" />

                {/* Top Badge Overlay */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                  <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded backdrop-blur-md border ${
                    isBehindPerson 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                      : 'bg-black/60 text-white/70 border-white/10'
                  }`}>
                    {isBehindPerson ? '3D DEPTH' : style.category}
                  </span>
                  {style.badgeText && (
                    <span className="rounded bg-brownie-500 text-black font-extrabold text-[9px] px-1.5 py-0.2 shadow-sm">
                      {style.badgeText}
                    </span>
                  )}
                </div>

                {/* Styled Sample Typography Preview */}
                <div className="relative z-10 text-center px-1 max-w-full">
                  <p
                    style={{
                      fontFamily: style.fontFamily,
                      color: style.primaryColor,
                      textTransform: style.textTransform || 'none',
                      textShadow: style.shadow || '0 2px 8px rgba(0,0,0,0.8)'
                    }}
                    className="text-sm sm:text-base font-black tracking-wide truncate"
                  >
                    {style.name.split(' ')[0]}{' '}
                    <span style={{ color: style.highlightColor }}>
                      {style.name.split(' ')[1] || ''}
                    </span>
                  </p>
                </div>
              </div>

              {/* Card Footer Title & Active Indicator */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#141416] border-t border-white/5 z-10">
                <span className="text-xs font-bold text-white truncate">{style.name}</span>
                {isSelected && (
                  <span className="h-4 w-4 rounded-full bg-brownie-500 text-black flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                )}
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

        <div className="grid grid-cols-2 gap-3 text-xs">
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
        </div>
      </div>
    </div>
  );
};
