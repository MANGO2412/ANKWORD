//import some compoenet libreraries 
import {useState}from 'react';
import { useAuth } from '../auth/useAuth';
import axios from 'axios';
import Spinner from '../components/Spinner';

export default function Home(){
    //those variable are importing the api's URL in the env file 
    const ankWApi=import.meta.env.VITE_API_URL;
    const {user}=useAuth()

    /**state variables */
    //state variable to show a spinner 
    const [showSpinner,setShowSpinner]=useState(false)
    //
    const [showSmallSpinner,setShowSmallSpinner]=useState(false)
    //state search
    const [searchValue,setSearchValue]=useState("");
    //state word
    const [word,setWord]=useState(null)
  
    /**methods */
    //this function is used to handle the changes of input search
    const handleChangeSearch=(e)=>{
        const {value}=e.target;
        setSearchValue(value)
    }

    //this function is used to get  json of the word that the user wrote  on the search input from dicctionary api 
    const searchword=async(e)=>{
      
        if( (e.key==="Enter" || e._reactName==="onClick")  && searchValue.trim()!=""){
           setShowSpinner(true)
           let resp=await fetch(`${ankWApi}/search/${searchValue.trim()}`,{
              headers: {
                'x-access-token':user.token
              }
           });
        
        let data=await resp.json();
        //let sonido; 
         if(data.message){
           alert(data.message)
         }else{
          setWord(data)
         }
         setShowSpinner(false)
         
        }
    }

    //this function is used to  play sound from file that the api dicctionary  
    const loadAUdio=(url)=>{
        const audio=new Audio(url);
        audio.play();
    }

    //this function is used to save the worh that the user want to learn  to our own api 
    const saveWord= async()=>{
        setShowSmallSpinner(true)
       try {
          let resp=await axios.post(`${ankWApi}/word/add`,{
            name:word.word,
            sound:word.sounds,
            typeword:word.type,
            meaning:word.meaning,
            usr:user.id
          },{
            headers:{
                'x-access-token':user.token
            }
          })
      
          setShowSmallSpinner(false);
          alert(resp.data.message)
       } catch (e) {
            console.error(e.message)
            alert("happened a wrong  with the application, you will try this operation again ")
       }

       setWord(null) 
    }
   
    //here the component return a html template 
    return(
        <div>
           {/* search */}
           <div className="searchword">
              <input  className="searchword__input" placeholder="TYPE A WORD..." type="text" onKeyPress={async (e)=>await searchword(e)} onChange={handleChangeSearch}/>
              <span onClick={async (e)=>await searchword(e)}><img  className="searchword__img"src="/img/lupa.png" alt="" /></span>
           </div>
           <div className='searchresult'>
              {showSpinner?(
                  <div style={{display:'flex',justifyContent:'center'}}><Spinner/></div>
              ):(
               <>
               {word&& 
                 <>
                   <h2> <span>{word.word}</span> <span style={{position:'relative',left:'50%'}}><button onClick={async ()=>{await saveWord()}} className='button button__dark'> {showSmallSpinner?<Spinner.small/>:"study"} </button></span></h2>
                   <p>
                    <span className='defitem'>{word.type}</span>
                    {word.sounds.map((sn,i)=>(
                      <span key={i}className='defitem'>
                        {sn.region}
                        <span onClick={()=>loadAUdio(sn.sound)}><img src="/img/suena.png" alt="" /></span>/        
                        {sn.phonetics}
                      </span>
                    ))}      
                   </p>
                  <section style={{padding:'10px'}}>
                    <h3 style={{textAlign:'center',marginBottom:'10px'}}>Meanings</h3>
                    <section className='searchdefinitions'>
                    {word.meaning.map((elem,i)=>(  
                        <div key={i} className='searchBoxItems'>
                           <header className='searchitemsHeader'>{elem.definition}</header>
                           <ul className='examples'>
                             {elem.examples.map(exam=>
                                <>
                                  <li>{exam.englishExample}.</li>
                                  <li>{exam.spanishExample}</li>
                                </> 
                              )}
                           </ul>
                        </div>      
                     ))}
                   </section>
                 </section>
                 </> 
               }
               </>
              )}
              
           </div>
        </div>
    )
}