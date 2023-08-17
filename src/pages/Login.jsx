import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const { user, handleUserLogin } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit={(e) => handleUserLogin(e, credentials)}>
          <div className='field--wrapper'>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email...'
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='field--wrapper'>
            <label>Password:</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='field--wrapper'>
            <button className='btn btn--lg btn--main' type='Submit'>
              Login
            </button>
          </div>
        </form>
        <p>
          Don't have an account? Register <Link to='/register'>here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
