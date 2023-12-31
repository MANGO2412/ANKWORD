//import some library components
import { useAuth } from "../auth/useAuth"
import axios from 'axios';
import Spinner from "../components/Spinner";
import Table from "../components/Table";
import { useEffect, useState } from "react";


export default function Glossary(){
    const {user}=useAuth();
    const ankWapi=import.meta.env.VITE_API_URL;

    /**
     * usestate variables
     */
    //this variable is used to storage  words the user is studing from the api 
    const [listword,setListWord]=useState(null);

    /**
     * useEFFECT methods
     */
    useEffect(()=>{
        axios.get(`${ankWapi}/word/user/${user.id}`,{
            headers:{
                'x-access-token':user.token
            }
        })
        .then(resp=>{
            setListWord(resp.data)
        })
        .catch(error=>{
           console.log(error.message)
        })
    },[])


    /**
     * methods of the component
     */


    /**
     * render html
     */
    return(
       <div className="glossary">
             <Table>
               <thead>
                  <tr>
                    <th>WORD</th>
                    <th>TYPE</th>
                  </tr>
               </thead>
             <tbody>
                {listword && listword.map(elem=>(
                    <tr key={elem.id}>
                        <td>{elem.name}</td>
                        <td>{elem.typeword}</td>
                    </tr>
                ))}  
             </tbody>
            </Table>
       </div>
    )
}