import { useSelector, useDispatch } from "react-redux";
import { fetchAlbumTracks} from "../Redux/spotify features/spotifySlice";
import { useEffect } from "react";
import {fetchSpotifyCharts} from "../Redux/spotify features/spotifySlice";
import { useNavigate } from "react-router-dom";



function SpotifyCharts() {
const charts = useSelector((state)=> state.spotify.charts);
const loading = useSelector((state)=> state.spotify.loading);
const error = useSelector((state) => state.spotify.error);
const dispatch = useDispatch();
const navigate = useNavigate();

//console.log(charts);

useEffect(()=>{
    
    if(charts.length === 0) {
        dispatch(fetchSpotifyCharts());
    }
}, [dispatch, charts]);

const handleClick = (albumId) =>{
    dispatch(fetchAlbumTracks(albumId));
    navigate(`/music/${albumId}`);  // navigate to album page with albumId as parameter  // replace '/album/:albumId' with your actual route path  // replace 'albumId' with the actual prop name for the albumId in your data  // this is just an example, you might need to adjust it based on your data structure  // you might also want to add some error handling in case the album cannot be found or fetched  // this example assumes you have a navigation hook
}

  return (
    <div>
        <h1 className="my-5 font-bold text-2xl "> Popular Albums</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="flex overflow-auto">
        {!loading && Array.isArray(charts) && charts.length > 0 && charts.map((chart, index) => (
            <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]" 
            key={index}
            onClick={ ()=> handleClick(chart.id)}>
                <img className="rounded" src={chart.images[0].url} alt={chart.name} />  
                <p className="font-bold mt-2 mb-1 "> {chart.name}</p>
                <p className="text-slate-200 text-sm"> {chart.artists[0].name}</p>
            </div>
        ))} 
             </div>
        
    </div>
    
  )
}

export default SpotifyCharts