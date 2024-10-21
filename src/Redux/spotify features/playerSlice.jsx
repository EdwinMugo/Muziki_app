import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    currentTrack: null, //stores the song preview_url provided by Spotify API
    isPlaying: false, //handles play/pause functionality
};

const playerSlice = createSlice({
    name: 'player', 
    initialState,
    reducers: {
        togglePlay: (state) => {
            state.isPlaying =true;
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
            isPlaying = true;
        },
        togglePause: (state) => {
            state.isPlaying = false;
        },
        toggleNextTrack: (state, action) => {
            
        }
    }
});

export const { togglePlay, setCurrentTrack, togglePause } = playerSlice.actions;

export default playerSlice.reducer;