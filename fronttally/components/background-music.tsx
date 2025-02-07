"use client";

export function BackgroundMusic() {
  return (
    <audio 
      src="/audio/background.mp3" 
      autoPlay 
      loop 
      muted // if need initially muted
    />
  );
}
