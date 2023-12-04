//importing  libraries 
import { useState } from 'react'
import {ProtectedRoute,ProtectedRoot} from './auth/protectedRoute'
import {AuthLayout} from './auth/authLayout'
import {Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

//views
import Login from './views/Login'
import Home from './views/Home'
import Game from './views/Game'
import Glossary from './views/Glossary'
import Perfil from './views/Perfil';

//view error
function ErrorBoundary(){
  return <div>error</div>
}


export const Rutas=createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout/>} >
       <Route element={<ProtectedRoot/>}>
        <Route path='/' element={<Login/>}/> 
       </Route>
        
        <Route path='/' element={<ProtectedRoute/>}>
             <Route path='home' element={<Home/>}/>
             <Route path='game' element={<Game/>}/>
             <Route path='glossary' element={<Glossary/>}/>
             <Route path='perfil' element={<Perfil/>}/>
        </Route>
        {/* handler error 404 routes */}
        <Route path='*' element={<ErrorBoundary/>}/>
    </Route>
  )
);
