import React, { useContext,useState } from 'react'
import AuthContext from '../context/AuthContext'
import '../css/Register.css'
import logo from '../static/pic1.jpg'
import Notification from './Notification'
const RegisterPage = () => {
    
    let { RegisterUser } = useContext(AuthContext)
    const [isProcessing,setIsProcessing]=useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
        } else {
            RegisterUser(formData);
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false)
            }, 3000);
        }
    };
    return (
      
      <div className="register-container">
            <Notification isProcessing={isProcessing} />
            <img className='img' src={logo} alt="Logo" />
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username (min 6 characters)"
                        className="form-control"
                        minLength="6" 
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email (e.g., user@example.com)"
                        className="form-control"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="form-control"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Register</button>
            </form>
            <div className="advertising-text">
                <p>Sign up now and enjoy flawless writing.</p>
            </div>
        </div>
    )
}

export default RegisterPage