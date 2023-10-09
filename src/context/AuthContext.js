import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    
    let checkedTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null 

    let [loading, setLoading] = useState(true)
    let [authTokens, setAuthTokens] = useState(checkedTokens)
    let [user, setUser] = useState(checkedTokens ? jwt_decode(checkedTokens.access) : null)

    let navigate = useNavigate()

    let loginUser = async(e) => {
        e.preventDefault()
         console.log('Form submitted! ')

        let response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })

        let data = await response.json()

        // console.log('data: ', data)
        // console.log('response: ', response)

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access)) 

            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Login failed! ')
            console.log('Login failed! ')
        }
    }
    let RegisterUser=async(e)=>{
        
        console.log('Form submitted! ')
        
        let response = await fetch('http://localhost:8000/api/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.username,'email':e.email ,'first_name':e.first_name,'last_name':e.last_name,'password': e.password})
        })
       
        let data = await response.json()
        if (response.status === 201) {
            alert('Code has been sent to your email')
            navigate('/login')
        } else {
            alert('Username or email been used! Try another ones.')
            console.log('Register failed! ')
        }
    }



    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateTokens = async () => {
        console.log('Updating tokens! ')
        let response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    let contextData = {
        user: user, 
        authTokens: authTokens,
        loginUser: loginUser, 
        logoutUser: logoutUser, 
        RegisterUser:RegisterUser,
    }
    
    useEffect(() => {

        if (loading) {
            updateTokens()
        }

        let interval_time = 1000 * 60 * 4 // 4 minutes

        let interval = setInterval(() => {
            if (authTokens) {
                updateTokens()
            }
        }, interval_time)

        return () => clearInterval(interval)
    // eslint-disable-next-line
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}

        </AuthContext.Provider>
    )
}