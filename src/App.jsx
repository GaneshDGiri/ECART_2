import React from 'react'
import Context from './components/Context'
import Home from './components/Home'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import AuthContextProvider from "./components/Context"




const App = () => {
  

  return (
    <BrowserRouter>
    <AuthContextProvider>

    <Context>
    
    <Routes>
      <Route  path="/" element={<Home/>}/>
    </Routes>
    
    </Context>
    </AuthContextProvider>
    </BrowserRouter>
    
  
  )
}

export default App
