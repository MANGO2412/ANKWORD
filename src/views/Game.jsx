import { useEffect, useState } from "react"
import Games from "../components/Games"
import Button from "../components/Button";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Select from "../components/Select";

import axios from "axios";
import {useAuth} from "../auth/useAuth"


export  default function Game(){
   const {user}=useAuth();
   const ankWApi=import.meta.env.VITE_API_URL;

    /**
     * state variables
     */
     const [gameFlash,setGameFlash]=useState(false);
     const [flash,setFlash]=useState(false);
     const [gameWD,setGameWD]=useState(false);
     const [decks,setDecks]=useState([]);
     const [newDeck,setNewDeck]=useState({
         title:"",
         newamountword:0,
         learnamountword:0,
         usr:user.id,
     });

    const [listWord,setListWord]=useState([]);
    const [defWord,setDefWord]=useState([]);
    const [actSelect,setActSelect]=useState(true);
     const [flashcard,setFlashcard]=useState({
        word:'',
        definition:'',
        region:'',
        dck:'',
     })


    //modal states
    const [modalDecks,setModalDecks]=useState(false);
    const [modalfc,setModalFC]=useState(false);

   /**
     * useEffect
   */
    useEffect(()=>{
        axios.get(`${ankWApi}/deck/`,{
          headers:{
             'x-access-token':user.token
           }
        })
        .then(resp=>{
            setDecks(resp.data)
        })
        .catch(err=>{
           console.error(err.message)
        })

    },[])

    useEffect(()=>{
         axios.get(`${ankWApi}/word/user/${user.id}`,{
           headers:{
            'x-access-token':user.token
           }
         })
         .then(resp=>{
            setListWord(resp.data)
         })
         .catch(err=>{
             console.error(err.message);
         })
    },[])


    /**
     * methods
     */
    const changeGameFlash=()=>setGameFlash(!gameFlash);
    const changeGameWD=()=>setGameWD(!gameWD);
    const changeFlash=()=>setFlash(!flash);
    
    const  createNewDeck=async()=>{
        try {
          let resp= await axios.post(`${ankWApi}/deck/add`,newDeck,{
            headers:{
              'x-access-token':user.token
            }
          })


           let newDate=await  axios.get(`${ankWApi}/deck/`,{
            headers:{
               'x-access-token':user.token
             }
          })

        
          setDecks(newDate.data);
          setModalDecks(!modalDecks);

          alert(resp.data.message)
        } catch (e) {
           console.error(e.message)
        }    
    }

  

    //methods for game flashcards
    const selectWord=(value)=>{
       if(value!=""){
        setFlashcard({
          ...flashcard,
          ["word"]:value
        })
   
        setDefWord(listWord.filter(elem=>elem.name==value)[0].meaning)
        setActSelect(false);
       }else{
        setActSelect(true);
       }
       
    }

     const selectDeck=(value,index)=>{
        setFlashcard({
          ...flashcard,
          ["dck"]:decks[index].id
        })
     }


     const selectDef=(value,index)=>{
         setFlashcard({
          ...flashcard,
          ["definition"]:value
         })
     }

     const selectRegion=(value)=>{
           let word=listWord.filter((elem)=>elem.name===flashcard.word)
           setFlashcard({
               ...flashcard,
               ["region"]:value==="UK"?word[0].sound[0]:word[0].sound[1]
           }) 
          
     }

     const createNewFlashcard=async ()=>{
         try {
             let amount=(decks.filter(elem => elem.id=== flashcard.dck))[0].newamountword +1;
            

             //updating data
            let messageF=  await axios.post(`${ankWApi}/flashcards/add`,flashcard,{
              headers:{
                 'x-access-token':user.token
               }})

              let deckUpdate =await axios.put(`${ankWApi}/deck/update/${flashcard.dck}`,{
                "newamountword":amount
              },{
                headers:{
                   'x-access-token':user.token
              }})

              console.log(deckUpdate.data)

             //get data updated 
             let dck=await  axios.get(`${ankWApi}/deck/`,{
              headers:{
                 'x-access-token':user.token
               }
            })

            setDecks(dck.data)
            alert(messageF.data.message)

         } catch (e) {
            console.error(e.message);
            alert(e.message)
         }

         setModalFC(!modalfc)
         setActSelect(true)
     }

    /**
     * render html
     */
   return(
   <div className="game">   
       {/* game button */}
       <Button.cube on={changeGameFlash}>flashcard study</Button.cube>
      

      {/* this a window where the user will play with flashcards */}
       <Games show={gameFlash} type={'flashcard study'} hidden={changeGameFlash}>
          <div className="glossary d-flex justify-content-center ">
            <ul className="glossary__list d-flex justify-content-center ">
                <li className="CUR" onClick={()=>{setModalDecks(!modalDecks)}}>New Deck</li>
                <li className="CUR" onClick={()=>{setModalFC(!modalfc)}}>Add</li> 
            </ul>
          </div>
           <div className="glossary">
            <Table>
                 <thead>
                    <tr>
                        <th>Deck</th>
                        <th>New</th>
                        <th>learn</th> 
                        <th>actions</th>
                    </tr>
                 </thead>
                 <tbody>
                     {decks.map(elem=>(
                       <tr key={elem.id}>
                         <td className="CUR" onClick={changeFlash}>{elem.title}</td>
                         <td>{elem.newamountword}</td>
                         <td>{elem.learnamountword}</td>
                         <th><button className="button">Delete</button>  <button className="button">Modify</button></th>
                       </tr>
                     ))}
                 </tbody>
            </Table>   
           </div> 

           <Modal show={modalDecks}>
               <Modal.Header>New deck</Modal.Header>
               <Modal.Body>
                  <form className="formStyle formStyle--singnIn ">
                      <input  className="inputForm inputForm--signIn" type="text" name="title" placeholder="Title of the new deck" onChange={(e)=>{const {value,name}=e.target;setNewDeck({...newDeck,[name]:value})}}/>
                      <input type="button" className='btn btn--signUp' value="create" onClick={()=>createNewDeck()}/>
                      <input type="button" className='btn btn--signIn' value="cancel" onClick={()=>{setModalDecks(!modalDecks)}}/>
                  </form>
               </Modal.Body>
           </Modal>


           <Modal show={modalfc}>
              <Modal.Header>Add  new Flashcard</Modal.Header>
              <Modal.Body>
                <form className="formStyle formStyle--singnIn">
                     <div className="d-flex flex-column align-items-center" style={{padding:"5px"}}>
                        <Select title={"select a deck"} options={decks.map((elem)=>elem.title)} change={selectDeck} />
                        <Select title={"select word"} options={listWord.map((elem)=>elem.name)} change={selectWord}/>
                        <Select title={"select a meaning"} options={defWord.map((elem)=>elem.definition)} change={selectDef} disabled={actSelect}/>
                        <Select  title={"select a region"} options={["UK","USA"]} disabled={actSelect} change={selectRegion} />
                     </div>
                    <input type="button" className='btn btn--signUp' value="create" onClick={()=>createNewFlashcard()}/>
                    <input type="button" className='btn btn--signIn' value="cancel" onClick={()=>{setModalFC(!modalfc),setActSelect(true)}}/>
                </form>
              </Modal.Body>
          </Modal>  

                  {/*show the flashcards  */}
            <Games show={flash} type={""} hidden={changeFlash}>
                 
            </Games>
       </Games>

       <Button.cube on={changeGameWD}>dictation pronutation</Button.cube>
       <Games show={gameWD} type={'dictation/pronutation'} hidden={changeGameWD}/>
   </div>
   )   
}