import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'


function App() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This renders matched child route */}
    </>
  )
}

export default App
