import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../css/Login.css'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div className="login-container">
            <h1 className="login-header">Login Page</h1>
            <form className="login-form" onSubmit={loginUser}>
                <input className="login-input" type="text" name="username" placeholder="Username" />
                <input className="login-input" type="password" name="password" placeholder="Password" />
                <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
