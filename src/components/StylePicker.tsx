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
  'Popular',
  'Real Estate',
  'Behind the Person',
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

  const filteredStyles = selectedCategory === 'All' 
    ? CAPTION_STYLES 
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
          const isAI = ['Popular', 'Real Estate', 'Behind the Person', 'Playful', 'Multiline', 'Editorial'].includes(cat);
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
              <span>{cat}</span>
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

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 mt-3 overflow-y-auto max-h-[420px] pr-1">
        {filteredStyles.map((style) => {
          const isSelected = currentStyle.id === style.id;
          return (
            <div
              key={style.id}
              onClick={() => onSelectStyle(style)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl border p-3 transition-all flex flex-col justify-between h-28 ${
                isSelected
                  ? 'border-brownie-500/60 bg-brownie-500/10 shadow-lg shadow-brownie-500/10 ring-1 ring-brownie-500/50'
                  : 'border-white/5 bg-[#0A0A0B] hover:border-white/20 hover:bg-[#1C1C1F]'
              }`}
            >
              {/* Top Header: Badge & Category */}
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-medium text-white/50">
                  {style.category}
                </span>
                {style.badgeText && (
                  <span className="rounded bg-brownie-500 text-black font-extrabold text-[9px] px-1.5 py-0.2">
                    {style.badgeText}
                  </span>
                )}
              </div>

              {/* Center Typography Sample */}
              <div className="my-auto text-center py-1">
                <p
                  style={{
                    fontFamily: style.fontFamily,
                    color: style.primaryColor,
                    textTransform: style.textTransform || 'none'
                  }}
                  className="text-base font-black tracking-wide truncate"
                >
                  {style.name.split(' ')[0]}{' '}
                  <span style={{ color: style.highlightColor }}>
                    {style.name.split(' ')[1] || ''}
                  </span>
                </p>
              </div>

              {/* Bottom Footer: Preset Title & Checkmark */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className="text-xs font-bold text-white truncate">{style.name}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-brownie-400 shrink-0" />}
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
