import {Component} from 'react'

export default class Modal extends Component{

    render(){
        if(this.props.show){
            return(
                <div className='modal fade'>
                   <div className='modal--card'>
                      <div className='modal--content'>{this.props.children}</div>
                   </div>
                </div>
                )
        }

        return null;
        
    }
}



Modal.Header=({children})=>(<div className='modal--header'>{children}</div>)

Modal.Body=({children})=>(<div className='modal--body'>{children}</div>)

Modal.Footer=({children})=>(<div className='modal--footer'>{children}</div>)