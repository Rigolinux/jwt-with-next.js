import React from 'react'

//backend comunication
import axios from 'axios'

//routing with next
import { useRouter } from 'next/router'

function Login() {

  //initialaizing router
  const router = useRouter()

  //hook for credentials
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: ''
  })

  //save credentials in state
  const handlechangue = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
    

  }

  //send credentials to server
  const handlesubmit = async(e) => {
    e.preventDefault()
    const res = await axios.post('/api/auth/login', credentials).catch(err => console.log(err));
    if(res.status === 200) {
    router.push('/dashboard')
    }

    
  }


  return (
    <form onSubmit={handlesubmit}>
        <label htmlFor="email">Email</label>
        <input onChange={handlechangue} type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input onChange={handlechangue} type="password" name="password" id="password" />
        <button>
            Login
        </button>
    </form>
  )
}

export default Login