import React, { useRef } from 'react';
import { Upload, Video, Music, Sparkles } from 'lucide-react';

interface MediaUploaderProps {
  onMediaSelect: (file: File) => void;
  onSubtitleSelect?: (file: File) => void;
  onUseDemo: () => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  onMediaSelect,
  onSubtitleSelect,
  onUseDemo
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (files: FileList | File[]) => {
    const fileArr = Array.from(files);
    const mediaFile = fileArr.find(f => f.type.startsWith('video/') || f.type.startsWith('audio/') || f.name.match(/\.(mp4|mov|webm|mp3|wav)$/i));
    const subFile = fileArr.find(f => f.name.match(/\.(ass|srt|vtt|json)$/i));

    if (mediaFile) {
      onMediaSelect(mediaFile);
    }
    if (subFile && onSubtitleSelect) {
      onSubtitleSelect(subFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-studio-card border border-studio-border rounded-2xl shadow-2xl text-center">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-studio-border bg-studio-bg/60 p-10 transition-all hover:border-brownie-500/60 hover:bg-brownie-500/5"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="video/*,audio/*,.ass,.srt,.vtt,.json"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brownie-500/10 text-brownie-400 group-hover:scale-110 transition-transform">
          <Upload className="h-8 w-8" />
        </div>

        <h3 className="mt-4 text-lg font-bold text-white">
          Drop your video clip & subtitle file (.ASS / .SRT) here
        </h3>
        <p className="mt-1 text-xs text-studio-muted">
          Select clip_01.mp4 and clip_01_subtitles.ass together — brownieAI will auto-sync them!
        </p>

        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-studio-muted">
          <span className="flex items-center gap-1">
            <Video className="h-3.5 w-3.5 text-brownie-400" /> Talking-head reels
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Music className="h-3.5 w-3.5 text-brownie-400" /> Podcasts & Shorts
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="h-px w-12 bg-studio-border"></span>
        <span className="text-xs uppercase font-semibold tracking-wider text-studio-muted">OR</span>
        <span className="h-px w-12 bg-studio-border"></span>
      </div>

      <button
        onClick={onUseDemo}
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brownie-500/30 bg-brownie-500/10 px-5 py-2.5 text-xs font-bold text-brownie-400 hover:bg-brownie-500/20 transition-all"
      >
        <Sparkles className="h-4 w-4" />
        Try with Sample Demo Clip
      </button>
    </div>
  );
};
