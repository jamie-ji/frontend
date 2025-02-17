import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../css/Login.css'
import logo from '../static/pic1.jpg'
import { Link } from 'react-router-dom'
const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div className="login-container">
            <img className='img' src={logo} />
            
            <form className="login-form" onSubmit={loginUser}>
                <input className="login-input" type="text" name="username" placeholder="Username" />
                <input className="login-input" type="password" name="password" placeholder="Password" />
                

                <button className="login-button" type="submit">Login</button>
                <Link to="/register" className="reg-link">
                    <button className="reg-button">New to Penwell?</button>
                </Link>
            </form>
        </div>
    )
}

export default LoginPage
