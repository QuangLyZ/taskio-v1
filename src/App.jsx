import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './App.css'

import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'




//Icons
  import { Icons } from './components/Icons.jsx'
//Components
  // Small Logo
  import LogoSm from './components/LogoSm.jsx'
    // Large logo
  import LogoM from './components/LogoM.jsx'
  // Large logo
  import LogoLg from './components/LogoLg.jsx'
  // Button components
  import LargeOrangeButton from './components/LargeOrangeButton.jsx'
  import LargeWhiteButton from './components/LargeWhiteButton.jsx'
  import SmallWhiteButton from './components/SmallWhiteButton.jsx'
  import SmallOrangeButton from './components/SmallOrangeButton.jsx'
  //Input
  import Input from './components/Input.jsx'
  //Search bar
  import SearchIcon from './assets/icons/search.svg'
  import SearchBar from './components/SearchBar.jsx'
  //Pop up 
  import PopUp from './components/PopUp.jsx'
  //Loading Status
  import LoadingStatus from './components/LoadingStatus.jsx'
  //Icon component
  import IconComponent from './components/IconComponent.jsx'
  // Task Counter
  import TaskCounter from './components/TaskCounter.jsx'
  //Aside
  import Aside from './components/Aside.jsx'





//Pages
  //404 - Not Found
  import NotFound from './pages/NotFound.jsx'
  //Sign up
  import SignUp from './pages/SignUp.jsx'
  //Sign in
  import SignIn from './pages/SignIn.jsx'
  //Forgot password
  import ForgotPassword from './pages/ForgotPassword.jsx'
  //Dashboard
  import DashBoard from './pages/DashBoard.jsx'


export default function App() {

  return (
    <div className='App'>
      <nav>
        <Link to='/'></Link>
        <Link to='/signup'></Link>
        <Link to='/resetpassword'></Link>
        <Link to='/dashboard'></Link>
        <Link to='/colorpicker'></Link>
        <Link to='/createnewtag'></Link>

      </nav>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/resetpassword' element={<ForgotPassword />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/dashboard' element={<DashBoard />} />

      </Routes>
    </div>
  )
}

