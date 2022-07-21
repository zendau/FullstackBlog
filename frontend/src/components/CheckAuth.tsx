import React, { useEffect } from 'react';
import { useAction } from "../hooks/useAction";
import { useAuthContext } from "../context/AuthContext";
import jwt from 'jwt-decode'



const CheckAuth: React.FC = ({ children }) => {

  const { checkAuth } = useAction()

 // const { setAuthStatus } = useAuthContext()


  useEffect(() => {

    

    // const accessToken = localStorage.getItem('token')

    // if (accessToken) {
      
    //   let tokenDecode = null

    //   try {
    //       tokenDecode = jwt(accessToken)
    //       setAuthStatus(true)
    //   } catch {
    //     setAuthStatus(false)
    //       // const resRefresh = await $api.get('/user/refresh')
      
    //       // if (resRefresh.data.statusCode === 401) return

    //       // const accessToken = resRefresh.data.accessToken
    //       // localStorage.setItem('token', accessToken)
    //       // tokenDecode = jwt_decode(accessToken)
    //   } 
    //   // finally {
    //   //     if (tokenDecode !== null) {
    //   //         commit('authSuccess', tokenDecode)
    //   //     }
          
    //   // }

  }, [])


  return (
    <>
      {children}
    </>
  );
};

export default CheckAuth;