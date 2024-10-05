import React, {useState} from 'react';
import './LoginPage.css';
import {Link} from 'react-router-dom';

function LoginPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login successfully!')
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6 col-lg-4'>
                    <form className='login-card p-4 border rounder' onSubmit={handleLogin}>
                        <h2 className='text-cneter mb-4 font-weight-bold'>Login</h2>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='email'>Email</label>
                            <input 
                                type='email'
                                id='email'
                                namae='email'
                                value={email}
                                placeholder='Enter your email'
                                onChange={(e) => setEmail(e.target.value)}
                                className='form-control input'/>
                        </div>
                        <div>
                            <label className='form-label' htmlFor='password'>Password</label>
                            <input 
                                type='password'
                                id='password'
                                name='password'
                                value={password}
                                placeholder='Enter your password'
                                onChange={(e) => setPassword(e.target.value)}
                                className='form-control input'/>
                        </div>
                        <button type='submit' className='btn btn-primary'>Login</button>
                        <p className='mt-4 text-center'>New here? &nbsp;
                            <Link href='/app/register' className='text-primary'>Register Here</Link>
                        </p>
                    </form>
                </div>
                
            </div>
            
        </div>
    )
}

export default LoginPage;