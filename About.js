import React from 'react';
import './About.css';
import Navbar from './Navbar';

function About() {
  return (
    <div>
      <div className='div1'>
        <div className='im-logo'>
          <img src="https://www.turkishagrinews.com/wp-content/uploads/2023/07/Gecici-5.jpg" alt="Logo" />
        </div>

        <div className='div2'>
          <div className='nav'>
            <Navbar />
          </div>
        

        {/* Table of Pesticides and Weedicides */}
        <div className='table-container'>
          <h2><b><center><i>About Pesticides and Weedicides</i></center></b></h2>
          <table className='pesticide-weedicide-table'>
            <thead>
              <tr>
                <th><i>Type</i></th>
                <th><i>Name</i></th>
                <th><i>Description</i></th>
                <th><i>Usages</i></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pesticide</td>
                <td>Chlorpyrifos</td>
                <td>A broad-spectrum organophosphate insecticide used to control soil-borne insect pests.</td>
                <td>Effective against various pests in fruits and vegetables.</td>
              </tr>
              <tr>
                <td>Pesticide</td>
                <td>Imidacloprid</td>
                <td>A neonicotinoid used to control sucking insects like aphids, thrips, and whiteflies.</td>
                <td>Commonly used in row crops, ornamentals, and turf.</td>
              </tr>
              <tr>
                <td>Pesticide</td>
                <td>Fipronil</td>
                <td>A broad-spectrum insecticide used to target ants, termites, and other pests.</td>
                <td>Often used in home and garden pest control.</td>
              </tr>
              <tr>
                <td>Pesticide</td>
                <td>Carbaryl</td>
                <td>A carbamate insecticide used to control a wide range of pests in fruits, vegetables, and cereals.</td>
                <td>Suitable for use on a variety of crops and in gardens.</td>
              </tr>
              <tr>
                <td>Weedicide</td>
                <td>Glyphosate</td>
                <td>A systemic broad-spectrum herbicide used to kill weeds, especially perennials.</td>
                <td>Widely used in agricultural practices and home gardening.</td>
              </tr>
              <tr>
                <td>Weedicide</td>
                <td>Paraquat</td>
                <td>A fast-acting herbicide used for the control of broad-leaf weeds and grasses.</td>
                <td>Commonly used in cotton and soybean crops.</td>
              </tr>
              <tr>
                <td>Weedicide</td>
                <td>Atrazine</td>
                <td>A pre- and post-emergence herbicide effective against many grass and broadleaf weeds.</td>
                <td>Mainly used in corn and sorghum production.</td>
              </tr>
              <tr>
                <td>Weedicide</td>
                <td>Pendimethalin</td>
                <td>A pre-emergence herbicide used for controlling annual grasses and certain broadleaf weeds.</td>
                <td>Effective in various crops, including vegetables and flowers.</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default About;
