import React, { useContext,useState } from 'react'
import AuthContext from '../context/AuthContext'
import '../css/Register.css'
import logo from '../static/pic1.jpg'
const RegisterPage = () => {
    let {RegisterUser} = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Perform validation here
        const validationErrors = {};
    
        if (username.length < 6) {
          validationErrors.username = 'Username must be at least 6 characters.';
        }
    
        // Basic email format validation (you can use a library for more robust validation)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          validationErrors.email = 'Invalid email format.Should end with @xxx.com';
        }
    
        // Other validation rules for first_name, last_name, and password can be added here
    
        if (Object.keys(validationErrors).length === 0) {
          // If there are no validation errors, submit the form
          RegisterUser({ username, email, firstName, lastName, password });
        } else {
          // If there are validation errors, update the state to display them
          setErrors(validationErrors);
        }
      };

    return (
        <div className="container">

        <img className='img' src={logo} alt='logo'/>
        <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <input
          className="register-input"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          className="register-input"
          type="text"
          name="first_name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {/* Add validation and error display for first_name here */}

        <input
          className="register-input"
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {/* Add validation and error display for last_name here */}

        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Add validation and error display for password here */}

        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
    )
}

export default RegisterPage
