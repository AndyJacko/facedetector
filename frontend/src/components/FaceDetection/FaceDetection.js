import React from 'react';
import './FaceDetection.css';


const FaceDetection = ({imageUrl, box}) => {
  return (
    <div className='center ma3'>      
      {imageUrl === ''
      ?
      <div>
        <p>Enter an image URL in the box above...</p>
      </div>
      :
      <div className='absolute'>
        <img id='inputImage' className='br3 ba bw1 b--black shadow-5' src={imageUrl} alt='Face Detection Image' width='500px' height='auto' />
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
      }      
    </div>
  );
}

export default FaceDetection;