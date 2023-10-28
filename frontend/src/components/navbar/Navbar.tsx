import { useLogoutUserMutation } from "@/redux/reducers/user/user.api";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { publicPaths, privatePaths } from "./NavPaths";

import "./Navbar.scss";
import { useTypedSelector } from "@/hooks/useTypedSelector";

interface INavPaths {
  to: string;
  name: string;
}

interface INavbarProps {
  paths: INavPaths[];
  privateType: boolean;
}

function createNavElement(path: INavPaths) {
  return (
    <NavLink
      key={path.to}
      className={({ isActive }) =>
        ["navbar__item", isActive ? "navbar__item--active" : ""].join(" ")
      }
      to={path.to}
    >
      {path.name}
    </NavLink>
  );
}

const Navbar: React.FC = () => {
  const [menuStatus, setMenuStatus] = useState(false);

  const { isAuth } = useTypedSelector((state) => state.userState);

  console.log("isAuth", isAuth);

  const [logout, { isSuccess, isError }] = useLogoutUserMutation();

  const navigate = useNavigate();

  function userLogout() {
    logout();
  }

  useEffect(() => {
    if (isSuccess || isError) {
      navigate("/");
    }
  }, [isSuccess, isError]);

  const paths = isAuth ? privatePaths : publicPaths;

  return (
    <header>
      <nav className={menuStatus ? "navbar navbar--active" : "navbar"}>
        <div
          className={
            menuStatus ? "navbar__btn navbar__btn--open" : "navbar__btn"
          }
          onClick={() => setMenuStatus(!menuStatus)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="navbar__items">
          <div className="navbar__container">
            {paths.map((path) => createNavElement(path))}
          </div>
          {isAuth ? (
            <a className="navbar__item" onClick={userLogout}>
              Exit
            </a>
          ) : (
            ""
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
