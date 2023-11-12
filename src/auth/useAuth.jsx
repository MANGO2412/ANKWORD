import {createContext,useContext,useMemo,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocalStorage} from "./useLocalStorage"


//variable is used to save global variables and methods
const AuthContext=createContext();


export const AuthProvider=({children})=>{
   const [user,setUser]=useLocalStorage("user",null)
   const navigate=useNavigate();

   //if you want to authenticate at a user, you can use this function
   const login= async(data)=>{
     try {
         setUser(data)
     } catch (e) {
         console.error("Error al iniciar sesion por: ",e.message)
         return false
     }
    }

     //this function is used to sign out 
     const logout=()=>{
        setUser(null)
        navigate("/",{replace:true})
    }


    const value=useMemo(
        ()=>({
            user,
            login,
            logout
        }),
        [user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth=()=>useContext(AuthContext)