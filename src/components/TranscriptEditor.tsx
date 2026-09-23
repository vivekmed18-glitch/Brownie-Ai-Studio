import React, { useState } from 'react';
import { Word } from '../types/studio';
import { Edit2, Plus, Trash2, Sparkles, FileText, Check, Search } from 'lucide-react';

interface TranscriptEditorProps {
  words: Word[];
  currentTime: number;
  onTimeSeek: (time: number) => void;
  onUpdateWord: (id: string, newWord: string) => void;
  onDeleteWord: (id: string) => void;
  onToggleHighlight: (id: string) => void;
  onAddWord: () => void;
  onSetCustomTranscript?: (text: string) => void;
}

export const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
  words,
  currentTime,
  onTimeSeek,
  onUpdateWord,
  onDeleteWord,
  onToggleHighlight,
  onAddWord,
  onSetCustomTranscript
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempText, setTempText] = useState<string>('');
  const [showPasteModal, setShowPasteModal] = useState<boolean>(false);
  const [pasteInput, setPasteInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const handleApplyPastedTranscript = () => {
    if (pasteInput.trim() && onSetCustomTranscript) {
      onSetCustomTranscript(pasteInput.trim());
      setShowPasteModal(false);
      setPasteInput('');
    }
  };

  const filteredWords = words.filter(w => 
    w.word.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="flex flex-col h-full bg-[#121419] border border-white/10 rounded-xl p-4 shadow-xl">
      {/* Header & Quick Action Buttons */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div>
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brownie-400" /> Interactive Transcript Editor
          </h3>
          <p className="text-[11px] text-white/50 mt-0.5">
            Click any word to seek playback or edit script text
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPasteModal(true)}
            className="flex items-center gap-1.5 bg-brownie-500/20 hover:bg-brownie-500/30 text-brownie-400 border border-brownie-500/30 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors"
            title="Paste custom video transcript"
          >
            <FileText className="h-3.5 w-3.5" /> Paste Script
          </button>

          <button
            onClick={onAddWord}
            className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 text-xs font-medium px-2 py-1 rounded-lg transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>

      {/* Transcript Search Bar */}
      <div className="relative mb-3">
        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search spoken words in transcript..."
          className="w-full bg-[#0B0C0F] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-white/40 outline-none focus:border-brownie-500/50"
        />
      </div>

      {/* Modal for pasting custom transcript script */}
      {showPasteModal && (
        <div className="mb-3 p-3 bg-[#181B21] border border-brownie-500/40 rounded-xl space-y-2">
          <label className="text-xs font-bold text-white block">Paste Video Transcript Text:</label>
          <textarea
            rows={3}
            value={pasteInput}
            onChange={(e) => setPasteInput(e.target.value)}
            placeholder="Type or paste spoken words here..."
            className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-brownie-500"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowPasteModal(false)}
              className="px-2 py-1 text-xs text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyPastedTranscript}
              className="flex items-center gap-1 bg-brownie-500 text-black font-bold text-xs px-3 py-1 rounded-lg shadow"
            >
              <Check className="h-3.5 w-3.5" /> Apply Script
            </button>
          </div>
        </div>
      )}

      {/* Editorial Lightweight Words Stream */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[380px] scrollbar-thin">
        {words.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#0B0C0F] rounded-xl border border-dashed border-white/10 space-y-3">
            <Sparkles className="h-6 w-6 text-brownie-400" />
            <div>
              <p className="text-xs font-bold text-white">No transcript words loaded</p>
              <p className="text-[11px] text-white/50 mt-0.5">
                Click <strong>Paste Script</strong> above to sync your video's spoken words!
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-[#0B0C0F] rounded-xl border border-white/5 font-sans leading-relaxed flex flex-wrap gap-x-1.5 gap-y-2">
            {filteredWords.map((w) => {
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
                    className="bg-brownie-500 text-black font-bold text-xs px-2 py-0.5 rounded outline-none w-20"
                  />
                );
              }

              return (
                <span
                  key={w.id}
                  onClick={() => onTimeSeek(w.start)}
                  className={`group relative inline-flex items-center cursor-pointer text-xs font-medium transition-all px-1.5 py-0.5 rounded hover:bg-white/10 ${
                    isActive
                      ? 'bg-brownie-500/25 text-brownie-400 font-bold border-b-2 border-brownie-500 scale-[1.04]'
                      : w.isCustomEmphasis
                      ? 'text-amber-300 font-semibold underline underline-offset-2'
                      : 'text-white/90'
                  }`}
                >
                  {w.word}
                  
                  {/* Subtle timestamp on hover */}
                  <span className="hidden group-hover:inline text-[9px] text-white/40 font-mono ml-1">
                    {w.start.toFixed(1)}s
                  </span>

                  {/* Lightweight Edit options popover on hover */}
                  <span className="hidden group-hover:inline-flex items-center gap-1 ml-1 text-[10px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(w);
                      }}
                      className="text-white/60 hover:text-white"
                      title="Edit"
                    >
                      <Edit2 className="h-2.5 w-2.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteWord(w.id);
                      }}
                      className="text-red-400 hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 className="h-2.5 w-2.5" />
                    </button>
                  </span>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
