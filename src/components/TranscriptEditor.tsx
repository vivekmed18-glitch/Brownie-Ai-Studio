import React, { useState } from 'react';
import { Word } from '../types/studio';
import { Edit2, Plus, Trash2, Clock, Sparkles, Highlighter } from 'lucide-react';

interface TranscriptEditorProps {
  words: Word[];
  currentTime: number;
  onTimeSeek: (time: number) => void;
  onUpdateWord: (id: string, newWord: string) => void;
  onDeleteWord: (id: string) => void;
  onToggleHighlight: (id: string) => void;
  onAddWord: () => void;
}

export const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
  words,
  currentTime,
  onTimeSeek,
  onUpdateWord,
  onDeleteWord,
  onToggleHighlight,
  onAddWord
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempText, setTempText] = useState<string>('');

  const handleStartEdit = (wordObj: Word) => {
    setEditingId(wordObj.id);
    setTempText(wordObj.word);
  };

  const handleSaveEdit = (id: string) => {
    if (tempText.trim()) {
      onUpdateWord(id, tempText.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="flex flex-col h-full bg-studio-card border border-studio-border rounded-2xl p-4 shadow-xl">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-studio-border pb-3 mb-3">
        <div>
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brownie-400" /> Transcript-First Editor
          </h3>
          <p className="text-xs text-studio-muted">
            Edit the words directly. Timing automatically resyncs!
          </p>
        </div>

        <button
          onClick={onAddWord}
          className="flex items-center gap-1 bg-brownie-500/10 hover:bg-brownie-500/20 text-brownie-400 border border-brownie-500/30 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Add Word
        </button>
      </div>

      {/* Words Container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[500px] scrollbar-thin">
        <div className="flex flex-wrap gap-2 p-3 bg-[#0A0A0B] rounded-xl border border-white/5">
          {words.map((w) => {
            const isActive = currentTime >= w.start && currentTime <= w.end;

            if (editingId === w.id) {
              return (
                <input
                  key={w.id}
                  type="text"
                  autoFocus
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                  onBlur={() => handleSaveEdit(w.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(w.id);
                  }}
                  className="bg-brownie-500 text-black font-bold text-xs px-2.5 py-1.5 rounded-lg outline-none border border-amber-300 w-24"
                />
              );
            }

            return (
              <div
                key={w.id}
                className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-150 hover:scale-[1.03] border ${
                  isActive
                    ? 'bg-brownie-500/20 text-brownie-400 border-brownie-500/60 font-bold shadow-md shadow-brownie-500/10'
                    : w.isCustomEmphasis
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : 'bg-[#1C1C1F] text-white/90 border-white/5 hover:border-white/20 hover:bg-[#242428]'
                }`}
                onClick={() => onTimeSeek(w.start)}
              >
                <span>{w.word}</span>

                <span className="text-[9px] text-white/40 font-mono tracking-tighter" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {w.start.toFixed(1)}s
                </span>

                {/* Animated Playback Sweep Line */}
                {isActive && (
                  <span className="absolute left-2 right-2 bottom-0.5 h-0.5 bg-brownie-400 rounded-full animate-sweep origin-left" />
                )}

                {/* Quick Action Hover Bar */}
                <div className="hidden group-hover:flex items-center gap-1 ml-1 bg-black/90 px-1 py-0.5 rounded border border-white/10 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartEdit(w);
                    }}
                    title="Edit Word"
                    className="p-0.5 text-zinc-300 hover:text-white"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleHighlight(w.id);
                    }}
                    title="Toggle Emphasis Highlight"
                    className="p-0.5 text-amber-400 hover:text-amber-300"
                  >
                    <Sparkles className="h-3 w-3" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteWord(w.id);
                    }}
                    title="Delete Word"
                    className="p-0.5 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
