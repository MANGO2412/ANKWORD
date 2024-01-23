import { useEffect, useState } from "react"
import Games from "../components/Games"
import Button from "../components/Button";
// import Table from "../components/Table";
// import Modal from "../components/Modal";
// import Select from "../components/Select";

import axios from "axios";
import {useAuth} from "../auth/useAuth"


export  default function Game(){
   const {user}=useAuth();
   const ankWApi=import.meta.env.VITE_API_URL;

    /**
     * state variables
     */
     const [gameHag,setGameHag]=useState(false);
     const [gameWD,setGameWD]=useState(false);
    
    

    //modal states


   /**
     * useEffect
   */
   


    /**
     * methods
     */
    const changeGameHag=()=>setGameHag(!gameHag);
    const changeGameWD=()=>setGameWD(!gameWD);
   
    //methods for game flashcards

       /**
     * render html
     */
   return(
   <div className="game">   
       {/* game button */}
       <Button.cube on={changeGameHag}>Hagnman</Button.cube>
      {/* this a window where the user will play with flashcards */}
       <Games show={gameHag} type={'HAGNMAN'} hidden={changeGameHag}>
       </Games>

       <Button.cube on={changeGameWD}>dictation pronutation</Button.cube>
       <Games show={gameWD} type={'dictation/pronutation'} hidden={changeGameWD}/>
   </div>
   )   
}