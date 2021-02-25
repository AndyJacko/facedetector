import React from 'react';
import Tilty from 'react-tilty';
import face from './facedetector.png';
import './Logo.css';


const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilty className='logo'><img src = {face} alt = 'Face Detector Logo'/></Tilty>
    </div>
  );
}

export default Logo;