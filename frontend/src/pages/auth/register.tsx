import React, { useEffect, useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useAction } from "@/hooks/useAction";
import { useAuthContext } from "@/context/AuthContext";
import AlertMessage from "@/components/UI/Alert/Alert";
import RegisterForm from "@/components/Auth/registerForm/registerForm";
import ConfirmCodeForm from "@/components/confirmCodeForm/confirmCodeForm";

import "./auth.scss"
import IFormikElements from "@/interfaces/formikElements";
import { useHistory } from "react-router-dom";
import { useRegisterUserMutation } from "@/redux/reducers/user/user.api";


const Register: React.FC = () => {

  const state = useTypedSelector(state => state.userState)

  const [isConfirmCode, setConfirmStatus] = useState(false)

  const { setAuthStatus } = useAuthContext()
  const { push } = useHistory()

  const [userRegister, { data, isError, isSuccess }] = useRegisterUserMutation()

  useEffect(() => {
    if (isSuccess) {
      setAuthStatus(true)
      push("/account")
    }
  }, [isSuccess])

  const formikSubmit = (values: IFormikElements) => {
    userRegister({
      email: values.email,
      password: values.password
    })
  }

  return (
    <section className="auth-container">
      <div className="auth__wrapper">
        <div className="auth__form-container">
          <AlertMessage timeout={5000} />
          <RegisterForm onSubmit={formikSubmit} />
        </div>
      </div>
    </section>
  )
}

export default Register