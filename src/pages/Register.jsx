import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
  })

  const { handleUserRegister } = useAuth()

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit={(e) => handleUserRegister(e, credentials)}>
          <div className='field--wrapper'>
            <label>Name:</label>
            <input
              type='text'
              name='name'
              placeholder='Enter your name...'
              value={credentials.name}
              onChange={handleInputChange}
              required
            />
          </div>
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
              name='password1'
              placeholder='Enter your password...'
              value={credentials.password1}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='field--wrapper'>
            <label>Confirm Password:</label>
            <input
              type='password'
              name='password2'
              placeholder='Confirm your password...'
              value={credentials.password2}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='field--wrapper'>
            <button className='btn btn--lg btn--main' type='Submit'>
              Register
            </button>
          </div>
        </form>
        <p>
          Already have an account? Login <Link to='/login'>here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
