import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";
import {useState} from 'react'
export default function Nav(){
    const {logout}=useAuth();
    const [showMenu,setShowMenu]=useState(false)

    const showSubList=()=>{
     document.getElementById("contener").classList.toggle('disabled')
    }
    
    const switchOpen=()=>setShowMenu(!showMenu);

    return(
        <nav className="menu">
             <div className="menu__hamburguer">
               <img className="menu__icon" onClick={switchOpen} src="/img/menu.png" alt="este es el icon del menu"/>
            </div>
            <h1 className="header">ANKWORD</h1>
             {/* add the icon menu  */}
            <ul className={showMenu?"menu__list open":"menu__list"}>
                <li className="menu__close"><img className="menu__icon" onClick={switchOpen} src='/img/cerrar.png'/></li>
                <li className="menu__item"> <Link to="Home"><img className="menu__icon"  src="/img/diccionario.png" alt="" />  <span className="menu__text">Inicio</span></Link> </li>
                <li className="menu__item"><Link to="Game"><img className="menu__icon" src="/img/block.png"/> <span className="menu__text">Seccion de estudio</span></Link></li>
                <li className="menu__item"><Link to="Glossary"><img className="menu__icon" src="/img/list.png"/>  <span className="menu__text">Lista de palabras</span></Link></li>
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