import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../css/Login.css'
import logo from '../static/pic1.jpg'

const RegisterValidPage = () => {
    
    return (
        <div className="login-container">
            <img className='img' src={logo} />
            
            <form className="login-form" >
                <input className="login-input" type="text" name="username" placeholder="Your 6 Valid Code" />
               
                <button className="login-button" type="submit">Finish Register</button>
            </form>
        </div>
    )
}

export default RegisterValidPage
