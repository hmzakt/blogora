import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import Header from './components/header/header'
import Footer from './components/footer/footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {      //this is used so that to check if user is logged in or not and sets further imporvements
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false)) // it make sure that the function runs no escape
  }, [])





  console.log(import.meta.env.VITE_APPWRITE_URL); //we got error process is not defined since it is vite project
  return (
    !loading ? (

      <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <Header className="w-full" />

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6 lg:p-8 w-full">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer className="w-full mt-auto" />
    </div>
    ) : null
  );
}



export default App
