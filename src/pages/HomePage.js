import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import ErrorAnalysisLineChart from '../components/ErrorAnalysisLineChart';
import FilterData  from '../components/FilterData';

const Homepage = () => {
    let [documents, setDocuments] = useState([]);
    let { authTokens, logoutUser } = useContext(AuthContext);
    //let [documentErrorStat,setDocumentErrorStat] = useState([]);
    let [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        getDocuments(); 
        //getDocumentErrorStat();
        
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
    // //Method to get Document Error Statistics
    // let getDocumentErrorStat = async () => {
    // // new API needed    
    //     let response = await fetch('http://localhost:8000/api/documenterrorstat/', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${String(authTokens.access)}`
    //         }
    //     })
    //     let data = await response.json()
    //     if (response.status === 200) {
    //         setDocumentErrorStat(data)
    //     } else {
    //         console.log('Error getting documents! ')
    //         logoutUser()
    // }

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
        <div>
            <div>
                <p>You are logged to the home page! </p>

                <p>Here is the list of all the documents:</p> 

                <ul>
                    {documents.map((document) => {
                        return <li key={document.id}>{document.body}</li>
                    })}
                </ul>
            </div>
            <div style={{ width: '1200px', height: '100px' }}>
                <FilterData onDataFiltered={handleDataFiltered} initialData={documentErrorStat}/>
            </div>
            <div style={{ width: '1200px', height: '400px' }}>
                <ErrorAnalysisLineChart chartData={filteredData}/> {/* Pass data and options here */}
            </div>
        </div>
        
    )
}

export default Homepage
