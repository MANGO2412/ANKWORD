import React from 'react';

const  Spinner=()=>{
     return(
        <div className='spinner-container'>
          <div className='loading-spinner'></div>
        </div>
     )
}

Spinner.small=()=>{
   return(
      <div className='spinner-container'>
        <div className='loading-spinner loading-spinner--small'></div>
      </div>
   )
}

export default Spinner;

