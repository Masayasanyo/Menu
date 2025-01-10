import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUp({ handleLogin }) {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        userName: "", 
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
        console.log("Form submitted");
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData), 
            });
            if (response.ok) {
                console.log(response);

                const data = await response.json();
                alert(`Success!: ${data.user.username}`);
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
        <div className="signUp-container">
            <div>
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>Username</h2>
                        <input 
                            className='signup-input'
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <h2>Email</h2>
                        <input 
                            className='signup-input'
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div>
                        <h2>Password</h2>
                        <input
                            className='signup-input'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <button className='signup-continue' type='submit'>Continue</button>
                </form>
            </div>
        </div>
    );
}
  
export default SignUp;