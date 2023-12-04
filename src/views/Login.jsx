import {useState} from 'react'
import axios from 'axios'
import { useAuth } from '../auth/useAuth'
//my components
import Modal from "../components/Modal"

export default function Login(){
    const {login}=useAuth()
     //variable is used in this component
     const url=import.meta.env.VITE_API_URL
     //state variables are used in this component
     const [showModalForm,setShowModalForm]=useState(false)
     const [newUser,setNewUser]=useState({
      picture:'user.jpg'
     })
     const [logUser,setLogUser]=useState()

    
    //that function is used to handle open or close of a form modal
    const handleModalForm=()=>{
        setShowModalForm(!showModalForm)
    }
   //that function is used to change state variable newuser from the inputs
    const handleInsertInput=(e)=>{
      const {name,value}=e.target
        setNewUser({
          ...newUser,
          [name]:value.trim()
        })
    }
    
    const handleLogInput=(e)=>{
      const {name,value}=e.target;
      setLogUser({
        ...logUser,
        [name]:value.trim()
      })
    }
    //that function  is  used for established connection with the api to add a new user
    const insertUser= async ()=>{
        console.log(newUser)
            try {
              const resp=await axios.post(url+'/auth/Signin',newUser);
              if(resp.status==200){
                alert(resp.data.message)
                handleModalForm();
              }
            } catch (e) {
              console.error(e)
              alert("happenend a wrong, ")
            }
    }


     return(
        <div>
          {/* modal */}
          <Modal show={showModalForm}>
             <Modal.Header>sign Up</Modal.Header>
             <Modal.Body>
                <form className="formStyle formStyle--singnIn"  style={{background:"none",boxShadow:'none'}}>
                     <div className='d-flex justify-content-center'>
                       <input name='firstname' type='text'  style={{marginLeft:"10px"}} className='inputForm inputForm--signIn'  placeholder='First Name' onChange={handleInsertInput} />
                       <input name='lastname' type='text' style={{marginLeft:"10px"}} className='inputForm inputForm--signIn'  placeholder='Last Name' onChange={handleInsertInput}/>
                       <input name='age' type='number' style={{marginLeft:"10px"}} className='inputForm inputForm--signIn'  min={1} placeholder='Age' onChange={handleInsertInput}/>
                     </div>
                     <input name='username' type='text'  className='inputForm inputForm--signIn'  placeholder='username' onChange={handleInsertInput}/>
                     <input name='phone'    type='text'  className='inputForm inputForm--signIn'  placeholder='phone' onChange={handleInsertInput}/>
                     <input name='email' type='text'  className='inputForm inputForm--signIn'  placeholder='Email' onChange={handleInsertInput}/>
                     <input name='password' type='password' className='inputForm inputForm--signIn'  placeholder='Password' onChange={handleInsertInput}/>
                     <input type="button" className='btn btn--signUp' value="Send"  onClick={insertUser}/>
                     <input type="button" className='btn btn--signIn' value="cancel" onClick={()=>handleModalForm()}/>
                </form>
             </Modal.Body>
          </Modal>

          <h1 className="header header--center">ANKWORD</h1>
           <section className="main_div">
              <p className="main_description">
                This web application is used to help at beginner  people to improve their vocabulary in English 
                language with a interesting and entertainment video game system
              </p>
              <form className="formStyle formStyle--login">
                <input className="inputForm inputForm--login" name='email' type="text" placeholder="Email"  onChange={handleLogInput}/>
                <input className="inputForm inputForm--login" name='password' type="password" placeholder="Password" onChange={handleLogInput}/>
                <input className="btn btn--signUp" onClick={()=>{login(logUser)}}      style={{marginTop:"50px"}} type="button" value="sign in "/>
                <input className="btn btn--signIn" onClick={()=>handleModalForm()}  type="button" value="sign up "/>
              </form>
           </section>
        </div>
    )
}