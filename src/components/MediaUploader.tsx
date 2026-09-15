import React, { useRef } from 'react';
import { Upload, Video, Music, Sparkles } from 'lucide-react';

interface MediaUploaderProps {
  onMediaSelect: (file: File) => void;
  onUseDemo: () => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  onMediaSelect,
  onUseDemo
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onMediaSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onMediaSelect(e.dataTransfer.files[0]);
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
          accept="video/*,audio/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brownie-500/10 text-brownie-400 group-hover:scale-110 transition-transform">
          <Upload className="h-8 w-8" />
        </div>

        <h3 className="mt-4 text-lg font-bold text-white">
          Drop your video or audio clip here
        </h3>
        <p className="mt-1 text-xs text-studio-muted">
          Supports MP4, MOV, WebM, MP3, WAV (Up to 120 minutes)
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
