'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    Settings,
    SkipBack,
    SkipForward,
    RotateCcw,
    ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
    onProgress?: (progress: number) => void;
    onComplete?: () => void;
    className?: string;
}

// Helper function to check if URL is YouTube
const isYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
};

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export function VideoPlayer({
    videoUrl,
    title,
    onProgress,
    onComplete,
    className
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const isYouTube = isYouTubeUrl(videoUrl);
    const embedUrl = isYouTube ? getYouTubeEmbedUrl(videoUrl) : videoUrl;

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // Auto-hide controls
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isPlaying && showControls) {
            timeout = setTimeout(() => setShowControls(false), 3000);
        }
        return () => clearTimeout(timeout);
    }, [isPlaying, showControls]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;

            setCurrentTime(current);
            setDuration(total);

            const progress = (current / total) * 100;
            onProgress?.(progress);

            // Mark as complete when 95% watched
            if (progress >= 95) {
                onComplete?.();
            }
        }
    };

    const handleSeek = (value: number[]) => {
        if (videoRef.current) {
            const newTime = (value[0] / 100) * duration;
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        const newVolume = value[0] / 100;
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (videoRef.current) {
            if (isMuted) {
                videoRef.current.volume = volume;
                setIsMuted(false);
            } else {
                videoRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    const skipTime = (seconds: number) => {
        if (videoRef.current) {
            const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleLoadedData = () => {
        setIsLoading(false);
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative bg-black group",
                isFullscreen ? "w-screen h-screen" : "aspect-video",
                className
            )}
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Video Element or YouTube Iframe */}
            {isYouTube ? (
                <div className="relative w-full h-full">
                    <iframe
                        ref={iframeRef}
                        src={`${embedUrl}?enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setIsLoading(false)}
                    />
                    {/* YouTube External Link */}
                    <div className="absolute top-2 right-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="bg-black/50 text-white hover:bg-black/70"
                            onClick={() => window.open(videoUrl, '_blank')}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedData={handleLoadedData}
                    onEnded={() => setIsPlaying(false)}
                    preload="metadata"
                />
            )}

            {/* Loading Spinner */}
            {isLoading && !isYouTube && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}

            {/* Controls Overlay */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
                    showControls ? "opacity-100" : "opacity-0"
                )}
            >
                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium truncate">{title}</h3>
                    {isYouTube && (
                        <p className="text-white/70 text-sm">YouTube Video - Use YouTube controls</p>
                    )}
                </div>

                {/* Bottom Controls - Only show for non-YouTube videos */}
                {!isYouTube && (
                    <>
                        {/* Center Play/Pause Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={togglePlay}
                                className="text-white hover:bg-white/20 rounded-full w-16 h-16"
                            >
                                {isPlaying ? (
                                    <Pause className="h-8 w-8" />
                                ) : (
                                    <Play className="h-8 w-8 ml-1" />
                                )}
                            </Button>
                        </div>

                        {/* Bottom Controls */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                            {/* Progress Bar */}
                            <div className="flex items-center gap-2">
                                <span className="text-white text-sm">
                                    {formatTime(currentTime)}
                                </span>
                                <Slider
                                    value={[progressPercentage]}
                                    onValueChange={handleSeek}
                                    max={100}
                                    step={0.1}
                                    className="flex-1"
                                />
                                <span className="text-white text-sm">
                                    {formatTime(duration)}
                                </span>
                            </div>

                            {/* Control Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={togglePlay}
                                        className="text-white hover:bg-white/20"
                                    >
                                        {isPlaying ? (
                                            <Pause className="h-4 w-4" />
                                        ) : (
                                            <Play className="h-4 w-4" />
                                        )}
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => skipTime(-10)}
                                        className="text-white hover:bg-white/20"
                                    >
                                        <SkipBack className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => skipTime(10)}
                                        className="text-white hover:bg-white/20"
                                    >
                                        <SkipForward className="h-4 w-4" />
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={toggleMute}
                                            className="text-white hover:bg-white/20"
                                        >
                                            {isMuted || volume === 0 ? (
                                                <VolumeX className="h-4 w-4" />
                                            ) : (
                                                <Volume2 className="h-4 w-4" />
                                            )}
                                        </Button>

                                        <div className="w-20">
                                            <Slider
                                                value={[isMuted ? 0 : volume * 100]}
                                                onValueChange={handleVolumeChange}
                                                max={100}
                                                step={1}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white hover:bg-white/20"
                                    >
                                        <Settings className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={toggleFullscreen}
                                        className="text-white hover:bg-white/20"
                                    >
                                        {isFullscreen ? (
                                            <Minimize className="h-4 w-4" />
                                        ) : (
                                            <Maximize className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* YouTube Info */}
                {isYouTube && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="bg-black/80 text-white p-3 rounded-lg">
                            <p className="text-sm">
                                This is a YouTube video. Use the YouTube player controls above to play, pause, and navigate.
                                Progress tracking is not available for YouTube videos.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Keyboard Shortcuts Info */}
            <div className="absolute bottom-20 right-4 bg-black/80 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <div>Space: Play/Pause</div>
                <div>←/→: Skip 10s</div>
                <div>↑/↓: Volume</div>
                <div>F: Fullscreen</div>
            </div>
        </div>
    );
}
