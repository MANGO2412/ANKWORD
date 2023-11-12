import {useState} from 'react'


//my components
import Modal from "../components/Modal"




export default function Login(){
     const [showModalForm,setShowModalForm]=useState(false)

      //handle modals
      const handleModalForm=()=>{
        setShowModalForm(!showModalForm)
      }

     return(
        <div>
          {/* modal */}
          <Modal show={showModalForm}>
             <Modal.Header>sign Up</Modal.Header>
             <Modal.Body>
                <form className="formStyle formStyle--singnIn"  style={{background:"none"}}>
                     <div className='d-flex justify-content-center'>
                       <input type='text'  style={{marginLeft:"10px"}} className='inputForm inputForm--signIn'  placeholder='First Name' />
                       <input type='text' style={{marginLeft:"10px"}} className='inputForm inputForm--signIn'  placeholder='Last Name'/>
                     </div>
                     <input type='text'  className='inputForm inputForm--signIn'  placeholder='Email'/>
                     <input type='text' className='inputForm inputForm--signIn'  placeholder='Password'/>
                     <input type="button" className='btn--small btn--signUp' value="Send" />
                     <input type="button" className='btn--small btn--signIn' value="cancel" onClick={()=>handleModalForm()}/>
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
                <input className="inputForm inputForm--login" type="text" placeholder="Email" />
                <input className="inputForm inputForm--login" type="password" placeholder="Password"/>
                <input className="btn btn--signUp" type="button" value="sign in "/>
                <input className="btn btn--signIn" onClick={()=>handleModalForm()}  type="button" value="sign up "/>
              </form>
           </section>
        </div>
    )
}