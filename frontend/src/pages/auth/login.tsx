import React, { useEffect } from "react";
import AlertMessage from "@/components/UI/Alert/Alert";
import "./auth.scss"
import LoginForm from "@/components/Auth/loginForm/loginForm";
import { useHistory } from "react-router-dom";
import IFormikElements from "@/interfaces/formikElements";
import { useLoginUserMutation } from "@/redux/reducers/user/user.api";



const Login: React.FC = () => {

  const { push } = useHistory()
  const [userLogin, { isSuccess }] = useLoginUserMutation()

  useEffect(() => {
    if (isSuccess) {
      push("/account")
    }
  }, [isSuccess])

  const formikSubmit = (values: IFormikElements) => {
    userLogin({
      email: values.email,
      password: values.password
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