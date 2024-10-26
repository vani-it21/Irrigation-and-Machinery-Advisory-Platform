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

function Groundnut() {
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

    const planting_distance = 4000; // Adjusted for Groundnut
    const no_of_days = 120; // Groundnut crop duration
    const acre_in_meters = 4046.856; // 1 acre in m²
    const total_dist_plant_count = (Number(acr) * acre_in_meters) / planting_distance;
    const no_of_plants = total_dist_plant_count;

    // Ensure drip value is valid
    const dripValue = Number(drip) || 1;
    const init_stage = 4 / dripValue; // liters per acre for the initial stage
    const mid_stage = 6 / dripValue;
    const later_stage = 4 / dripValue;

    const currentDate = new Date(selectedDate);
    const futureDate = currentDate.toLocaleDateString();

    // Validate inputValue for days between irrigation
    let days_bwt = 7; // Typically for Groundnut
    if (Number(inputValue) > 0) {
      days_bwt = Number(inputValue);
    }

    const parts = Math.ceil(Number(acr) / 2.47);
    const farmerId = localStorage.getItem('farmer_id'); // Get farmer_id from localStorage
    const index = Object.keys(localStorage).filter(key => key.includes(farmerId)).length; // Increment index based on existing keys

    // Storing the schedule in localStorage with unique key
    const key = `Groundnut_${index}_${farmerId}`;
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
      veg_name: "Groundnut"
    }));

    alert("Groundnut schedule created successfully.");
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
        <h3>Groundnut Information</h3>
        <p>
          Groundnut (Arachis hypogaea) is an important oilseed crop cultivated primarily for its edible seeds, oil, and cake. It is a leguminous crop known for fixing nitrogen in the soil.
        </p>
        <h3>Soil & Climate</h3>
        <h4>Soil</h4>
        <p>
          Groundnut grows well in sandy loam and well-drained red soils with a pH range of 6.0-6.5. It is sensitive to waterlogging and prefers soils with good drainage.
        </p>
        <h4>Climate</h4>
        <p>
          Groundnut is a warm-season crop. It thrives best in temperatures between 25°C and 30°C with moderate rainfall. Prolonged moisture stress can reduce yields, while heavy rainfall can cause pod rot.
        </p>
        <br /><br />
        <h3>Planting</h3>
        <h4>Land Preparation</h4>
        <p>
          The land should be well-prepared with a fine tilth. Plough the field 3-4 times before sowing. Groundnut is usually sown directly in the field using a seed drill or by hand.
        </p>
        <h4>Spacing</h4>
        <p>
          For better yields, a spacing of 30 cm between rows and 10 cm between plants is recommended. Adequate spacing ensures proper plant growth and reduces competition for nutrients and water.
        </p>
        <h4>Method of Planting</h4>
        <p>
          Groundnut is typically sown at a depth of 5-6 cm. Ensure proper seed depth for good germination, and avoid sowing in too wet conditions to prevent seed rot.
        </p>
        <h4>Irrigation</h4>
        <p>
          Groundnut is sensitive to both excess water and drought. Light irrigation should be given at regular intervals of 10-12 days during the initial growth stages. During flowering and pod development, frequent light irrigation should be provided.
        </p>
        <h4>Manuring & Fertilization</h4>
        <p>
          For optimal yield, 20 tonnes of well-decomposed farmyard manure per hectare should be applied. Additionally, groundnut requires 20-25 kg of nitrogen, 40-60 kg of phosphorus, and 50-60 kg of potassium per hectare.
        </p>
        <h4>Harvesting</h4>
        <p>
          Groundnut matures in 100-120 days. The crop is ready for harvesting when the leaves turn yellow and the pods begin to mature. Harvesting is usually done by pulling the entire plant and then separating the pods.
        </p>
        <h4>Yield</h4>
        <p>
          On average, groundnut yields range between 15-25 quintals per hectare, depending on the variety and cultivation practices.
        </p>
      </div>
    </div>
  );
}

export default Groundnut;
