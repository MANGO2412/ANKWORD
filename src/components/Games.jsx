export default function Games({children,show,type,hidden}){
    /**
     * render html 
     */
    if(show){
        return(
            <div className="content">
              <h2 className="game__title">{type}  <span className="game__close" onClick={hidden}><img className="menu__icon" src='/img/cerrar.png'/></span></h2>
              <div className="modelGame">{children}</div>
            </div>
        )
    }
   
    return null;
}