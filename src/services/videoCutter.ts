export async function trimAndExportVideoClip(
  videoUrl: string,
  startTime: number,
  endTime: number,
  onProgress?: (pct: number) => void
): Promise<{ blob: Blob; fileName: string }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = false;
    video.playsInline = true;

    const dur = Math.max(0.5, endTime - startTime);

    video.onloadedmetadata = () => {
      video.currentTime = startTime;
    };

    video.onseeked = () => {
      let stream: MediaStream | null = null;
      if ((video as any).captureStream) {
        stream = (video as any).captureStream();
      } else if ((video as any).mozCaptureStream) {
        stream = (video as any).mozCaptureStream();
      }

      if (!stream) {
        // Fallback if captureStream is unsupported
        fetch(videoUrl)
          .then(res => res.blob())
          .then(blob => resolve({ blob, fileName: `BrownieAI_Clip_${Math.round(startTime)}s_${Math.round(endTime)}s.mp4` }))
          .catch(reject);
        return;
      }

      let mimeType = 'video/mp4';
      if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1,mp4a')) {
        mimeType = 'video/mp4;codecs=avc1,mp4a';
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        mimeType = 'video/mp4';
      } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
        mimeType = 'video/webm;codecs=vp9,opus';
      } else if (MediaRecorder.isTypeSupported('video/webm')) {
        mimeType = 'video/webm';
      }

      let mediaRecorder: MediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream, { mimeType });
      } catch (e) {
        mediaRecorder = new MediaRecorder(stream);
      }

      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const finalBlob = new Blob(chunks, { type: mimeType });
        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        const fileName = `BrownieAI_Cut_Clip_${Math.round(startTime)}s_to_${Math.round(endTime)}s.${ext}`;
        resolve({ blob: finalBlob, fileName });
      };

      // Start recording sliced clip
      mediaRecorder.start(100);
      video.play().catch(reject);

      const checkTimeInterval = setInterval(() => {
        const current = video.currentTime;
        const progress = Math.min(100, Math.round(((current - startTime) / dur) * 100));
        if (onProgress) onProgress(progress);

        if (current >= endTime || video.ended) {
          clearInterval(checkTimeInterval);
          video.pause();
          if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
          }
        }
      }, 80);
    };

    video.onerror = (err) => {
      // Fallback
      fetch(videoUrl)
        .then(res => res.blob())
        .then(blob => resolve({ blob, fileName: `BrownieAI_Clip.mp4` }))
        .catch(reject);
    };
  });
}
