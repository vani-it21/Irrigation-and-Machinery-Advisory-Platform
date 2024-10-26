import React ,{useState,useEffect} from 'react'
import Select from 'react-select'
import { Link, redirect, useNavigate } from 'react-router-dom'

// const season=[{value:'summer',label:'Summer'},{value:'spring',label:'Spring'},{value:'winter',label:'Winter'},{value:'autumn',label:'Autumn'}];
// const month=[{value:'January',label:'January'},{value:'February',label:'February'},{value:'March',label:'March'},{value:'April',label:'April'},{value:'May',label:'May'},
//     {value:'June',label:'June'},{value:'July',label:'July'}, {value:'August',label:'August'},{value:'September',label:'September'},{value:'october',label:'october'},{value:'November',label:'November'},{value:'December',label:'December'}
// ]

//const Soil=[{value:'calcerous',label:'red calcerous soil(சிவப்பு மண்)'},{value:'non-calcerous',label:'red non-calcerous soil'},{value:'black',label:'black soil'},{value:'alluvial',label:'alluvial soil'},{value:'colluvial',label:'colluvial soil'},{value:'Forest',label:'Forest soil'},{value:'Brown',label:'Brown soil'}]

const Region=[{value:'erode',label:'Erode'},{value:'namakkal',label:'Namakkal'},{value:'salem',label:'Salem'}]
function Crop() {
const [Reg,setRegion]=useState(null);
const navigate=useNavigate();
const handleRegionChange=(event)=>{
            setRegion(event);
    };
  const redirect_page=(Region)=>{
    if(Region=='Erode'){
      navigate('/erode_crops');
    }else if(Region=='Namakkal'){

    }else if(Region=='Salem'){

    }
  }
const handleSubmit=(e)=>{
  e.preventDefault();
  redirect_page(`${Reg.label}`)
}

// const [ses,setSeason]=useState(null);
//  const [mon,setMonth]=useState(null);
//  const [Soils,setSoils]=useState(null);
//  const navigate=useNavigate();
// //  const value1=`${ses.label}`;
// //    const value3=`${Soils.label}`;
// //   const value2=`${mon.label}`;
//  const handleSeasonChange=(event)=>{
//          setSeason(event);
//  };
//  const handleMonthChange=(event)=>{
//   setMonth(event); 
//  };
//  const handleSoilsChange=(event)=>{
//     setSoils(event);
//  };
//   const redirect_page=(season,month,soil_type)=>{
//   if(season==="Winter"&&month==='January'&&soil_type==='red non-calcerous soil'){
//     navigate("/winter_redsoil");
//     //alert("welcome");
//   }
  
//   }
 
//  const handleSubmit=(e)=>{
//     e.preventDefault();
//     // const season=`${ses.label}`;
//     // const month=`${mon.label}`;
//     // const soil_type=`${Soils.label}`;
//     alert(`${ses.label},${mon.label},${Soils.label}`);

//    redirect_page(`${ses.label}`,`${mon.label}`,`${Soils.label}`);
//   //  if(season==="winter"&&month==='January'&&soil_type==='red non-calcerous soil'){
//   //   <WinterRed/>
//   //   }

  

  return ( 
    <div>
    <div>
      <form onSubmit={handleSubmit}>
             <h2><b>REGION</b></h2>
             <Select options={Region} name="Reg"value={Reg}onChange={handleRegionChange}/>

      
       {/* <h3>Season</h3>
            <Select options={season} name="ses"value={ses}onChange={handleSeasonChange}/>
            <h3>Month</h3>
            <Select options={month}name="mon" value={mon} onChange={handleMonthChange}/>
            <h3>Soil</h3>
            <Select options={Soil} name="Soils"value ={Soils}onChange={handleSoilsChange}/>
*/
        <button type='submit'>Submit</button> }
      </form>
      </div>
      <div>
        <button>
          Schedule
        </button>
      </div>
   </div>
  )
}
export default Crop
