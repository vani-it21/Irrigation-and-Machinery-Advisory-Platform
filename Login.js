import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({
    email_id: '',
    farmers_id: '',
    phone_no: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));

    if (errors.farmers_id === '' && errors.phone_no === '' && errors.email_id === '') {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data === "Success") {
            localStorage.setItem('email_id', values.email_id);
            localStorage.setItem('farmer_id', values.farmers_id);
            navigate('/about');
          } else {
            alert("No record existed");
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='login-container d-flex flex-column align-items-center vh-100'>
      {/* Title with image */}
      <div className='title-box'>
        <h1>
          
          <b>IRRIGATION AND MACHINERY ADVISORY PLATFORM</b>
        </h1>
      </div>
      
      {/* Login form below the title */}
      <div className='login-box'>
        <div className='login-form'>
          <h2>Sign-in</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="email_id"><strong>Email</strong></label>
              <input
                type="email"
                placeholder='Enter email'
                name='email_id'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.email_id && <span className='text-danger'>{errors.email_id}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor="farmers_id"><b>Farmer's ID</b></label>
              <input
                type="text"
                placeholder='Enter farmers_id'
                name='farmers_id'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.farmers_id && <span className='text-danger'>{errors.farmers_id}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor="phone_no"><b>Phone Number</b></label>
              <input
                type="text"
                placeholder='Enter phone number'
                name='phone_no'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.phone_no && <span className='text-danger'>{errors.phone_no}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
            <p>You agree to our terms and policies</p>
            <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
