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

function Cholam() {
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

    const planting_distance = 5000; // Adjusted for Cholam (Sorghum)
    const no_of_days = 110; // Cholam crop duration
    const acre_in_meters = 4046.856; // 1 acre in m²
    const total_dist_plant_count = (Number(acr) * acre_in_meters) / planting_distance;
    const no_of_plants = total_dist_plant_count;

    // Ensure drip value is valid
    const dripValue = Number(drip) || 1;
    const init_stage = 5 / dripValue; // liters per acre for the initial stage
    const mid_stage = 6 / dripValue;
    const later_stage = 4 / dripValue;

    const currentDate = new Date(selectedDate);
    const futureDate = currentDate.toLocaleDateString();

    // Validate inputValue for days between irrigation
    let days_bwt = 7; // Typically for Cholam
    if (Number(inputValue) > 0) {
      days_bwt = Number(inputValue);
    }

    const parts = Math.ceil(Number(acr) / 2.47);
    const farmerId = localStorage.getItem('farmer_id'); // Get farmer_id from localStorage
    const index = Object.keys(localStorage).filter(key => key.includes(farmerId)).length; // Increment index based on existing keys

    // Storing the schedule in localStorage with unique key
    const key = `Cholam_${index}_${farmerId}`;
    localStorage.setItem(key, JSON.stringify({
      days: no_of_days,
      i_w: init_stage,
      m_w: mid_stage,
      l_w: later_stage,
      date: futureDate,
      quantity: acr,
      parts_count: parts,
      currentDays: 0,
      timeinHrs: 2,
      days_btw: days_bwt,
      veg_name: "Cholam"
    }));

    alert("Cholam schedule created successfully.");
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
        <h3>Cholam Information</h3>
        <p>
          Cholam, also known as Sorghum, is a versatile cereal crop grown for food, fodder, and industrial purposes. It is widely grown in semi-arid and tropical regions due to its high drought tolerance.
        </p>
        <h3>Soil & Climate</h3>
        <h4>Soil</h4>
        <p>
          Sorghum thrives in well-drained loamy and sandy soils with good moisture retention. It can also tolerate a wide range of soils, including saline and alkaline conditions. The ideal pH range is between 5.5 and 8.0.
        </p>
        <h4>Climate</h4>
        <p>
          Sorghum is a warm-season crop, requiring temperatures between 25°C and 35°C for optimal growth. It is drought-resistant and can survive in low rainfall areas but prefers moderate rainfall between 45-65 cm.
        </p>
        <br /><br />
        <h3>Planting</h3>
        <h4>Land Preparation</h4>
        <p>
          Plough the land thoroughly and remove weeds before planting. Incorporate organic manure or compost to improve soil fertility. Harrowing can be done after ploughing to level the soil surface.
        </p>
        <h4>Spacing</h4>
        <p>
          Plant Cholam seeds with a spacing of 45 cm between rows and 15 cm between plants. Proper spacing helps reduce competition for light, water, and nutrients.
        </p>
        <h4>Method of Planting</h4>
        <p>
          Sorghum can be planted directly in the field through broadcasting or seed drilling at a depth of 3-5 cm. Use certified seeds to ensure good germination and better yields.
        </p>
        <h4>Irrigation</h4>
        <p>
          Sorghum requires light irrigation at regular intervals, especially during the initial growth stage, flowering, and grain filling stages. Irrigate every 7-10 days during dry spells to maintain soil moisture.
        </p>
        <h4>Manuring & Fertilization</h4>
        <p>
          Apply 10-15 tonnes of well-decomposed farmyard manure per hectare. Additionally, apply 60 kg of nitrogen, 40 kg of phosphorus, and 20 kg of potassium per hectare. Split nitrogen application is recommended for better growth.
        </p>
        <h4>Harvesting</h4>
        <p>
          Sorghum is ready for harvesting 100-110 days after planting. Harvesting is done when the grains are hard and the plant turns dry. Cut the plants at the base, allow them to dry, and then thresh the grains.
        </p>
        <h4>Yield</h4>
        <p>
          Under good management practices, sorghum can yield around 20-30 quintals per hectare.
        </p>
      </div>
    </div>
  );
}

export default Cholam;
