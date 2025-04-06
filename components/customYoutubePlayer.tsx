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
  // Handle uncaught promise rejections from YouTube player
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason &&
          typeof event.reason === 'object' &&
          event.reason.target &&
          event.reason.target.src &&
          event.reason.target.src.includes('youtube.com')) {
        console.error('Uncaught YouTube player promise rejection:', event.reason);
        if (onError) onError(event.reason);
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [onError]);

  // Clean videoId if it contains full YouTube URL or parameters
  const cleanVideoId = React.useMemo(() => {
    // Handle regular YouTube URLs
    if (videoId.includes('watch?v=')) {
      return new URL(videoId).searchParams.get('v') || videoId;
    }
    // Handle youtu.be URLs
    if (videoId.includes('youtu.be/')) {
      return videoId.split('/').pop() || videoId;
    }
    // Handle Shorts URLs
    if (videoId.includes('shorts/')) {
      return videoId.split('shorts/')[1].split('?')[0] || videoId;
    }
    // Handle raw Shorts ID (shorts/VIDEO_ID format)
    if (videoId.startsWith('shorts/')) {
      return videoId.split('shorts/')[1] || videoId;
    }
    // Remove query parameters if present
    return videoId.includes('?') ? videoId.split('?')[0] : videoId;
  }, [videoId]);

  // Generate YouTube thumbnail URL
  const thumbnailUrl = React.useMemo(() => {
    const id = cleanVideoId;
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }, [cleanVideoId]);
  
  const [loadError, setLoadError] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const apiLoadAttemptedRef = useRef(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const playerContainerId = `youtube-player-${cleanVideoId}`;

  // Load YouTube API with retry logic
  useEffect(() => {
    if (typeof window === 'undefined' || apiLoadAttemptedRef.current) return;
    
    apiLoadAttemptedRef.current = true;

    // Check if API is already loaded
    const checkApiReady = () => {
      if (window.YT && window.YT.Player) {
        setIsApiReady(true);
        return true;
      }
      return false;
    };

    // Try immediately first
    if (checkApiReady()) return;

    // Define callback with retry logic
    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (!checkApiReady()) {
        // If not ready after callback, retry after delay
        setTimeout(checkApiReady, 500);
        return;
      }
      if (typeof originalCallback === 'function') {
        originalCallback();
      }
    };

    // Load API script with retry on error
    const loadScript = (attempt = 1) => {
      const scriptTag = document.getElementById("youtube-iframe-api");
      if (scriptTag) return;

      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        console.error(`Failed to load YouTube API (attempt ${attempt})`);
        if (attempt < 3) {
          setTimeout(() => loadScript(attempt + 1), 1000 * attempt);
        } else {
          setLoadError(true);
          if (onError) onError("API load failed after 3 attempts");
        }
      };
      document.body.appendChild(script);
    };

    loadScript();
  }, [onError]);

  // Initialize player when API is ready with retry logic
  useEffect(() => {
    if (!isApiReady || !playerRef.current || loadError) return;

    const initializePlayer = (attempt = 1) => {
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
            controls: 1,
            rel: 0,
            modestbranding: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
            enablejsapi: 1
          },
          events: {
            onReady: (event: any) => {
              console.log("YouTube player ready");
              if (onReady) onReady();
            },
            onError: (event: any) => {
              console.error("YouTube player error:", event.data);
              if (attempt < 3) {
                console.log(`Retrying player initialization (attempt ${attempt + 1})`);
                setTimeout(() => initializePlayer(attempt + 1), 1000 * attempt);
              } else {
                setLoadError(true);
                if (onError) onError(event.data);
              }
            },
            onStateChange: (event: any) => {
              console.log("Player state changed:", event.data);
            }
          },
        });
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
        if (attempt < 3) {
          setTimeout(() => initializePlayer(attempt + 1), 1000 * attempt);
        } else {
          setLoadError(true);
          if (onError) onError(error);
        }
      }
    };

    initializePlayer();

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