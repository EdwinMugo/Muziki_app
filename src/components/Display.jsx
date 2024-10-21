import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { useEffect, useRef, useState } from "react";
import { albumsData } from "../assets/assets";
import DisplayAlbumTracks from "./DisplayAlbumTracks";

//bgcolor variables
const bgColors = {
  bg1: "#2a4365",
  bg2: "#22543d",
  bg3: "#742a2a",
  bg4: "#44337a",
  bg5: "#234e52",
  bg6: "#744210",
};

// random color pallete generator function
const getRandomColor = () => {
  const colorKeys = Object.keys(bgColors);
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return bgColors[randomKey];
};

function Display() {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const isMusic = location.pathname.includes("music"); // checks if url path matches music
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const trackId = isMusic ? location.pathname.split("/").pop() : ""; // extract trackid from url path
  const bgColor = albumsData[Number(albumId)]?.bgColor;

  useEffect(() => {
    if (isMusic && trackId) {
      // checks if the color is already stored for each track page
      const storedColor = localStorage.getItem(`trackColor_${trackId}`);
      if (storedColor) {
        // if color is sored in local storage apply it
        displayRef.current.style.background = `linear-gradient( ${storedColor}, #121212)`;
      } else {
        // if not stored, generate a new color and store to local storage
        const randomColor = getRandomColor();
        localStorage.setItem(`trackColor_${trackId}`, randomColor);
        displayRef.current.style.background = `linear-gradient( ${randomColor}, #121212)`;
      }
    } else if (isAlbum && bgColor) {
      // apply charts-specific color
      displayRef.current.style.background = `linear-gradient( ${bgColor}, #121212)`;
    } else {
      // set the fallback color
      displayRef.current.style.background = `#121212`;
    }
  }, [isAlbum, isMusic, bgColor, trackId, location.pathname]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
        <Route path="/music/:id" element={<DisplayAlbumTracks />} />
      </Routes>
    </div>
  );
}

export default Display;
