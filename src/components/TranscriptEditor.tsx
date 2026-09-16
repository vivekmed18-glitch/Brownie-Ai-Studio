import React, { useState } from 'react';
import { Word } from '../types/studio';
import { Edit2, Plus, Trash2, Clock, Sparkles, FileText, Check } from 'lucide-react';

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

  return (
    <div className="flex flex-col h-full bg-studio-card border border-studio-border rounded-2xl p-4 shadow-xl">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-studio-border pb-3 mb-2">
        <div>
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brownie-400" /> Transcript-First Editor
          </h3>
          <p className="text-xs text-studio-muted">
            Edit words directly or paste your full clip script!
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowPasteModal(true)}
            className="flex items-center gap-1 bg-brownie-500/20 hover:bg-brownie-500/30 text-brownie-400 border border-brownie-500/40 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            title="Paste custom video transcript text"
          >
            <FileText className="h-3.5 w-3.5" /> Paste Script
          </button>

          <button
            onClick={onAddWord}
            className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add Word
          </button>
        </div>
      </div>

      {/* Uploaded Clip Guidance Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs text-amber-300">
        <span>💡 <strong>Tip for uploaded clips:</strong> Click <strong>Paste Script</strong> to paste your video's exact spoken words. Any caption template will instantly align!</span>
      </div>

      {/* Modal for pasting custom transcript script */}
      {showPasteModal && (
        <div className="mb-3 p-3 bg-studio-surface border border-brownie-500/40 rounded-xl space-y-2">
          <label className="text-xs font-bold text-white block">Paste Full Video Script / Transcript:</label>
          <textarea
            rows={3}
            value={pasteInput}
            onChange={(e) => setPasteInput(e.target.value)}
            placeholder="Type or paste the transcript for your uploaded video here..."
            className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-brownie-500"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowPasteModal(false)}
              className="px-2.5 py-1 text-xs text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyPastedTranscript}
              className="flex items-center gap-1 bg-brownie-500 text-black font-bold text-xs px-3 py-1.5 rounded-lg shadow"
            >
              <Check className="h-3.5 w-3.5" /> Generate Word Chips
            </button>
          </div>
        </div>
      )}

      {/* Words Container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[500px] scrollbar-thin">
        {words.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#0A0A0B] rounded-xl border border-dashed border-white/10 space-y-3">
            <Sparkles className="h-8 w-8 text-brownie-400 animate-bounce" />
            <div>
              <p className="text-sm font-bold text-white">No transcript generated yet</p>
              <p className="text-xs text-studio-muted mt-1 max-w-sm">
                Click <strong>⚡ Auto-Transcribe</strong> below the video player, or click <strong>Paste Script</strong> above to sync your video's spoken words!
              </p>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};
