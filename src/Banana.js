import React, { useState } from 'react';
import './flex.css';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const type_well = [
  { value: 'private', label: 'private' },
  { value: 'public', label: 'public' }
];
const drip_type = [
  { value: '2', label: '2lph' },
  { value: '4', label: '4lph' },
  { value: '8', label: '8lph' },
  { value: '12', label: '12lph' }
];

function Banana() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [type_w, setType_w] = useState('');
  const [acr, setAcr] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [drip, setDrip] = useState('');
  const navigate = useNavigate();

  const handleChangeAcr = (e) => {
    setAcr(e.target.value);
  };

  const handleDripper = (e) => {
    setDrip(e.value);
  };

  const handleChangeType = (e) => {
    setType_w(e.value);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    const planting_distance = 5000; // Adjusted for Banana
    const no_of_days = 365; // Banana typically takes 12-14 months to mature
    const acre_in_meters = 4046.856; 
    const total_dist_plant_count = (Number(acr) * acre_in_meters) / planting_distance;
    const no_of_plants = total_dist_plant_count;

    const dripValue = Number(drip) || 1; 
    const init_stage = 6 / dripValue; 
    const mid_stage = 8 / dripValue;
    const later_stage = 5 / dripValue;

    const currentDate = new Date(selectedDate);
    const futureDate = currentDate.toLocaleDateString();

    let days_bwt = 7;
    if (Number(inputValue) > 0) {
      days_bwt = Number(inputValue);
    }

    const parts = Math.ceil(Number(acr) / 2.47);
    const farmerId = localStorage.getItem('farmer_id'); 
    const index = Object.keys(localStorage).filter(key => key.includes(farmerId)).length; 

    const key = `Banana_${index}_${farmerId}`;
    localStorage.setItem(key, JSON.stringify({
      days: no_of_days,
      i_w: init_stage,
      m_w: mid_stage,
      l_w: later_stage,
      date: futureDate,
      quantity: acr,
      parts_count: parts,
      currentDays: 0,
      timeinHrs: 4,
      days_btw: days_bwt,
      veg_name: "Banana"
    }));

    alert("Banana schedule created successfully.");
    navigate('/about');
  };

  return (
    <div>
      <div className='btn'>
        <button onClick={() => setButtonPopup(true)}>Schedule</button>
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={onHandleSubmit}>
          <div className='form-create'>
            <label>Acre:</label>
            <input type="text" name="acr" value={acr} onChange={handleChangeAcr} className="acre" />
            <label>Well Type:</label>
            <Select options={type_well} value={type_well.find(option => option.value === type_w)} name='type_w' onChange={handleChangeType} />
            <br />
            <label>Dripper Type:</label>
            <Select options={drip_type} value={drip_type.find(option => option.value === drip)} name='drip' onChange={handleDripper} />
            <br />
            {type_w === 'public' && (
              <div>
                <label>No. of Days:</label>
                <input type="text" className='days' value={inputValue} onChange={handleInputChange} />
              </div>
            )}
            <br />
            <label>Date:</label>
            <input type="date" value={selectedDate} onChange={handleDateChange} />
            <br />
            <button type="submit">Submit</button>
          </div>
        </form>
      </Popup>
      <div className='tom'>
        <h3>Banana Information</h3>
        <p>
          Banana is a tropical and subtropical fruit that requires a hot and humid climate. The plant grows well in deep, rich, well-drained loamy soils with adequate irrigation.
        </p>
        <h3>Soil & Climate</h3>
        <h4>Soil</h4>
        <p>
          Banana thrives in well-drained, fertile soils with a pH of 6.0-7.5. The soil should be rich in organic matter and have good water retention properties.
        </p>
        <h4>Climate</h4>
        <p>
          Banana requires a warm, humid climate with an average temperature of 26°C to 30°C. It is sensitive to extreme cold and frost.
        </p>
        <br /><br />
        <h3>Planting</h3>
        <h4>Land Preparation</h4>
        <p>
          The land should be deeply ploughed and well-leveled. Banana suckers are planted at a spacing of 2.5m x 2.5m for better growth and yield.
        </p>
        <h4>Irrigation</h4>
        <p>
          Regular irrigation is essential for banana cultivation. Irrigation is needed at intervals of 7-10 days depending on the season. Avoid water stagnation.
        </p>
        <h4>Harvesting</h4>
        <p>
          Banana is harvested after 12-14 months of planting. The fruit bunches are cut with a sharp knife and handled carefully to avoid bruising.
        </p>
      </div>
    </div>
  );
}

export default Banana;
