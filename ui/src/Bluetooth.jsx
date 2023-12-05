import { useState, useEffect } from 'react'
import React from "react";
import './App.css'

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Bluetooth =() =>{
    
    {/* STATES DECLARATION*/}
    const [bluetooth, setbluetoothdevices]=useState([])
    const [bluetoothDevices, setBluetoothDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [connectedevice, setconnectedevice]=useState([])
    const navigate = useNavigate();


    {/* USing the state property of navigation to pass information to another component*/}
    const backtoMainPage =()=>
    {
        navigate('/', {state:{connectedevice}})
    }//eo renderDevices::

    {/* GET ALL BLUETOOTH DEVICES*/}
    const fetchBluetoothDevices = async () => {
      try {
        const response = await axios.get('/api/bluetooth');
        setBluetoothDevices(response.data);
        
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Bluetooth devices:', error);
      }
    };
    {/*END OF GET ALL BLUETOOTH DEVICES*/}


    {/* Run on first mount*/}
    useEffect(()=>{
        fetchBluetoothDevices();
    },[])


{/*Handle selecting a Bluetooth device */} 
  const handleDeviceSelect = (deviceId) => {
    setSelectedDevice(deviceId);
    updateConnectedDevice(deviceId);// Update the connected device using the PUT request
  };
  {/*End of Handle selecting a Bluetooth device */}

  
  {/*PUT METHOD TO UPDATE BLUETOOTH DEVICE*/}
  const updateConnectedDevice = async (deviceId) => {
    try {
      const resp = await axios.put('/api/bluetooth/connected', { deviceId });
      setconnectedevice(resp.data)
      console.log(connectedevice.blue);
    } catch (error) {
      console.error('Error updating connected device:', error);
    }
  };
  {/* END OF PUT METHOD TO UPDATE BLUETOOTH DEVICE*/}
 
    return(
        <div className='bodi'>
      <div className='title'>Bluetooth Devices</div>
      <div className='device-list'>
        {bluetoothDevices.map((device) => (
          <div key={device.id} className='device-item'>
            <label htmlFor={`device-${device.id}`} className='device-label'>
              {device.name}
            </label>
            <input
              type='radio'
              id={`device-${device.id}`}
              name='bluetoothDevices'
              value={device.id}
              checked={selectedDevice === device.id}
              onChange={() => handleDeviceSelect(device.id)}
              className='device-radio'
            />
          </div>
        ))}
      </div>
      <button onClick={backtoMainPage} className='back-button'>
        Back
      </button>
    </div>
  );
};
export default Bluetooth;