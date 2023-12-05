const express = require('express');
const fsp = require('fs').promises;
const app = express();
const port = 5001;

// Middleware for parsing req bodies to JSON (req.body)
app.use(express.json());

app.get('/api/volume', (req, res, next) => {
  fsp.readFile('./data.json')
    .then((data) => {
      const json = JSON.parse(data);
      console.log('Server Response:', json);
      res.send({ volume: json.volume, bluetoothDevices: json.bluetoothDevices });

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Data file not found or corrupt');
    });
});

{/* GET ALL BLUETOOTH DEVICES*/}
app.get('/api/bluetooth', async (req, res, next) => {
  try {
    const data = await fsp.readFile('./data.json');
    const json = JSON.parse(data);
    console.log('Server Response:', json);
    res.json(json.bluetooth.devices);
  } catch (err) {
    console.error(err);
    res.status(500).send('Data file not found or corrupt');
  }
});
{/*END OF GET ALL BLUETOOTH DEVICES*/}

{/* UPDATE VOLUME VALUE*/}
app.put('/api/volume', (req, res) => {
  fsp.readFile('./data.json')
    .then((data) => {
      const json = JSON.parse(data);
      json.volume = Number(req.body.volume);
      console.log(json.volume)
      fsp.writeFile('./data.json', JSON.stringify(json))
        .then(() => {
          res.send({ volume: Number(req.body.volume) });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Data file not found or corrupt');
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Data file not found or corrupt');
      });
});
{/* END OF UPDATE VOLUME VALUE*/}


{/*Get SONG BY ID*/}
app.get('/api/songs/:id', async (req, res) => {
  const {id: songId}=req.params;
  try{
    const getSong= await fsp.readFile('./data.json')
    const songJson= JSON.parse(getSong);
    const deviceExist = songJson.records.playlist.some((song)=> song.id ===parseInt(songId,10))
    if(!deviceExist)
    {
      res.status(500).send(`Song with ID ${songId} does not exist`)
    }
    else{
      res.send(songJson.records.playlist.find((song) => song.id === parseInt(songId, 10)));
    }
}
catch (err){
  console.error('Error fiinding song:', err);
    res.status(500).send('Internal Server Error');
}
});
{/*END OF Get SONG BY ID*/}

const logError = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const handleError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send('An error occured');
};



{/*SELECT DEVICE BY ID*/}

app.put('/api/bluetooth/connected', async (req, res) => {
  const { deviceId } = req.body;

  try {
    const data = await fsp.readFile('./data.json');
    const jsonData = JSON.parse(data);

    // Check if the device exists in the list
    const deviceExists = jsonData.bluetooth.devices.some(device => device.id === Number(deviceId));

    if (!deviceExists) {
      return res.status(400).send('Device not found');
    }
    
    // Update the connected device
    jsonData.bluetooth.connected = deviceId;
    const foundDevice=jsonData.bluetooth.devices.find(device => device.id === Number(deviceId));

    // Write the updated data back to the file
    await fsp.writeFile('./data.json', JSON.stringify(jsonData));

    res.json({ blue: foundDevice.name });
  } 
  catch (error) {
    console.error('Error updating connected device:', error);
    res.status(500).send('Internal Server Error');
  }
});
{/*END OF SELECT DEVICE BY ID*/}



// Error handling middleware
app.use(logError);
app.use(handleError);

app.listen(port, () => {
  console.log(`Final project API listening on port ${port}`);
});