import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {urlConfig} from '../../config';
import './RegisterPage.css';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const sendRegisterMessage = () => {
        setIsSuccess(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });
            const json = await response.json();
            console.log('json data', json);
        } catch (err) {
            console.log('error', err);
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <form className='register-card p-4 border rounded' onSubmit={handleRegister}>
                        <h2 className='text-center mb-4 font-weight-bold'>Register</h2>
                        {isSuccess && (
                            <div className='alert alert-success mt-3' role='alert'>
                            Registration Successful! &nbsp;
                            <Link to='/app/login'>Login</Link>&nbsp;to view more gifts...
                            </div>
                        )}
                        <div className='mb-4'>
                            <label className='form-label' htmlFor='firstName'>First Name</label>
                            <input 
                                type='text'
                                id='firstName'
                                className='form-control input' 
                                placeholder='Enter your First Name'
                                name='firstName' 
                                value={firstName}
                                onChange= {(e)=> {setFirstName(e.target.value)}}/>   
                        </div>
                        <div className='mb-4'>
                            <label className='form-label' htmlFor='lastName'>Last Name</label>
                            <input 
                                type='text'
                                id='lastName'
                                className='form-control input' 
                                placeholder='Enter your Last Name'
                                name='lastName' 
                                value={lastName}
                                onChange= {(e)=> {setLastName(e.target.value)}}/>  
                        </div>
                        <div className='mb-4'>
                            <label className='form-label' htmlFor='email'>Email</label>
                            <input 
                                type='email'
                                id='email'
                                className='form-control input' 
                                placeholder='Enter your email'
                                name='email' 
                                value={email}
                                onChange= {(e)=> {setEmail(e.target.value)}}/>
                        </div>
                        <div className='mb-4'>
                            <label className='form-label' htmlFor='password'>Password</label>
                            <input 
                                type='password'
                                id='password'
                                className='form-control input' 
                                placeholder='Enter your password'
                                name='password' 
                                value={password}
                                onChange= {(e)=> {setPassword(e.target.value)}}/>
                        </div>
                        
                        <button type='submit' className='btn btn-primary' onClick={sendRegisterMessage}>Register</button>
                        <p className='mt-4 text-center'>
                            Already a member? &nbsp;
                            <Link to='/app/login' className='text-primary'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;