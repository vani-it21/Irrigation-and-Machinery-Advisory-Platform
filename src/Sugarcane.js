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

function Sugarcane() {
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

    const planting_distance = 6000; // Adjusted for sugarcane
    const no_of_days = 365; // Typically sugarcane takes around a year to mature
    const acre_in_meters = 4046.856; // 1 acre in m²
    const total_dist_plant_count = (Number(acr) * acre_in_meters) / planting_distance;
    const no_of_plants = total_dist_plant_count;

    const dripValue = Number(drip) || 1; 
    const init_stage = 3 / dripValue; // Adjusted for sugarcane
    const mid_stage = 4 / dripValue;
    const later_stage = 3 / dripValue;

    const currentDate = new Date(selectedDate);
    const futureDate = currentDate.toLocaleDateString();

    let days_bwt = 3;
    if (Number(inputValue) > 0) {
      days_bwt = Number(inputValue);
    }

    const parts = Math.ceil(Number(acr) / 2.47);
    const farmerId = localStorage.getItem('farmer_id'); 
    const index = Object.keys(localStorage).filter(key => key.includes(farmerId)).length; 

    const key = `Sugarcane_${index}_${farmerId}`;
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
      veg_name: "Sugarcane"
    }));
    
    alert("Schedule created successfully.");
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
        <h3>Sugarcane Information</h3>
        <p>
          Sugarcane is a tropical, perennial grass that forms lateral shoots at the base to produce multiple stems. The stems grow into cane stalk, which when mature, constitutes around 75% of the entire plant. 
        </p>
        <h3>Soil & Climate</h3>
        <h4>Soil</h4>
        <p>
          Sugarcane can be grown on a wide range of soils, from sandy loams to clay loams. Well-drained soils with high fertility are best for optimal growth. The pH range suitable for sugarcane is between 5 and 8.5.
        </p>
        <h4>Climate</h4>
        <p>
          Sugarcane thrives in tropical and subtropical climates with temperatures between 20°C to 30°C. It requires abundant sunlight, and rainfall between 1500 to 2500 mm annually is optimal.
        </p>
        <br /><br />
        <h3>Planting</h3>
        <h4>Land Preparation</h4>
        <p>
          The field is prepared by deep ploughing followed by levelling. Furrows are opened at 90 cm spacing for planting sugarcane setts. Organic manure is mixed into the soil to enrich it.
        </p>
        <h4>Spacing</h4>
        <p>
          Generally, sugarcane setts are planted at a spacing of 90 cm to 120 cm between rows, depending on the variety and soil conditions.
        </p>
        <h4>Method of Planting</h4>
        <p>
          The two-bud setts of sugarcane are planted in furrows during spring and early summer. Light irrigation is given immediately after planting.
        </p>
        <h4>Irrigation</h4>
        <p>
          Sugarcane requires frequent irrigation, particularly during germination and tillering stages. Light irrigation is preferred, and intervals of 7-10 days are recommended, depending on soil and weather conditions.
        </p>
        <h4>Manuring & Fertilization</h4>
        <p>
          Sugarcane responds well to nitrogen-rich fertilizers. Typically, 150-200 kg of nitrogen per hectare is applied in stages, alongside phosphorus and potassium to ensure optimal growth and yield.
        </p>
        <h4>Harvesting</h4>
        <p>
          Sugarcane is ready for harvest when it is around 12-16 months old. The cane is cut close to the ground to ensure that the sugar-rich base is harvested. 
        </p>
        <h4>Yield</h4>
        <p>
          The average yield of sugarcane varies from 80 to 100 tonnes per hectare, depending on the variety and management practices.
        </p>
      </div>
    </div>
  );
}

export default Sugarcane;
