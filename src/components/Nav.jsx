import { useAuth } from "../auth/useAuth";
export default function Nav(){
    const {logout}=useAuth();


    const showSubList=()=>{
     document.getElementById("contener").classList.toggle('disabled')
    }
    return(
        <nav className="menu">
            <h1 className="header">ANKWORD</h1>
            <ul className="menu__list">
                <li className="menu__item"><a href="/home"><img className="menu__icon"  src="/img/diccionario.png" alt="" /></a></li>
                <li className="menu__item"><a href="/game"><img className="menu__icon" src="/img/block.png"/></a></li>
                <li className="menu__item"><a href="/glossary"><img className="menu__icon" src="/img/list.png"/></a></li>
            </ul>
            <div>
                <img  className="menu__icon"  src="/img/usuario.png" alt="" onClick={()=>{showSubList()}}/>
                <div id="contener" className="menu__subcontener disabled">
                  <ul className="menu__sublist">
                      <li className="menu__item--sub"><a href="/perfil">perfil</a></li>
                      <li className="menu__item--sub"  onClick={logout}>logout</li>
                  </ul>
                </div>
            </div>
        </nav>
    )
}