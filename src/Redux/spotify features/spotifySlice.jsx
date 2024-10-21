import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccessToken } from "./spotifyAPI";
import axios from "axios";

const API_URL = "https://api.spotify.com/v1";

//use AsyncThunk to fetch album tracks from Spotify
export const fetchAlbumTracks = createAsyncThunk(
  "spotify/fetchAlbumTracks",
  async (albumId) => {
    const token = await fetchAccessToken();
    const response = await axios.get(`${API_URL}/albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 8,
      },
    });
    return { albumId, tracks: response.data.items };
  }
);

export const fetchSpotifyCharts = createAsyncThunk(
  "spotify/fetchSpotifyCharts",
  async () => {
    try {
      const token = await fetchAccessToken();
      const res = await axios.get(`${API_URL}/browse/new-releases`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 6,
        },
      });
      //console.log(res.data.albums.items);
      return res.data.albums.items;
    } catch (e) {
      console.error("Error fetching spotify charts:", e);
      throw new Error("Failed to fetch spotify charts");
    }
  }
);

const spotifySlice = createSlice({
  name: "spotify",
  initialState: {
    token: null,
    charts: [],
    albumTracks: {},
    loading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setChart: (state, action) => {
      state.charts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch spotify albums
      .addCase(fetchSpotifyCharts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpotifyCharts.fulfilled, (state, action) => {
        state.loading = false;
        state.charts = action.payload;
      })
      .addCase(fetchSpotifyCharts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //fetch spotify album tracks
      .addCase(fetchAlbumTracks.fulfilled, (state, action) => {
        state.loading = false;
        const { albumId, tracks } = action.payload;
        state.albumTracks[albumId] = tracks;
      })
      .addCase(fetchAlbumTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setToken, setChart } = spotifySlice.actions;

export default spotifySlice.reducer;
