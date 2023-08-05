import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'

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
        <div>
            <p>You are logged to the home page! </p>

            <p>Here is the list of all the documents:</p> 

            <ul>
                {documents.map((document) => {
                    return <li key={document.id}>{document.body}</li>
                })}
            </ul>

        </div>
    )
}

export default Homepage
