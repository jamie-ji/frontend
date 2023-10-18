import React, {useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../css/Login.css'
import logo from '../static/pic1.jpg'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
const RegisterValidPage = () => {
    let { Validation } = useContext(AuthContext)
    let navigate = useNavigate()
    const [code, setCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 发送验证码到后端进行验证
        const response = await fetch('http://localhost:8000/api/validate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        });

        const data = await response.json();
        if (data.success) {
            // 进行下一步，例如跳转到登录页面
            alert('Register success')
            navigate('/login')
        } else {
            alert(data.message);  // 显示错误信息
        }
    };

    return (
        <div className="login-container">
            <img className='img' src={logo} />
            
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    className="login-input" 
                    type="text" 
                    name="username" 
                    placeholder="Your 6 Valid Code" 
                    value={code} 
                    onChange={e => setCode(e.target.value)} 
                />
                <button className="login-button" type="submit">Finish Register</button>
            </form>
        </div>
    )
}

export default RegisterValidPage
