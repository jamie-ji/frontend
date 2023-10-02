import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import FilterData from '../components/FilterData';
import DrawChart from '../components/DrawChart';
import { Fragment } from 'react';


const Homepage = () => {
    let [documents, setDocuments] = useState([]);
    let [user, setUser] = useState([]);
    let { authTokens, logoutUser } = useContext(AuthContext);
    let [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        getDocuments();
    }, []);
    useEffect(() => {
        getUser();
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

    let getUser = async () => {
        let response = await fetch('http://localhost:8000/api/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${String(authTokens.access)}`
            }
        })

        let data = await response.json()

        if (response.status === 200) {
            setUser(data)
        } else {
            console.log('Error getting user! ')
            logoutUser()
        }

    }

       //Dummy Data 
       const documentErrorStat = [
        {
          "timestamp": "2022-10",
          "errorType": "All Errors",
          "errorCount": 100
        },
        {
          "timestamp": "2022-10",
          "errorType": "Syntax Error",
          "errorCount": 20
        },
        {
          "timestamp": "2022-10",
          "errorType": "Spelling Error",
          "errorCount": 10
        },
        {
            "timestamp": "2022-11",
            "errorType": "All Errors",
            "errorCount": 60
          },
          {
            "timestamp": "2022-11",
            "errorType": "Syntax Error",
            "errorCount": 40
          },
          {
            "timestamp": "2022-11",
            "errorType": "Spelling Error",
            "errorCount": 20
          },
        {
          "timestamp": "2022-12",
          "errorType": "All Errors",
          "errorCount": 120
        },
        {
          "timestamp": "2022-12",
          "errorType": "Syntax Error",
          "errorCount": 25
        },
        {
          "timestamp": "2022-12",
          "errorType": "Spelling Error",
          "errorCount": 15
        },
        {
            "timestamp": "2023-01",
            "errorType": "All Errors",
            "errorCount": 30
        },
        {
            "timestamp": "2023-01",
            "errorType": "Syntax Error",
            "errorCount": 25
        },
        {
            "timestamp": "2023-01",
            "errorType": "Spelling Error",
            "errorCount": 5
        },
          {
            "timestamp": "2023-02",
            "errorType": "All Errors",
            "errorCount": 45
          },
          {
            "timestamp": "2023-02",
            "errorType": "Syntax Error",
            "errorCount": 35
          },
          {
            "timestamp": "2023-02",
            "errorType": "Spelling Error",
            "errorCount": 10
          },
      ]
    
    const handleDataFiltered = (data) =>{
        setFilteredData(data);
    };



    return (
        <body>
            
            <div class="column sidemenu">
                <header>
                    <h1>Your Details</h1> 
                </header> 
                <Avatar name={user.first_name+' '+user.last_name} size={150} round={true} />
                <div>
                <br/>
                <text><b>Username:</b> {user.username}</text>
                <br/>
                <br/>
                <text><b>First Name:</b> {user.first_name}</text>
                <br/>
                <br/>
                <text><b>Last Name:</b> {user.last_name}</text>
                <br/>
                <br/>
                <text><b>Email:</b> {user.email}</text>
                <br/>
                </div>
                <Link to="/upload">
                    <button class="button1">
                        <p>Upload more files</p>
                    </button>
                </Link>

            </div>
            <div class="column content">
                <div class ="contentheader">
                    <h1>Home Page</h1>
                </div>

                <p>Here is the list of all the documents you've recently uploaded:</p> 

                <table>
                    <tr>
                        <td>Filename</td>
                        <td>Author</td>
                    </tr>
                    <tr>
                    {documents.map((document) => {
                        return <Fragment><td>{document.filename}</td><td>{document.author}</td></Fragment>
                    })}
                    </tr>
                </table>

                <div style={{ width: '800px', height: '30px', marginTop: '30px' }}>
                <FilterData onDataFiltered={handleDataFiltered} initialData={documentErrorStat}/>
                </div>
                <div style={{ width: '900px', height: '500px' }}>
                <DrawChart chartData={filteredData}/> {/* Pass data and options here */}
                </div>
            </div>
            
            <footer id="footer">
                <text style= {{marginLeft: '40px', textAlign: 'center'}}>Penwell™</text>
            </footer>
        </body>
    )
}

export default Homepage