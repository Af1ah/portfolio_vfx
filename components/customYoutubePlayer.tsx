"use client";

import React, { useEffect, useState, useRef } from "react";

interface YouTubePlayerProps {
  videoId: string;
  onReady?: () => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export default function YouTubePlayer({ videoId, onReady, onError }: YouTubePlayerProps) {
  // Clean videoId if it contains full YouTube URL or parameters
  const cleanVideoId = React.useMemo(() => {
    if (videoId.includes('watch?v=')) {
      return new URL(videoId).searchParams.get('v') || videoId;
    }
    if (videoId.includes('youtu.be/')) {
      return videoId.split('/').pop() || videoId;
    }
    return videoId.includes('?') ? videoId.split('?')[0] : videoId;
  }, [videoId]);
  
  const [loadError, setLoadError] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const apiLoadAttemptedRef = useRef(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const playerContainerId = `youtube-player-${cleanVideoId}`;

  // Load YouTube API
  useEffect(() => {
    if (typeof window === 'undefined' || apiLoadAttemptedRef.current) return;
    
    apiLoadAttemptedRef.current = true;

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      setIsApiReady(true);
      return;
    }

    // Define callback
    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      setIsApiReady(true);
      if (typeof originalCallback === 'function') {
        originalCallback();
      }
    };

    // Load API script
    const scriptTag = document.getElementById("youtube-iframe-api");
    if (!scriptTag) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        console.error("Failed to load YouTube API");
        setLoadError(true);
        if (onError) onError("API load failed");
      };
      document.body.appendChild(script);
    }
  }, [onError]);

  // Initialize player when API is ready
  useEffect(() => {
    if (!isApiReady || !playerRef.current || loadError) return;

    try {
      // Destroy existing player if there is one
      if (playerInstanceRef.current && typeof playerInstanceRef.current.destroy === 'function') {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }

      // Create new player
      playerInstanceRef.current = new window.YT.Player(playerContainerId, {
        videoId: cleanVideoId,
        playerVars: {
          // Use YouTube's default controls
          controls: 1,
          rel: 0,
          modestbranding: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : ''
        },
        events: {
          onReady: (event: any) => {
            if (onReady) onReady();
          },
          onError: (event: any) => {
            console.error("YouTube player error:", event.data);
            setLoadError(true);
            if (onError) onError(event.data);
          }
        },
      });
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
      setLoadError(true);
      if (onError) onError(error);
    }

    // Cleanup on unmount
    return () => {
      if (playerInstanceRef.current && typeof playerInstanceRef.current.destroy === 'function') {
        try {
          playerInstanceRef.current.destroy();
        } catch (e) {
          console.warn("Error destroying YouTube player:", e);
        }
        playerInstanceRef.current = null;
      }
    };
  }, [cleanVideoId, isApiReady, onReady, onError, loadError]);

  if (loadError) {
    return (
      <div className="relative w-full aspect-video bg-black flex items-center justify-center">
        <div className="text-white text-center p-4">
          <p>Unable to load video.</p>
          <a 
            href={`https://www.youtube.com/watch?v=${cleanVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black" ref={playerRef}>
      <div id={playerContainerId} className="absolute top-0 left-0 w-full h-full"></div>
    </div>
  );
}