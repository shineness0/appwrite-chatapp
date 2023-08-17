import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from '../appwriteConfig'
import { ID } from 'appwrite'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    getUserOnLoad()
  }, [])

  const getUserOnLoad = async () => {
    try {
      const userProfile = await account.get()
      setUser(userProfile)
    } catch (error) {
      console.info(error)
    }
    setLoading(false)
  }

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault()

    try {
      const response = await account.createEmailSession(
        credentials.email,
        credentials.password
      )

      const userProfile = await account.get()

      setUser(userProfile)

      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleUserLogout = async () => {
    await account.deleteSession('current')
    setUser(null)
  }

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault()

    if (credentials.password1 !== credentials.password2) {
      alert('Passsword do not match')
      return
    }

    try {
      const response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      )

      await account.createEmailSession(credentials.email, credentials.password1)

      const userProfile = await account.get()
      setUser(userProfile)

      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
