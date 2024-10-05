import React, {useState} from 'react';
import './RegisterPage.css';
import {Link} from 'react-router-dom';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Registered successfully!')
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6 col-lg-4'>
                    <form className='register-card p-4 border rounded' onSubmit={handleRegister}>
                        <h2 className='text-center mb-4 font-weight-bold'>Register</h2>
                        <div className='mb-4'>
                            <label className='form-label'>First Name</label>
                            <input 
                                type='text'
                                className='form-control input' 
                                placeholder='Enter your First Name'
                                name='firstName' 
                                value={firstName}
                                onChange= {(e)=> {setFirstName(e.target.value)}}/>   
                        </div>
                        <div className='mb-4'>
                            <label className='form-label'>Last Name</label>
                            <input 
                                type='text'
                                className='form-control input' 
                                placeholder='Enter your Last Name'
                                name='lastName' 
                                value={lastName}
                                onChange= {(e)=> {setLastName(e.target.value)}}/>  
                        </div>
                        <div className='mb-4'>
                            <label className='form-label'>Email</label>
                            <input 
                                type='email'
                                className='form-control input' 
                                placeholder='Enter your email'
                                name='email' 
                                value={email}
                                onChange= {(e)=> {setEmail(e.target.value)}}/>
                        </div>
                        <div className='mb-4'>
                            <label className='form-label'>Password</label>
                            <input 
                                type='password'
                                className='form-control input' 
                                placeholder='Enter your password'
                                name='password' 
                                value={password}
                                onChange= {(e)=> {setPassword(e.target.value)}}/>
                        </div>
                        
                        <button type='submit' className='btn btn-primary'>Register</button>
                        <p className='mt-4 text-center'>
                            Already a member?
                            <Link to='/app/login' className='text-primary'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;