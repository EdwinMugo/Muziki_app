import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "./spotify features/spotifySlice";
import playerReducer from './spotify features/playerSlice';

export const store = configureStore({
    reducer:{
        spotify: spotifyReducer, //manage state of the spotify API calls
        player: playerReducer, //manage state for playing tracks
    },
});