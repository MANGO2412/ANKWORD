import {Component} from 'react'

export default class Modal extends Component{
   
  
    render(){
      const hidden=(e)=>{
         if(e.target===document.querySelector(".modal")){
            this.props.change()
         }
      }
     

        
      return(
            <div onClick={hidden} className={this.props.show?('modal show-modal'):('modal')}>
               <div className='modal-content'>{this.props.children}</div>
             </div>
          )
    }
}

Modal.Header=({children,change})=>(
   <div className='modal-header'>
      <span className='close-button' onClick={change}>&times;</span> 
      <h1 className='modal-tittle'>{children}</h1>
   </div>
)

Modal.Body=({children})=>(
  <dv>{children}</dv>
)