import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import {  Route, Routes } from "react-router-dom";
import Landing from './pages/Landing';
import History from './pages/History';



function App() {
 
  return (
    <>
      <Header/>
      
      <Routes>
      
<Route path='/'element={<Landing/>}/>

<Route path='/history'element={<History/>}/>

     </Routes>
      
      <Footer/>
    </>
  )
}

export default App
