import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../css/Register.css'
const RegisterPage = () => {
    let {RegisterUser} = useContext(AuthContext)
    return (
        <div className='container'>
        <form className="register-form" onSubmit={RegisterUser}>
            <input className="register-input" type="text" name="username" placeholder="Username" />
            <input className="register-input" type="text" name="email" placeholder="Email" />
            <input className="register-input" type="text" name="first_name" placeholder="First Name" />
            <input className="register-input" type="text" name="last_name" placeholder="Last Name" />
            <input className="register-input" type="password" name="password" placeholder="Password" />
            <button className="register-button" type="submit">Register</button>
        </form>
    </div>
    )
}

export default RegisterPage
