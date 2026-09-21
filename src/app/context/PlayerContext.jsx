"use client";
import { useRef, useContext, useState, createContext, useEffect } from "react";
import React from "react";

const playerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [list, setList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [volume, setVolume] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  function playSong(song, songList) {
    const index = songList.findIndex((s) => s.id === song.id);
    setIsPlaying(true);
    setList(songList);
    setCurrentIndex(index);
    setCurrentSong(song);
  }
  function togglePlay() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying((prev) => !prev);
  }
  function nextSong() {
    const newIndex = (currentIndex + 1) % list.length;
    setCurrentIndex(newIndex);
    setCurrentSong(list[newIndex]);
    setIsPlaying(true);
  }
  function prevSong() {
    const prevnewIndex = (currentIndex - 1 + list.length) % list.length;
    setCurrentIndex(prevnewIndex);
    setCurrentSong(list[prevnewIndex]);
    setIsPlaying(true);
  }
  function toggleShuffle() {
    setIsShuffle((prev) => !prev);
  }
  function cycleRepeatMode() {
    const modes = ["off", "all", "one"];
    const currentModeIndex = modes.indexOf(repeatMode);
    const nextModeIndex = (currentModeIndex + 1) % modes.length;
    setRepeatMode(modes[nextModeIndex]);
  }
  function handleEndSong() {
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (isShuffle) {
      const shuffelMode = Math.floor(Math.random() * list.length);
      setCurrentIndex(shuffelMode);
      setCurrentSong(list[shuffelMode]);
      setIsPlaying(true);
    } else {
      const isLastSong = currentIndex === list.length - 1;
      if (isLastSong) {
        if (repeatMode === "all") {
          setCurrentIndex(0);
          setCurrentSong(list[0]);
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      } else {
        nextSong();
      }
    }
  }
  function closePlayer() {
    audioRef.current.pause();
    setIsPlaying(false);
    setCurrentSong(null);
  }
  useEffect(() => {
    if (!currentSong) return;
    audioRef.current.src = currentSong.audioUrl;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentSong]);
  return (
    <playerContext.Provider
      value={{
        currentTime,
        duration,
        currentSong,
        isPlaying,
        list,
        currentIndex,
        volume,
        isShuffle,
        repeatMode,
        audioRef,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        toggleShuffle,
        cycleRepeatMode,
        setVolume,
         closePlayer,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={handleEndSong}
      />
    </playerContext.Provider>
  );
}
export function usePlayer() {
  return useContext(playerContext);
}
