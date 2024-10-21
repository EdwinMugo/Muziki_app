//redux for API tracks
const dispatch = useDispatch();
const {currentTrack, isPlaying} = useSelector((state) => state.player);


// play and pause functions for API track
const API_play =()=> {
  if(audioRef.current){
    audioRef.current.play();
    dispatch(togglePlay()); 
  }
};
const API_pause =()=> {
  if(audioRef.current){
    audioRef.current.pause();
    dispatch(togglePause());
  }
};

// update the audio source when CurrentTrack changes
useEffect(()=>{
  if(audioRef.current && currentTrack && !currentTrack.isLocal){
    audioRef.current.src = currentTrack.preview_url;
    audioRef.current.load();
  }
}, [currentTrack]);

console.log(currentTrack?.preview_url);