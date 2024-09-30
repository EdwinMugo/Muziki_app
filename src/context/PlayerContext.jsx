import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props)=> {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const seekVol = useRef();
    const volBg = useRef();

    // volume state, default at 50%
    const [volume, setVolume] = useState(0.5);

    // track the muted state of the volume bar
    const [isMuted, setIsMuted] = useState (false);

   //loads first song as the default to the player
    const [track, setTrack] = useState(songsData[0]);

   //manage the play or pause functionality 
    const [playStatus, setPlayStatus] = useState (false);

    //manage the mini-player state
    const [isMiniPlayer, setIsMiniPlayer] = useState(false)

    //get the total duration and current time of the song
    const [time, setTime] = useState({
        currentTime:{
            second: 0,
            minute: 0
        }, 
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = ()=> {
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = ()=> {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        await setTrack (songsData[id]); //await for the state to update
        await audioRef.current.play(); // wait for the audio to start playing
        setPlayStatus(true); //set play status to true
    }

    const previous = async () => {
        if(track.id > 0){
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus (true);
        }
    }
    const next = async () => {
        if(track.id < songsData.length -1){
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus (true);
        }
    }

    const seekSong = async (e)=> {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.clientWidth ) * audioRef.current.duration)
    }

    // control the volume of a song
    const seekVolume= (e)=> {
        const newVol= e.nativeEvent.offsetX / volBg.current.clientWidth;
        audioRef.current.volume = newVol;
        setVolume(newVol);
        seekVol.current.style.width = `${newVol * 100}%`;
        setIsMuted(newVol === 0)
    }
    const toggleMute = ()=>{
        if(isMuted){
            audioRef.current.volume = volume;
            seekVol.current.style.width = `${volume * 100}%`;
        }else{
            audioRef.current.volume = 0;
            seekVol.current.style.width = `0%`
        }
        setIsMuted(!isMuted);
    }

    // sets the initial volume to 50%
    useEffect(() => {
        audioRef.current.volume = 0.5;
        seekVol.current.style.width = "50%"
    }, []);

    useEffect( ()=> {
            audioRef.current.onloadedmetadata = () => {
                setTime( prevTime => ({
                    ...prevTime,
                    totalTime: {
                        second:  Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                }))
               
            }
            audioRef.current.ontimeupdate =() => {
                // controls the width of the seekbar based on the current playback time
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100))+ '%';

                setTime(prevTime => ({
                    ...prevTime,
                    currentTime:{
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    }
                }

                ))
            }
    }, [audioRef]);


    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        seekVolume, seekVol, volBg, toggleMute,
        isMuted, setIsMuted
    }
    return (
        <PlayerContext.Provider value ={contextValue} >
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;