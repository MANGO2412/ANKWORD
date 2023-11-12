import { Navigate,Link,useOutlet } from "react-router-dom";
import {useAuth} from './useAuth';


export function  ProtectedRoute(){
    const {user,logout}=useAuth()
    const outlet=useOutlet();

    if(user){
        return (
            <div>{outlet}</div>
        )
    }

    return <Navigate to="/"/>
}