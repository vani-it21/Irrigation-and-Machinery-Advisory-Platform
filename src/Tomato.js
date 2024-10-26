
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

function Tomato() {
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

    const planting_distance = 4500;
    const no_of_days = 80;
    const acre_in_meters = 4046.856; // 1 acre in m²
    const total_dist_plant_count = (Number(acr) * acre_in_meters) / planting_distance;
    const no_of_plants = total_dist_plant_count;

    // Ensure drip value is valid
    const dripValue = Number(drip) || 1; 
    const init_stage = 2 / dripValue; // liters for the acre
    const mid_stage = 3 / dripValue;
    const later_stage = 2 / dripValue;

    const currentDate = new Date(selectedDate);
    const futureDate = currentDate.toLocaleDateString();

    // Validate inputValue for days between irrigation
    let days_bwt = 2;
    if (Number(inputValue) > 0) {
      days_bwt = Number(inputValue);
    }

    const parts = Math.ceil(Number(acr) / 2.47);
    const farmerId = localStorage.getItem('farmer_id'); // Get farmer_id from localStorage
    const index = Object.keys(localStorage).filter(key => key.includes(farmerId)).length; // Increment index based on existing keys

    // Storing the schedule in localStorage with unique key
    const key = `Tomato_${index}_${farmerId}`;
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
      veg_name: "Tomato"
    }));
alert("check further in irrigation and machinery");
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
        <h3>Tomato Information</h3>
        <p>
          Tomato is botanically known as Lycopersicum esculentum and belongs to the family Solanaceae. It is an important commercial vegetable crop of India and is a herbaceous sprawling plant growing to 1-3 m in height with a weak woody stem.
        </p>
        <h3>Soil & Climate</h3>
        <h4>Soil</h4>
        <p>
          Tomato can be grown on a wide range of soils from sandy to heavy clay. However, well-drained, sandy or red loam soils rich in organic matter with a pH range of 6.0-7.0 are considered ideal.
        </p>
        <h4>Climate</h4>
        <p>
          Tomato is a warm-season crop. The best fruit color and quality is obtained at a temperature range of 21-24°C. Temperatures above 32°C adversely affect the fruit set and development. The plants cannot withstand frost and high humidity. It requires low to medium rainfall. Bright sunshine at the time of fruit set helps to develop dark red colored fruits. Temperature below 10°C adversely affects plant tissues thereby slowing down physiological activities.
        </p>
        <br/><br/>
<h3>Planting</h3>
<h4>Land Preparation</h4>

The field is ploughed to fine tilth by giving four to five ploughing with a sufficient interval between two ploughing. Planking should be done for proper levelling. Furrows are then opened at the recommended spacing. Well-decomposed FYM (25 t/ha) is thoroughly incorporated at the time of land preparation.
<br/><br/>
<h4>Spacing</h4>

Spacing depends upon the type of variety grown and the season of planting. Normally the seedlings are transplanted at a spacing of 75-90 x 45-60 cm.
<br/><br/>

<h4>Method of Planting</h4>

Seedlings are transplanted in furrows in light soils and on side of the ridges in case of heavy soils. A pre-soaking irrigation is given 3-4 days prior to transplanting. Before planting seedlings should be dipped in a solution prepared by Nuvacron (15ml) and Dithane M - 45 (25g) in 10 litres of water for 5-6 minutes. Transplanting should preferably be done in the evening.
<br/><br/>
<h4>Irrigation</h4>

Tomato is very sensitive to water application. Heavy irrigation provided after a long spell of drought causes cracking of the fruits. Hence it should be avoided. Light irrigation should be given 3-4 days after transplanting. Irrigation intervals should be according to soil type and rainfall, irrigation should be given 7-8 days interval during kharif, during rabi 10-12 days and 5-6 days during summer.
Flowering and fruit development are the critical stages of tomato therefore; water stress should not be given during this period.
<br/><br/>
<h4>Manuring & Fertilization</h4>

The fertilizer dose depends upon the fertility of soil and amount of organic manure applied to the crop. For a good yield, 15-20 tonnes of well-decomposed FYM is incorporated into the soil. Generally, application of 120 kg N, 80 kg P2O5 and 50 kg K2O per hectare is recommended for getting optimum yield. Half dose of N and full dose of P and K is given at the time of planting. The balance half of N is given as top dressing 30 days after transplanting.
<br/><br/>
<b>For hybrid varieties, the recommended dose per hectare is 180 kg N, 100 kg P2 O5 and 60 kg K2 O. 60 kg N and half of P & K are given at the time of transplanting. Remaining quantities of P & K and 60 kg N is top dressed 30 after transplanting. A third dose of 60 kg N is applied 50 days after transplanting.

harvesting:</b>

Fruits are normally harvested early in the morning or evening. The fruits are harvested by twisting motion of hand to separate fruits from the stem. Harvested fruits should be kept only in basket or crates and keep it in shade. Since all the fruits do not mature at the same time, they are harvested at an interval of 4 days. Generally there will be 7-11 harvests in a crop life span.
<br/>
<br/>
<h4>Yield</h4>
The yield per hectare varies greatly according to variety and season. On an average, the yield varies from 20-25 t/ha. Hybrid varieties may yield upto 50-60 t/ha.

      </div>
    </div>
  );
}

export default Tomato;
