import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import { ImVolumeIncrease } from "react-icons/im";
import { ImVolumeDecrease } from "react-icons/im";
import { IoVolumeMuteOutline } from 'react-icons/io5';
import { VscUnmute } from "react-icons/vsc";

const Volume = ({ displayVol, OnVolumeIncrease, updateVolumeinJson, OnVolumeDecrease, Onmute }) => {
    const [ismuted, setismuted]=useState(false)
    const [checkmute, setcheckmute]=useState(false)
    const [isMute, setIsMute]=useState(true)
    const [muteState,setMuteState]=useState(false)

    const setmuteState = () => {
        updateVolumeinJson(); 
        setIsMute(!isMute);
        setMuteState(!muteState);
      };
      const setDecreaseVol =()=>{
        updateVolumeinJson(); 
        OnVolumeDecrease();
        if(isMute==false){
            setIsMute(true)
        }
    }
    
    const setIncreaseVol =()=>{
        updateVolumeinJson(); 
        OnVolumeIncrease();
        if(isMute==false){
            setIsMute(true)
        }
    }
      
  return (
    <>
     
        <div className="">
          {/* DISPLAY CURRENT Volume */}
          <div>{isMute? displayVol: ''}</div>
            
          {/* low volume button */}
          <button className="button" onClick={() => { setDecreaseVol() }}>
          <ImVolumeDecrease />
          </button>

          {/* mute button */}
          <button className="button" onClick={() => {  setmuteState(); }}>{muteState?
          <VscUnmute />:<IoVolumeMuteOutline />}
          </button>

          {/* High volume button */}
          <button className="button" onClick={() => { setIncreaseVol()  }}>
          <ImVolumeIncrease />
          </button>
        </div>
      
    </>
  );
};

export default Volume;