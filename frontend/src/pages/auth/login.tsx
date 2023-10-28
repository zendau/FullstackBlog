import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "@/components/UI/Alert/Alert";
import LoginForm from "@/components/Auth/loginForm/loginForm";
import IFormikElements from "@/interfaces/IFormikAuth";
import { useLoginUserMutation } from "@/redux/reducers/user/user.api";
import "./auth.scss"



const Login: React.FC = () => {

  const navigate = useNavigate()
  const [userLogin, { isSuccess }] = useLoginUserMutation()
  useEffect(() => {
    if (isSuccess) {
      navigate("/account")
    }
  }, [isSuccess])

  const formikSubmit = (values: IFormikElements) => {
    userLogin({
      email: values.email,
      password: values.password as string
    })
  }


  return (
    <section className="auth-container">
      <div className="auth__wrapper">
        <div className="auth__form-container">
          <AlertMessage timeout={5000} />
          <LoginForm onSubmit={formikSubmit} />
        </div>
      </div>
    </section>
  )
}

export default Login