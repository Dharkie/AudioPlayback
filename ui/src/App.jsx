import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import PlaybackControl from './PlaybackControl';
import Volume from './Volume';
import Bluetooth from './Bluetooth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
 

return (
     <>
    <Router>
    <Routes>
      <Route exact path="/" element={<PlaybackControl />} />
      <Route path="/bluetooth" element={<Bluetooth  />} />
    </Routes>
  </Router>
    </>
  )
}

export default App

