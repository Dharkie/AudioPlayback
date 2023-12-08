import { useState, useEffect } from 'react'
import React from "react";
import axios from 'axios'
import Volume from './Volume';
import './App.css'
import { useLocation } from 'react-router-dom';
import { MdOutlinePlayCircleFilled } from "react-icons/md"
import { TbPlayerPauseFilled } from "react-icons/tb";
import { LuListRestart } from "react-icons/lu";
import { FaBluetooth } from "react-icons/fa";
import { IoStopCircle } from "react-icons/io5";
import { FaFastForward } from "react-icons/fa";
import { FaFastBackward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { ImLoop2 } from "react-icons/im";
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PlaybackControl =(blueResponse) =>{

{/* STATES DECLARATION*/}
const [volume, setVolume]=useState('');
const [isLooping, setLooping] = useState(false);
const [isPlaying, setisplaying]= useState(false)
const [duration, setduration]=useState(0)
const [blue, setblue]=useState(false)

const [songId, setsongId]=useState(1)
const [currentSong, setCurrentSong] = useState([]);
const navigate = useNavigate();

{/*Using Location to fetch state that was passed through navigation */}
const location =useLocation()


{/* PLAYBACK CONTROLS*/}
const fetchNextSong = async (songId) => {
    try {
        {/* /get song by id */}
      const response = await axios.get(`/api/songs/${songId}`);
      console.log(response.data)
      setCurrentSong(response.data);
      setisplaying(true); // Auto-play the next song
    } catch (error) {
      console.error('Error fetching next song:', error);
    }
  };

  const nextTrack = () => {
    console.log('Getting next track from API');
    if (currentSong.id == 10) {
        console.log('Current song ID is greater than 4. Stopping playback or taking some action.');
        // You might want to stop playback or take some other action here
      } else {
        fetchNextSong(currentSong.id + 1); 
        if(isPlaying == false)
        {
            setisplaying(true);
        } 
      }
  };

  const prevTrack = () => {
    console.log('Getting previous track from API');
    if (currentSong.id == 1) {
        console.log('Current song ID is less than 1. Stopping playback or taking some action.');
        // You might want to stop playback or take some other action here
      } else {
        fetchNextSong(currentSong.id - 1); 
        if(isPlaying == true)
        {
            setisplaying(false);
        } 
      }
  }

  const shuffleTracks = () => {
    console.log('Getting previous track from API')
    fetchNextSong(Math.floor(Math.random() * 10) + 1); 
}
const stopPlayback = () => {
    if(isPlaying == false)
    {
        setisplaying(true);
    } 
  };
  
const toggleLoop = () => {
    setLooping(!isLooping);
    if (isLooping) {
      fetchNextSong(1);
    } else {
      stopPlayback();
    }
  };
  

function isPlayingControl(){
    setisplaying(!isPlaying);
}


{/*END OF PLAYBACK CONTROLS*/}
  
{/*Get Connected Devices */}
const navtoBluetooth =()=>
  {
    navigate('/bluetooth')
  }
   


{/*VOLUME CONTROLS*/}

  const increaseVolume = () => {
    setVolume((prevVolume) => Math.min(prevVolume + 5, 100)); // Increase volume, but limit it to 100
  };
  
  const decreaseVolume = () => {
    setVolume((prevVolume) => Math.max(prevVolume - 5, 0)); // Decrease volume, but limit it to 0
  };
   
  const mute=()=>{
    setVolume(0);
  }
  
  {/*FETCH VOLUME DATA WHEN COMPONENT MOUNTS*/}
  const fetchVolData =async() =>
  {
    try{
      const response =await axios.get('/api/volume');
      const fetchedData= response.data;
      
      if(fetchedData.volume)
      {
        setVolume(fetchedData.volume);
      }
    }
    catch(error) {
      console.error(`Error ${error} fetching file`);
    }
  }
  {/*END OF FETCH VOLUME DATA WHEN COMPONENT MOUNTS*/}

  {/*UPDATE VOLUME IN JSON*/}
  const updateJsonFile = async () => {
    const jsonData = {
      volume: volume
    };

    try {
      const resp=await axios.put('/api/volume', jsonData);
      const respData= resp.data
    } catch (error) {
      console.error('Error updating JSON file:', error);
    }
    
    {/*END OF VOLUME CONTROLS*/}
  };


  useEffect(()=>{
    fetchVolData(); 
    fetchNextSong(songId);   
  },[])
  
    return(
        <>
        <div className='body'>
        
       <div className='details'>
       {location.state && location.state.connectedevice && location.state.connectedevice.blue ? (
  <div className='blue-details'>{`${location.state.connectedevice.blue} connected`}</div>
) : (
  <div className='blue-details'>Bluetooth: N/A</div>
)}

        <button className= "button" onClick={()=>{navtoBluetooth()}}><FaBluetooth /></button>  
        <div>
        <img src={currentSong.albumArt} alt="Album Art" className='album-art'/>
        </div>
        <div className='now-playing'>Playing:{currentSong.artist}</div>
        <div className='track-name'>Track Name:{currentSong.title}</div>
       </div>
       
        {/*volume*/}
        <Volume displayVol ={ volume } 
        OnVolumeIncrease={ increaseVolume } 
        OnVolumeDecrease={ decreaseVolume }
        Onmute={mute}
        updateVolumeinJson={updateJsonFile}></Volume>

        <div className='playbackcontrol'>
        {/* Current time */}
        <div className='current-time'>0:00</div>

        {/* Progress Bar */}
        <div className='slider'>
            <input className='progressbar' type='range' />
        </div>

        {/* Duration */}
        <div className='duration'>{duration}</div>
        </div>
        
        <div className= "playbck-control"> 
        {/* Playback Controls */}
        <button onClick={prevTrack} className="button"><FaFastBackward /></button>
        <button onClick={()=>{isPlayingControl()}} className="button">{isPlaying ? (<FaPlay />): (<TbPlayerPauseFilled />)}</button>
        <button onClick={()=>{nextTrack()}} className="button"><FaFastForward /></button>
        <button onClick={stopPlayback} className="button"><IoStopCircle /></button>
        <button onClick={shuffleTracks} className="button"><ImLoop2 /></button>
    <button onClick={toggleLoop} className='button'>{isLooping? <FaToggleOn />:<FaToggleOff />}</button>
        
        
        </div>
        </div>
        </>
    )
}
export default PlaybackControl;