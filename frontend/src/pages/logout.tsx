import React, { useEffect } from 'react';
import { useAuthContext } from "../context/AuthContext";
import { useAction } from "../hooks/useAction";
import { useHistory } from "react-router-dom";

const Logout: React.FC = () => {



  const { setAuthStatus } = useAuthContext()
  const history = useHistory()

  const { logout: logoutUser, clearPostStore } = useAction()

  useEffect(() => {
    console.log("test")
    logoutUser(clearPostStore)
    setAuthStatus(false)
    history.push("/")
  }, [])


  return (
    <div>

    </div>
  );
};

export default Logout;