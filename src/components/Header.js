import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        // <nav classname="nav">
        //     <Link to="/" classname="site-title">
        //         Penwell
        //     </Link>
        //     <ul>
        //         <li>
        //             <Link to="/upload">Upload</Link>
        //         </li>
        //         <li>
        //             <Link to="/logout">Logout</Link>
        //         </li>
        //     </ul>
        // </nav>
        <div class="topnav">
            <Link class="active" to="/">Penwell</Link>
            <Link to="/upload">Upload</Link>
            {user ? (<Link onClick={logoutUser}>Logout</Link>) : (<Link to="/login">Login</Link>)}
            <Link to="/upload">My Files</Link>
        </div>
        // <div>
        //     <Link to="/"><button>Home</button></Link>
        //     <span> | </span>
        //     {user ? (<button onClick={logoutUser}>Logout</button>) : (<Link to="/login"><button>Login</button></Link>)}
        //     <span> | </span>
        //     {user ? (<Link to="/upload"><button>Upload</button></Link>) : ''}
            
        //     {user && <p>Hello {user.username}!</p>}
            
        // </div>
    )
}

export default Header
