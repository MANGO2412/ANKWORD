import { Navigate,Link,useOutlet } from "react-router-dom";
import {useAuth} from './useAuth';
import Nav from "../components/Nav";

export function  ProtectedRoute(){
    const {user,logout}=useAuth()
    const outlet=useOutlet();

    if(user){
        return (
            <div>
             <Nav></Nav>
             {outlet}
            </div>
        )
    }

    return <Navigate to="/"/>
}

export function ProtectedRoot(){
    const {user,logout}=useAuth()
    const outlet=useOutlet();
    
    if(user){
       return <Navigate to="/home"/> 
    }

    return (
        <div>
         {outlet}
        </div>
    )

}