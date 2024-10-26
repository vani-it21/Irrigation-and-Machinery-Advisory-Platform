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

function Maize() {
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

    const planting_distance = 8000; // Adjusted for Maize
    const no_of_days = 150; // Maize crop duration
    const acre_in_meters = 4046.856; // 1 acre in m²
    const total_dist_plant_count = (Number(acr) * acre_in_meters) / planting_distance;
    const no_of_plants = total_dist_plant_count;

    // Ensure drip value is valid
    const dripValue = Number(drip) || 1;
    const init_stage = 6 / dripValue; // liters per acre for the initial stage
    const mid_stage = 8 / dripValue;
    const later_stage = 4 / dripValue;

    const currentDate = new Date(selectedDate);
    const futureDate = currentDate.toLocaleDateString();

    // Validate inputValue for days between irrigation
    let days_bwt = 7; // Typically for Maize
    if (Number(inputValue) > 0) {
      days_bwt = Number(inputValue);
    }

    const parts = Math.ceil(Number(acr) / 2.47);
    const farmerId = localStorage.getItem('farmer_id'); // Get farmer_id from localStorage
    const index = Object.keys(localStorage).filter(key => key.includes(farmerId)).length; // Increment index based on existing keys

    // Storing the schedule in localStorage with unique key
    const key = `Maize_${index}_${farmerId}`;
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
      veg_name: "Maize"
    }));

    alert("Maize schedule created successfully.");
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
        <h3>Maize Information</h3>
        <p>
          Maize (Zea mays), also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico. It is a staple food and a key feed crop across the globe.
        </p>
        <h3>Soil & Climate</h3>
        <h4>Soil</h4>
        <p>
          Maize grows best in well-drained, fertile loamy soil. It thrives in soils with good organic matter content and a pH range of 5.5-7.5. Heavy clay soils are not suitable for maize cultivation.
        </p>
        <h4>Climate</h4>
        <p>
          Maize is a warm-weather crop. It requires temperatures between 20°C and 30°C for optimal growth. It grows best in areas that receive 50-90 cm of rainfall annually. However, irrigation can be used to supplement moisture during dry spells.
        </p>
        <br /><br />
        <h3>Planting</h3>
        <h4>Land Preparation</h4>
        <p>
          The land should be ploughed thoroughly to prepare it for planting. Deep ploughing followed by harrowing is usually practiced. Add organic manure to enrich the soil before planting.
        </p>
        <h4>Spacing</h4>
        <p>
          Maize is usually planted with 60-75 cm between rows and 20-25 cm between plants, depending on the variety. Proper spacing ensures better sunlight penetration and reduces competition for nutrients.
        </p>
        <h4>Method of Planting</h4>
        <p>
          Maize seeds are usually sown at a depth of 4-6 cm. Sowing can be done manually or by using seed drills. Ensure proper seed depth for uniform germination.
        </p>
        <h4>Irrigation</h4>
        <p>
          Maize requires irrigation at critical stages of growth such as knee-high, tasseling, and grain filling stages. Regular irrigation at intervals of 7-10 days during dry spells is necessary for better yields.
        </p>
        <h4>Manuring & Fertilization</h4>
        <p>
          Maize requires a balanced fertilizer application for optimal growth. Apply 120 kg of nitrogen, 60 kg of phosphorus, and 40 kg of potassium per hectare. Farmyard manure (FYM) can be added at the time of field preparation.
        </p>
        <h4>Harvesting</h4>
        <p>
          Maize is usually harvested when the grains have reached physiological maturity, typically around 120-150 days after planting. The plants will turn yellow, and the grains will harden.
        </p>
        <h4>Yield</h4>
        <p>
          On average, maize yields range from 30-50 quintals per hectare under favorable conditions and proper cultivation practices.
        </p>
      </div>
    </div>
  );
}

export default Maize;
