import { useParams} from "react-router-dom";
import {
  fetchAlbumTracks,
  fetchSpotifyCharts,
} from "../Redux/spotify features/spotifySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import {setCurrentTrack} from '../Redux/spotify features/playerSlice';

function getAlbumTracks() {
  const { id } = useParams(); //get album id from the Url parameters
  const dispatch = useDispatch();

  //get the tracks data, loading state, ad error state from redux
  const tracks = useSelector((state) => state.spotify.albumTracks[id]);
  const loading = useSelector((state) => state.spotify.loading);
  const charts = useSelector((state) => state.spotify.charts);
  //console.log(tracks);

  // optional chaining operator to handle
  const album = charts?.find((chart) => chart.id === id);

  console.log(tracks);
  console.log(tracks[3].preview_url);
  // console.log(album);

  useEffect(() => {
    if (!tracks) {
      dispatch(fetchAlbumTracks(id));
    }
    if (!charts || charts.length === 0) {
      dispatch(fetchSpotifyCharts());
    }
  }, [dispatch, id, tracks, charts]);

  // handle the click to play a track
  const handleTrackClick = (track) => {
    if(track.preview_url){
        dispatch(setCurrentTrack(track.preview_url))
    } else{
      alert("no preview available for this track");
    }
  }

  return (
    <div>
      <Navbar />
     { album ? (
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end ">
        {
            //only attempt to render if the album is already available
          // checks if the album and its image exists before attemping to render the image
          album?.images?.[0]?.url && (
            <img className="w-48 rounded" src={album.images[0].url} alt="" />
          )
        }
        <div className="flex flex-col">
          <p className="capitalize"> {album.type}</p>
          <h2 className="text-5xl font-bold mb-4 mt-1 md:text-7xl">
            {album.name}{" "}
          </h2>
          <p>
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt=""
            />
            <b> Muziki </b>
            <span className="ml-2"> • </span>
            <b className="font-bold italic"> {album.artists[0].name}</b>
            <span className="ml-2"> • </span>
            <b> {album.release_date?.substring(0, 4)}</b>
            <span className="ml-2"> • </span>
            <b> {album.total_tracks} Songs </b>
            <span className="ml-2"> • </span>
            about 2 hrs 30 min
          </p>
        </div>
      </div>
     ): (
        <p>Loading album details </p>
     )}
      <div>
        {/* heading for the track */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 mt-10 mb-4 pl-2 text-[#a7a7a7]">
          <p className="font-semibold">
            {" "}
            <b className="mr-4"> #</b> Title
          </p>
          <p className="font-semibold"> Artist</p>

          {/* center the clock icon in its column */}
          <div className="text-center">
            <img className="m-auto w-4" src={assets.clock_icon} alt="" />
          </div>
        </div>
        <hr />
        {/* track data display */}
        {!loading && tracks && tracks.length === 0 && (
          <p>No tracks found for this album.</p>
        )}
        {!loading && tracks && (
          <>
            {tracks.map((track, index) => (
              <div
                key={index}
                className="grid grid-cols-3 sm:grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer group"
                onClick={() => handleTrackClick(track)}
              >
                <div className="flex items-center">
                  {/* show the track number by default */}
                  <span className="group-hover:hidden">
                    <b className="mr-4 text-[#a7a7a7]"> {index + 1} </b>
                  </span>
                  <span className="hidden group-hover:inline-block mr-2 p-3">
                    <img
                      className="w-5 h-5"
                      src={assets.play_icon}
                      alt="play_icon"
                    />
                  </span>

                  {/* title text */}
                  <p className="text-white block"> {track.name} </p>
                </div>

                <p className="group-hover:text-white">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p className="text-[15px] text-center">
                  {" "}
                  {Math.floor(track.duration_ms / 60000)}:{" "}
                  {Math.floor((track.duration_ms % 60000) / 1000)
                    .toString()
                    .padStart(2, "0")}{" "}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default getAlbumTracks;
