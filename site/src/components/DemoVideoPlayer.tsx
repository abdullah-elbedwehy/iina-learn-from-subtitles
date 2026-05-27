import { useCallback, useEffect, useRef } from "react";
import "./DemoVideoPlayer.css";

type DemoVideoPlayerProps = {
  src: string;
  title: string;
  caption: string;
};

async function playWhenAllowed(video: HTMLVideoElement): Promise<void> {
  try {
    await video.play();
  } catch {
    video.muted = true;
    await video.play().catch(() => undefined);
  }
}

export function DemoVideoPlayer({ src, title }: DemoVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void playWhenAllowed(video);
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await playWhenAllowed(video);
    } else {
      video.pause();
    }
  }, []);

  return (
    <div className="demo-video">
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        loop
        src={src}
        aria-label={title}
        onClick={toggle}
      />
    </div>
  );
}
