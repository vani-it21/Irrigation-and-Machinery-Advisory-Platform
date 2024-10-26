import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const[values, setValues]=useState({
        username: '',
        email_id:'',
        farmers_id:'',
        phone_no:'',
        aadhar_no:''
    });
    
    const navigate = useNavigate();
    const [errors,setErrors]= useState({});
    
    const handleInput=(event)=>{
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    };
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(Validation(values));
        
        if(errors.username==="" && errors.email_id==="" && errors.farmers_id==="" && errors.phone_no==="" && errors.aadhar_no===""){
            axios.post('http://localhost:8081/signup',values)
            .then(res=>{
                navigate('/');
            })
            .catch(err=>console.log(err));
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center signup-background vh-100'>
            <div className='bg-white p-3 rounded'>
                <h2><center>Sign-up</center></h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input type="text" placeholder='Enter username' name='username' onChange={handleInput} className='form-control rounded-0'/>
                        {errors.username && <span className='text-danger'>{errors.username}</span>}
                    </div>
                   
                    <div className='mb-3'>
                        <label htmlFor="email_id"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter email' name='email_id' onChange={handleInput} className='form-control rounded-0'/>
                        {errors.email_id && <span className='text-danger'>{errors.email_id}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="farmers_id"><strong>Farmer's ID</strong></label>
                        <input type="text" placeholder='Enter farmers_id' name='farmers_id' onChange={handleInput} className='form-control rounded-0'/>
                        {errors.farmers_id && <span className='text-danger'>{errors.farmers_id}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="phone_no"><strong>Phone Number</strong></label>
                        <input type="text" placeholder='Enter phone number' name='phone_no' onChange={handleInput} className='form-control rounded-0'/>
                        {errors.phone_no && <span className='text-danger'>{errors.phone_no}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="aadhar_no"><strong>Aadhar Number</strong></label>
                        <input type="text" placeholder='Enter Aadhar [Ex: xxxx xxxx xxxx]' name='aadhar_no' onChange={handleInput} className='form-control rounded-0'/>
                        {errors.aadhar_no && <span className='text-danger'>{errors.aadhar_no}</span>}
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>  
                    <p>You agree to our terms and policies</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
