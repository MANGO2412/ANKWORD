//importing  libraries 
import { useState } from 'react'
import {ProtectedRoute} from './auth/protectedRoute'
import {AuthLayout} from './auth/authLayout'
import {Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

//views
import Login from './views/Login'

//view error
function ErrorBoundary(){
  return <div>error</div>
}


export const Rutas=createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout/>} >
        <Route path='/' element={<Login/>}/>
        
        {/* handler error 404 routes */}
        <Route path='*' element={<ErrorBoundary/>}/>
    </Route>
  )
);
