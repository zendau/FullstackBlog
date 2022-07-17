import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

import "./Navbar.scss"


interface INavPaths {
  to: string
  name: string
}

interface INavbarProps {
  paths: INavPaths[]
  privateType: boolean
}


function createNavElement(path: INavPaths) {

  return (
    <NavLink key={path.to} className="navbar__item" activeClassName="navbar__item--active" to={path.to} >{path.name}</NavLink>
  )

}

const Navbar: React.FC<INavbarProps> = ({ paths, privateType }) => {

  const [menuStatus, setMenuStatus] = useState(false)


  return (
    <header>
      <nav className={menuStatus ? "navbar navbar--active" : "navbar"}>
        <div className={menuStatus ? "navbar__btn navbar__btn--open" : "navbar__btn"} onClick={() => setMenuStatus(!menuStatus)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="navbar__items">
          <div className="navbar__container">
            {paths.map(path => createNavElement(path))}
          </div>
          {privateType ? <NavLink className="navbar__item" activeClassName="navbar__item--active" to="/logout" >Exit</NavLink> : ""}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;