import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onImageSubmit}) => {
  return (
    <div>
      <p className='f4 fw9'>
        {'Face Detector will detect a face in your image. Give it a try!'}
      </p>
      <div className='center'>
        <div className='center form pa3 br2 shadow-5'>
          <input className='f4 pa1 w-75 outline-0' type='text' onChange={onInputChange} />
          <button className='f4 pa1 w-25 outline-0 b white bg-dark-red' onClick={onImageSubmit}>GO</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;