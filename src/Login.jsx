import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
  
function Login({ handleLogin }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "", 
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData), 
            });
            if (response.ok) {
                const data = await response.json();
                alert(`Success!: ${data.user.email}`);
                handleLogin(data.user);
                navigate('/setting');
            } else {
                alert('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    }

    return (
        <div className="login-container">
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Email</h2>
                    <input 
                        className='login-input'
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}>
                    </input>
                </div>
                <div>
                    <h2>Password</h2>
                    <input
                        className='login-input'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}>
                    </input>
                </div>
                <h2>Don't have an account?</h2>
                <Link to='/setting/signup'>Sign up</Link>
                <button className='login-continue' type='submit'>Continue</button>
            </form>
        </div>
    );
}
  
export default Login;