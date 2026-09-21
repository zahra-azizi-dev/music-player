"use client";
import { useContext, useState, useEffect, createContext } from "react";
import { AuthContext } from "./AuthContext";
import React from "react";
const FavoriteContext = createContext();
export function FavoriteProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  async function fetchFavorites() {
    if (!user) return;
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user.id}?populate=songs`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const data = await res.json();
    console.log("Favorite fetch result:", data);
    setFavoriteSongs(data.songs || []);
  }
  function isFavorite(songId) {
    return favoriteSongs.some((song) => song.id === songId);
  }
  async function toggleFavorite(song) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    let updatedSongs;

    if (isFavorite(song.id)) {
      updatedSongs = favoriteSongs.filter((s) => s.id !== song.id);
    } else {
      updatedSongs = [...favoriteSongs, song];
    }
    const songIds = updatedSongs.map((song) => song.id);
    await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ songs: songIds }),
    });
    setFavoriteSongs(updatedSongs);
  }
  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return (
    <FavoriteContext.Provider
      value={{ favoriteSongs, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
export function useFavorite() {
  return useContext(FavoriteContext);
}