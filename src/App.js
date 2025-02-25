// src/App.js
import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';

const playlist = [
  { id: 1, title: "Song 1", videoId: "stvWuowo1dU" },
  { id: 2, title: "Song 2", videoId: "GwCUbhE0TY0" },
  { id: 3, title: "Song 3", videoId: "Hvw1TXP_p_o" },
  { id: 4, title: "Song 4", videoId: "aOXvyd9v1cg" },
  { id: 5, title: "Song 5", videoId: "fgCxSjrNvGA" },
  { id: 6, title: "Song 6", videoId: "js6JBdLzNn4" },
  { id: 7, title: "Song 7", videoId: "pzWMF4D1H00" },
];

function App() {
  const [currentSong, setCurrentSong] = useState(playlist[0]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">My Spotify Clone</h1>
      <MusicPlayer song={currentSong} />
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Playlist</h2>
        <ul>
          {playlist.map((song) => (
            <li
              key={song.id}
              className={`p-2 cursor-pointer hover:bg-gray-800 ${song.id === currentSong.id ? 'bg-gray-700' : ''}`}
              onClick={() => setCurrentSong(song)}
            >
              {song.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
