import React from 'react'


//axios
import axios from 'axios'

//router
import { useRouter } from 'next/router'

function dashboard() {

    //router
    const router = useRouter()

    //saving token in state
    const [token, setToken] = React.useState({
        email: '',
        password: ''
    })

    const getProfile = async() => {
        const res = await axios.get('/api/auth/Profile').catch(err => console.log(err));
        setToken(res.data)
        
    }
    const handlelogout = async() => {
        const res = await axios.post('/api/auth/logout').catch(err => console.log(err));
        router.push('/Login')
        
        
    }

  return (
    <div>
        <h1>dashboard</h1>
        <h1>welcome again {token.email}</h1>
        <button onClick={() => getProfile()}>
            get Profile
        </button>

        <button onClick={()=> handlelogout()}>
            Logout
        </button>

    </div>
  )
}

export default dashboard