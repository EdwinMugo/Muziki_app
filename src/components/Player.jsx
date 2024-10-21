import { assets } from "../assets/assets";
import { useContext, useRef, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useSelector, useDispatch } from "react-redux";


function Player() {
    // usecontext for local tracks
  const {
    seekBg,
    seekBar,
    playStatus,
    play,
    pause,
    track,
    time,
    previous,
    next,
    seekSong,
    seekVol,
    seekVolume,
    volBg,
    isMuted,
    toggleMute,
  } = useContext(PlayerContext);


  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Track information */}
      <div className="hidden lg:flex items-center gap-4">
        <img
          className={`w-14 rounded-full ${
            (playStatus) ? "animate-spin" : "animate-spin-paused"
          }`}
          src={track.image }
          alt=""
        />
        <div>
          <p> {track.name}</p>
          <p> {track.desc.slice(0, 25)}</p>
        </div>
      </div>

      {/* audio controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          {/* shuffle Button */}
          <div className="relative group">
            <img
              className="w-4 cursor-pointer hover:scale-150"
              src={assets.shuffle_icon}
              alt=""
            />
            <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
              {" "}
              Shuffle
            </div>
          </div>

          {/* previous Button */}
          <div className="relative group">
            <img
              onClick={previous}
              className="w-4 cursor-pointer"
              src={assets.prev_icon}
              alt=""
            />
            <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
              {" "}
              Previous{" "}
            </div>
          </div>

          {/* Play or Pause Button */}
          {/* toggle play and pause based on the playstatus */}

          <div className="relative group">
            {playStatus ? (
              <img
                onClick={pause}
                className="w-4 cursor-pointer"
                src={assets.pause_icon}
                alt=""
              />
            ) : (
              <img
                onClick={play}
                className="w-4 cursor-pointer"
                src={assets.play_icon}
                alt=""
              />
            )}
            <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
              {" "}
              {playStatus ? "Pause" : "Play"}
            </div>
          </div>

          {/* next Button */}
          <div className="relative group">
            <img
              onClick={next}
              className="w-4 cursor-pointer"
              src={assets.next_icon}
              alt=""
            />
            <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
              {" "}
              Next{" "}
            </div>
          </div>

          {/* Loop Button */}
          <div className="relative group">
            <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
            <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded">
              {" "}
              Repeat
            </div>
          </div>
        </div>

        {/* song progress bar */}
        <div className="flex items-center gap-5">
          <p>
            {" "}
            {time.currentTime.minute} : {time.currentTime.second}{" "}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {" "}
            {time.totalTime.minute} : {time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex item-center gap-2 opacity-75">
        <img className="w-4" src={assets.play_icon} alt="" />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />

        {/* Volume control */}
        <div className="flex items-center gap-2">
          <img
            onClick={toggleMute}
            className="w-4 cursor-pointer"
            src={isMuted ? assets.mute_Icon : assets.volume_icon}
            alt=""
          />
          <div
            ref={volBg}
            onClick={seekVolume}
            className="w-[60vw] h-2 max-w-[100px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekVol}
              className=" w-0 h-full bg-green-800 rounded-full"
            />
          </div>
        </div>

        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
}

export default Player;
