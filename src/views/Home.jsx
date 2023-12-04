//import some compoenet libreraries 
import {useState}from 'react';
import { useAuth } from '../auth/useAuth';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function Home(){
    //those variable are importing the api's URL in the env file 
    const urlDict=import.meta.env.VITE_API_DICT;
    const ankWApi=import.meta.env.VITE_API_URL;
    const {user}=useAuth()

    /**state variables */
    //state variable to show a spinner 
    const [showSpinner,setShowSpinner]=useState(false)
    //state search
    const [searchValue,setSearchValue]=useState("");
    //state word
    const [word,setWord]=useState([])
    //state glossary
    const [glossary,setGlossary]=useState({
        name:'',
        sound:'',
        usr:user.id
    })


    /**methods */
    //this function is used to handle the changes of input search
    const handleChangeSearch=(e)=>{
        const {value}=e.target;
        setSearchValue(value)
    }

    //this function is used to get  json of the word that the user wrote  on the search input from dicctionary api 
    const searchword=async(e)=>{
        if(e.key==="Enter" || e._reactName==="onClick"){
           let resp= await fetch(urlDict+searchValue);
           let data=await resp.json()
           let sonido;
      
           for (const elem of data[0].phonetics) {
                if(elem.audio.split("-").includes('us.mp3')){
                    sonido=elem.audio
                    break;
               } 
            }

           setGlossary({
            ...glossary,
            name:data[0].word,
            sound:sonido
           })
           setWord(data)
        }
    }

    //this function is used to  play sound from file that the api dicctionary  
    const loadAUdio=()=>{
        const audio=new Audio(glossary.sound);
        audio.play();
    }

    //this function is used to save the worh that the user want to learn  to our own api 
    const saveWord= async()=>{
        setShowSpinner(true)
       try {
          let resp=await axios.post(`${ankWApi}/word/add`,glossary,{
            headers:{
                'x-access-token':user.token
            }
          })
      
          setShowSpinner(false)
          alert(resp.data.message)
       } catch (e) {
            console.error(e.message)
            alert("happened a wrong  with the application, you will try this operation again ")
       }

       setWord([])
       setGlossary({
        ...glossary,
        sound:'',
        name:''
       })
    }
   
    //here the component return a html template 
    return(
        <div>
           {/* search */}
           <div className="searchword">
              <input  className="searchword__input" placeholder="TYPE A WORD..." type="text" onKeyPress={async (e)=>await searchword(e)} onChange={handleChangeSearch}/>
              <span onClick={async (e)=>await searchword(e)}><img  className="searchword__img"src="/img/lupa.png" alt="" /></span>
           </div>
           {word[0] && 
            <div className='searchresult'>
                <h2> <span>{word[0].word}</span> <span onClick={()=>{loadAUdio()}}><img src="/img/suena.png" alt="" /></span> <span  style={{color:'#787A91', marginLeft:'3px'}}>{word[0].phonetic}</span> <span style={{position:'relative',left:'50%'}}><button onClick={async ()=>{await saveWord()}} className='button button__dark'> <Spinner show={showSpinner} hiddenText={'study'} /></button></span></h2>
                <section style={{padding:'10px'}}>
                 <h3 style={{textAlign:'center'}}>Meanings</h3>
                 <ul className='searchdefinitions'>
                     {word[0].meanings.map((elem,i)=>(
                         <>
                            <li key={i}>
                                as a {elem.partOfSpeech}
                              {elem.definitions.map((def,i)=>(
                                <>
                                 <div key={i} className='searchBoxItems'>
                                   <span className='searchitems'>Defnition:{def.definition}</span>
                                   {def.example && <span className='searchitems'>example: {def.example}</span>}
                                </div>
                               </>
                              ))}
                           </li>    
                         </>     
                    ))}
                 </ul>
             </section>
             </div>
            }
        </div>
    )
}