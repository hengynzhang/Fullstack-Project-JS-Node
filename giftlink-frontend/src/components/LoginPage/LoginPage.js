import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './LoginPage.css';

function LoginPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {setIsLoggedIn} = useAppContext();
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');

    useEffect (() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': bearerToken ? `Bearer ${bearerToken}` : ''
                },
                body: JSON.stringify({
                    email, 
                    password
                })
            })
            const json = await response.json();
            console.log(json);
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);
                setIsLoggedIn(true);
                navigate('/app');
            } else {
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                setErrorMessage('Invalid credential. Try again.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
            }
        } catch (err) {
            console.error('err', err);
        }
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
                            
                            <span
                                style={{
                                    color: 'red',
                                    height: '0.5rem',
                                    display: 'bolck',
                                    fontStyle: 'italic',
                                    fontSize: '12px'}}>
                                {errorMessage}
                            </span>
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