import React from 'react'
import Login from './Login'
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import Signup from './Signup'
import About from './About'
import Crop from './Crop'
import Erode_crop from './Erode_crop'
import Tomato from './Tomato'
import CheckSchedule from './CheckSchedule'
import Potato from './Potato'
import Machinery from './Machinery'
import Sugarcane from './Sugarcane'
import Cotton from './Cotton'
import Ragi from './Ragi'
import Groundnut from './Groundnut'
import Cholam from './Cholam'
import Maize from './Maize'
import Banana from './Banana'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/about' element={<About/>}></Route>
<Route path='/Crop' element={<Crop/>}></Route>
<Route path='/schedule' element={<CheckSchedule/>}></Route> 
<Route path='/erode_crops' element={<Erode_crop/>}> </Route>

 <Route path='/Tomato' element={<Tomato/>}></Route>
<Route path='/Potato' element={<Potato/>}></Route>
<Route path='/Sugarcane' element={<Sugarcane/>}></Route>  
<Route path='/Cotton' element={<Cotton/>}></Route> 
<Route path='/Ragi' element={<Ragi/>}></Route>  
<Route path='/Banana' element={<Banana/>}></Route> 
<Route path='/Maize' element={<Maize/>}></Route> 
<Route path='/Cholam' element={<Cholam/>}></Route> 
<Route path='/Groundnut' element={<Groundnut/>}></Route> 
<Route path='/machinery' element={<Machinery/>}></Route> 
    </Routes>
    
    </BrowserRouter>
    )
}

export default App