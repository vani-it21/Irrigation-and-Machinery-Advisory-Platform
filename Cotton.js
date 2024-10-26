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

function Cotton() {
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

    const planting_distance = 10000; // Adjusted for cotton
    const no_of_days = 180; // Cotton typically takes 5-6 months to mature
    const acre_in_meters = 4046.856; // 1 acre in m²
    const total_dist_plant_count = (Number(acr) * acre_in_meters) / planting_distance;
    const no_of_plants = total_dist_plant_count;

    const dripValue = Number(drip) || 1; 
    const init_stage = 4 / dripValue; // Adjusted for cotton
    const mid_stage = 5 / dripValue;
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

    const key = `Cotton_${index}_${farmerId}`;
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
      veg_name: "Cotton"
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
        <h3>Cotton Information</h3>
        <p>
          Cotton is one of the most important cash crops, widely grown in tropical and subtropical regions. The plant belongs to the Malvaceae family and produces soft, fluffy fibers around its seeds, which are harvested to produce cotton fibers used in textiles.
        </p>
        <h3>Soil & Climate</h3>
        <h4>Soil</h4>
        <p>
          Cotton is grown on a wide variety of soils, but deep, well-drained, fertile loam soils are ideal. It prefers soils with good water-holding capacity and a pH range of 6.0-7.5.
        </p>
        <h4>Climate</h4>
        <p>
          Cotton requires a long frost-free period, plenty of sunshine, and moderate rainfall. It thrives in temperatures between 25°C and 35°C. Higher temperatures during flowering and fruiting adversely affect production.
        </p>
        <br /><br />
        <h3>Planting</h3>
        <h4>Land Preparation</h4>
        <p>
          The field is ploughed and harrowed to achieve a fine tilth. Organic manure is applied during land preparation to enhance soil fertility.
        </p>
        <h4>Spacing</h4>
        <p>
          Cotton is planted with a spacing of 75-90 cm between rows and 30-45 cm between plants, depending on soil fertility and plant variety.
        </p>
        <h4>Method of Planting</h4>
        <p>
          Cotton seeds are sown directly in well-prepared fields during the onset of the monsoon or when soil moisture is adequate. A light irrigation is provided after sowing.
        </p>
        <h4>Irrigation</h4>
        <p>
          Cotton is a drought-tolerant crop but requires timely irrigation, especially during critical growth stages like flowering and boll formation. Irrigation should be provided at intervals of 7-12 days depending on the season and soil moisture levels.
        </p>
        <h4>Manuring & Fertilization</h4>
        <p>
          Cotton responds well to organic manure and chemical fertilizers. A recommended dose of 120-150 kg N, 60-80 kg P₂O₅, and 60-80 kg K₂O per hectare is generally applied. Half of the nitrogen dose is applied at the time of planting, and the rest as a top-dressing during the crop cycle.
        </p>
        <h4>Harvesting</h4>
        <p>
          Cotton is harvested when the bolls burst open, revealing the fluffy white fibers. Multiple pickings are done over a period, with intervals of around 15-20 days between each picking.
        </p>
        <h4>Yield</h4>
        <p>
          The yield of cotton varies from 15 to 25 quintals per hectare, depending on the variety and management practices.
        </p>
      </div>
    </div>
  );
}

export default Cotton;
