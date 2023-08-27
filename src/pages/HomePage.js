import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const Homepage = () => {
    let [documents, setDocuments] = useState([]);
    let { authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        getDocuments(); 
    }, []);

    let getDocuments = async () => {
        let response = await fetch('http://localhost:8000/api/documents/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${String(authTokens.access)}`
            }
        })

        let data = await response.json()

        if (response.status === 200) {
            setDocuments(data)
        } else {
            console.log('Error getting documents! ')
            logoutUser()
        }

    }

    return (
        <body>
            <div class="column sidemenu">
                <header>
                    <h1>Your Details</h1> 
                </header> 
                <Avatar name="Alan Biju" size={150} round={true} />
                <div>
                <br/>
                <text><b>Username:</b> alan</text>
                <br/>
                <br/>
                <text><b>First Name:</b> Alan</text>
                <br/>
                <br/>
                <text><b>Last Name:</b> Biju</text>
                <br/>
                <br/>
                <text><b>Email:</b> altalanbiju@gmail.com</text>
                <br/>
                </div>
            </div>
            <div class="column content">
                <div class ="contentheader">
                    <h1>Home Page</h1>
                </div>

                <p>Here is the list of all the documents you've recently uploaded:</p> 

                <ul>
                    {documents.map((document) => {
                        return <li key={document.id}>{document.filename}</li>
                    })}
                </ul>
                <Link to="/upload">
                    <button class="button1">
                        <p>Upload more files</p>
                    </button>
                </Link>
            </div>
            <footer id="footer"></footer>
        </body>
    )
}

export default Homepage
