import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                username: username,
                password: password,
            });
            console.log('Pendaftaran berhasil:', response.data);
            navigate('/login');
            window.location.reload();
        } catch (error) {
            console.error('Gagal mendaftar:', error);
        }
    };

    return (

        <div className='container'>
            <h2 className='mt-5'>Form Pendaftaran</h2>
                <div className='form-group'>
                    <label>Username:</label>
                    <input className='form-control' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input className='form-control' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='btn btn-primary mt-2' onClick={handleRegister}> Daftar </button>
            </div>
    );
}

export default Register;