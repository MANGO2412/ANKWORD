
export default function  Select({options,title,change,disabled}){ 
    const selectOpt=(e)=>{
        e.preventDefault()
        let customSelect=e.target.parentElement;
        customSelect.classList.toggle("active");

         e.target.setAttribute("aria-expanded",
            e.target.getAttribute("aria-expanded")==="true"?"false":"true"
          )
     
    }

    const listoptions=(e)=>{
        e.preventDefault()
       
        const selectedValue=e.target.parentElement.parentElement.firstChild.children[0];
        const customSelect=e.target.parentElement.parentElement;
 
        if(e.type==="click"  && e.clientX!==0 && e.clientY!==0){
             selectedValue.textContent=e.target.textContent
             customSelect.classList.remove("active")
             if(change !== undefined){
               change(e.target.textContent,e.target.getAttribute("value"))
             }
        }
        
       if(e.key==="Enter"){
           selectedValue.textContent=e.target.textContent
           customSelect.classList.remove("acitve");
        }
        
        
    }

    if(!disabled || disabled === undefined){
      return(
        <div className="custom-select">
            <button
               className="select-button"
               role="combobox"
               aria-labelledby="select a button"
               aria-haspopup="listbox"
               aria-expanded="false"
               aria-controls="select-dropdown"
               onClick={selectOpt}
            >
                <span className="selected-value">{title}</span>
                <span className="arrow"></span>
            </button>
            <ul className="select-dropdown">
                {options.map((elem,i)=>(
                  <li key={i} onClick={listoptions} onKeyUp={listoptions} value={i} role="option">{elem}</li>
                ))}
            </ul>
        </div>
      )
    }

    return (
      <div className="custom-select">
         <button
               className="select-button disabled"
               role="combobox"
               aria-labelledby="select a button"
               aria-haspopup="listbox"
               aria-expanded="false"
               aria-controls="select-dropdown"
            >
                <span className="selected-value">{title}</span>
                <span className="arrow"></span>
            </button>
      </div>
    )
    
}