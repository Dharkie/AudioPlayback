import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import { PiSpeakerHighFill } from 'react-icons/pi';
import { GiSpeakerOff } from 'react-icons/gi';
import { IoVolumeMuteOutline } from 'react-icons/io5';

const Volume = ({ displayVol, OnVolumeIncrease, updateVolumeinJson, OnVolumeDecrease, Onmute }) => {
    const [ismuted, setismuted]=useState(false)
    const [checkmute, setcheckmute]=useState(false)

    const setmuteState = () => {
        setismuted(true)
        setcheckmute(true);
        setTimeout(() => {
            setcheckmute(false);
            }, 2000);
        
      };
      
  return (
    <>
     
        <div className="">
          {/* DISPLAY CURRENT Volume */}
          <div>{displayVol}</div>
          {checkmute && ismuted && <div>Muted</div>}
            
          {/* low volume button */}
          <button className="button" onClick={() => { updateVolumeinJson(); OnVolumeDecrease();  }}>
            <GiSpeakerOff />
          </button>

          {/* mute button */}
          <button className="button" onClick={() => {  updateVolumeinJson();Onmute(); setmuteState(); }}>
            <IoVolumeMuteOutline />
          </button>

          {/* High volume button */}
          <button className="button" onClick={() => { updateVolumeinJson(); OnVolumeIncrease(); }}>
            <PiSpeakerHighFill />
          </button>
        </div>
      
    </>
  );
};

export default Volume;