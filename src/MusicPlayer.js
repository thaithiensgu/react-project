// src/MusicPlayer.js
import React, { useRef, useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const MusicPlayer = ({ song }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    // Lấy thời lượng của video sau khi sẵn sàng
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event) => {
    // event.data: 1 đang chạy, 2 tạm dừng,...
    if (event.data === 1) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Khi chuyển bài, tải video mới
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(song.videoId);
      setCurrentTime(0);
    }
  }, [song]);

  // Cập nhật thời gian phát mỗi giây
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current) {
          const time = playerRef.current.getCurrentTime();
          setCurrentTime(time);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSkip = (seconds) => {
    if (playerRef.current) {
      const newTime = playerRef.current.getCurrentTime() + seconds;
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  // Hàm định dạng thời gian mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Đĩa nhạc xoay */}
      <div className={`w-64 h-64 rounded-full border-4 border-gray-700 flex items-center justify-center overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
        <img src="https://via.placeholder.com/300" alt="Album Cover" className="w-full h-full object-cover" />
      </div>

      {/* Hiệu ứng sóng nhạc */}
      <div className="mt-4 flex space-x-1">
        <div className="w-2 bg-green-500 inline-block h-8 animate-wave" />
        <div className="w-2 bg-green-500 inline-block h-10 animate-wave delay-200" />
        <div className="w-2 bg-green-500 inline-block h-6 animate-wave delay-400" />
        <div className="w-2 bg-green-500 inline-block h-12 animate-wave delay-600" />
        <div className="w-2 bg-green-500 inline-block h-7 animate-wave delay-800" />
      </div>

      {/* Hiển thị thời gian và nút điều khiển */}
      <div className="mt-4 flex flex-col items-center">
        <div className="mb-2">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleSkip(-10)}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            -10s
          </button>
          <button
            onClick={handlePlayPause}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => handleSkip(10)}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            +10s
          </button>
        </div>
      </div>

      {/* YouTube player (ẩn) */}
      <YouTube
        videoId={song.videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />
    </div>
  );
};

export default MusicPlayer;
