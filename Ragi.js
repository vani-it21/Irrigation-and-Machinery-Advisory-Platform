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

function Ragi() {
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

    const planting_distance = 10000; // Adjusted for Ragi
    const no_of_days = 100; // Ragi crop duration
    const acre_in_meters = 4046.856; // 1 acre in m²
    const total_dist_plant_count = (Number(acr) * acre_in_meters) / planting_distance;
    const no_of_plants = total_dist_plant_count;

    // Ensure drip value is valid
    const dripValue = Number(drip) || 1; 
    const init_stage = 3 / dripValue; // liters per acre
    const mid_stage = 4 / dripValue;
    const later_stage = 2 / dripValue;

    const currentDate = new Date(selectedDate);
    const futureDate = currentDate.toLocaleDateString();

    // Validate inputValue for days between irrigation
    let days_bwt = 5; // Typically for Ragi
    if (Number(inputValue) > 0) {
      days_bwt = Number(inputValue);
    }

    const parts = Math.ceil(Number(acr) / 2.47);
    const farmerId = localStorage.getItem('farmer_id'); // Get farmer_id from localStorage
    const index = Object.keys(localStorage).filter(key => key.includes(farmerId)).length; // Increment index based on existing keys

    // Storing the schedule in localStorage with unique key
    const key = `Ragi_${index}_${farmerId}`;
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
      veg_name: "Ragi"
    }));

    alert("Ragi schedule created successfully.");
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
        <h3>Ragi Information</h3>
        <p>
          Ragi (Finger millet) is a major cereal crop grown in dry and semi-arid regions. It is a nutrient-rich grain, widely known for its resistance to drought.
        </p>
        <h3>Soil & Climate</h3>
        <h4>Soil</h4>
        <p>
          Ragi is grown in a variety of soils, including red, loamy, and sandy soils. However, it prefers well-drained soil with good organic matter content. The ideal soil pH for ragi is between 5.0 and 8.0.
        </p>
        <h4>Climate</h4>
        <p>
          Ragi thrives in dry regions with a warm climate. It is highly drought-resistant and can grow in areas with rainfall ranging between 400 to 450mm. The ideal temperature for ragi is between 25°C and 30°C.
        </p>
        <br /><br />
        <h3>Planting</h3>
        <h4>Land Preparation</h4>
        <p>
          The land should be ploughed and leveled to create a fine tilth. Ragi is usually sown using broadcast or drilling methods. For better yields, organic manure can be applied during land preparation.
        </p>
        <h4>Spacing</h4>
        <p>
          Ragi is typically spaced 30 cm between rows and 10 cm between plants. This allows enough space for the plants to grow and access nutrients.
        </p>
        <h4>Method of Planting</h4>
        <p>
          Seeds are sown at a shallow depth and should be covered with soil lightly. Ragi can also be transplanted if grown in nurseries before final field planting.
        </p>
        <h4>Irrigation</h4>
        <p>
          Ragi is drought-resistant, but during critical growth stages (flowering and grain filling), irrigation is necessary. Light irrigation is provided every 7-10 days based on the soil moisture content.
        </p>
        <h4>Manuring & Fertilization</h4>
        <p>
          For optimal yield, 40-60 kg of nitrogen, 30 kg of phosphorus, and 30 kg of potassium per hectare are recommended. Organic manure like FYM (Farm Yard Manure) can also be used.
        </p>
        <h4>Harvesting</h4>
        <p>
          Ragi matures in about 100-120 days. The crop is harvested when the grains are hard and firm. Post-harvesting, the crop is dried under sunlight, and the grains are separated using threshing methods.
        </p>
        <h4>Yield</h4>
        <p>
          The average yield of ragi ranges from 15-20 quintals per hectare depending on the variety, climate, and farming practices.
        </p>
      </div>
    </div>
  );
}

export default Ragi;
