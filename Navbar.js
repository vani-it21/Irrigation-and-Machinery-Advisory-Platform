import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
function Navbar() {
  return (
    <div className='nav'>
        <nav className='navbar'>
      <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/crop">Crop</Link>
                </li>
                <li>
                    <Link to="/schedule">Irrigation</Link>
                </li>
                <li>
                    <Link to="/machinery">Machinery</Link>
                </li>
            </ul> 
            </nav>
    </div>
  )
}

export default Navbar;