import React, {useState} from 'react';
import './RegisterPage.css';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        console.log('Registered successfully!')

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6 col-lg-4'>
                    <div className='register-card p-4 border rounded'>
                        <h2 className='text-center mb-4 font-weight-bold'>Register</h2>
                        <div className='mb-4'>
                            <label className='form-label'>firstName</label>
                            <input 
                                type='text'
                                className='input' 
                                placeholder='Enter your firstName'
                                name='firstName' 
                                value={firstName}
                                onChange= {(e)=> {setFirstName(e.target.value)}}/>   
                        </div>
                        <div className='mb-4'>
                            <label className='form-label'>lastName</label>
                            <input 
                                type='text'
                                className='input' 
                                placeholder='Enter your lastName'
                                name='lastName' 
                                value={lastName}
                                onChange= {(e)=> {setLastName(e.target.value)}}/>  
                        </div>
                        <div className='mb-4'>
                            <label className='form-label'>email</label>
                            <input 
                                type='email'
                                className='input' 
                                placeholder='Enter your email'
                                name='email' 
                                value={email}
                                onChange= {(e)=> {setEmail(e.target.value)}}/>
                        </div>
                        <div className='mb-4'>
                            <label className='form-label'>password</label>
                            <input 
                                type='password'
                                className='input' 
                                placeholder='Enter your password'
                                name='password' 
                                value={password}
                                onChange= {(e)=> {setPassword(e.target.value)}}/>
                        </div>
                        
                        <button className='btn btn-primary' onClick={handleRegister}>Register</button>
                        <p className='mt-4 text-center'>
                            Already a member?
                            <a href='/login' className='text-primary'>Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default RegisterPage;