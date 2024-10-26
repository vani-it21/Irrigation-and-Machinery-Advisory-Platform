import React from 'react';
import { useNavigate } from 'react-router-dom';
import './flex.css';

function Erode_crop() {
  const navigate = useNavigate();

  const fetchDataClick = (cropName) => {
    alert(cropName); // Show the selected crop name
    navigate(`/${cropName}`);
  };

  return (
    <div>
      <div>
        <div>
          <input aria-placeholder='crops' />
        </div>
        <div className='whole_wid'>
          <div className='wid' onClick={() => fetchDataClick('Tomato')}>Tomato</div>
          <div className='wid' onClick={() => fetchDataClick('Potato')}>Potato</div>
          <div className='wid' onClick={() => fetchDataClick('Sugarcane')}>Sugarcane</div>
          <div className='wid' onClick={() => fetchDataClick('Cotton')}>Cotton</div>
          <div className='wid' onClick={() => fetchDataClick('Banana')}>Banana</div>
          <div className='wid' onClick={() => fetchDataClick('Ragi')}>Ragi</div>
          <div className='wid' onClick={() => fetchDataClick('Groundnut')}>Groundnut</div>
          <div className='wid' onClick={() => fetchDataClick('Maize')}>Maize</div>
          <div className='wid' onClick={() => fetchDataClick('Cholam')}>Cholam</div>
        </div>
      </div>
    </div>
  );
}

export default Erode_crop;