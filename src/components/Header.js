import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../css/Header.css'
import logo from '../static/logo.jpg'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div className="header-container">
            <div className='left-container'>
            <Link to="/" className="nav-link">
                <button className="nav-button">Home</button>
            </Link>
            <span className="nav-separator"> | </span>
            {user ? (
                <button className="nav-button" onClick={logoutUser}>
                    Logout
                </button>
            ) : (
                <Link to="/login" className="nav-link">
                    <button className="nav-button">Login</button>
                </Link>
            )}
            <span className="nav-separator"> | </span>
            {user ? (
               ''
            ) : (
                <Link to="/register" className="nav-link">
                    <button className="nav-button">Signup</button>
                </Link>
            )}
            
            {user ? (
                <Link to="/upload" className="nav-link">
                    <button className="nav-button">Upload</button>
                </Link>
            ) : (
                ''
            )}
            </div>

            <div className='right-container'>
                <img className='logo' src={logo} alt="Logo" />
            </div>

            {/* {user && <p className="user-greeting">Hello {user.username}!</p>} */}
        </div>
    )
}

export default Header
