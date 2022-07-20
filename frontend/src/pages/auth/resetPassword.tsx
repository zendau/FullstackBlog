import React, { useState } from "react";
import { useTypedSelector } from "../../store/store";
import { useAction } from "../../hooks/useAction";
import { useAuthContext } from "../../context/AuthContext";
import ErrorMessage from "../../components/UI/Alert/Alert";
import RegisterForm from "../../components/Auth/registerForm/registerForm";
import ConfirmCodeForm from "../../components/confirmCodeForm/confirmCodeForm";

import "./auth.scss"
import IFormikElements from "../../interfaces/formikElements";
import { useHistory } from "react-router-dom";
import { useRegisterUserMutation } from "../../store/reducers/user/user.api";


const ResetPassword: React.FC = () => {

  const state = useTypedSelector(state => state.userState)

  const [isConfirmCode, setConfirmStatus] = useState(false)

  const { userAuth } = useAction()
  const { setAuthStatus } = useAuthContext()
  const { push } = useHistory()

  const [userRegister, { data, isError }] = useRegisterUserMutation()

  const formikSubmit = (values: IFormikElements, { setSubmitting }: any) => {
    console.log('isConfirmCode', isConfirmCode)
    userRegister({
      email: values.email, 
      password: values.password
    })
    if (isConfirmCode) {
      setSubmitting(false)
      userAuth(values.email, values.password, setAuthStatus, "login", push)
    } else {
      setConfirmStatus(true)
    }

  }

  return (
    <section className="auth-container">
      <div className="auth__wrapper">
        <div className="auth__form-container">
          <ErrorMessage message={state.error} timeout={5000} />
          {/* <ErrorMessage message={
              formikForm.errors.email && formikForm.touched.email && formikForm.errors.email ||
              formikForm.errors.password && formikForm.touched.password && formikForm.errors.password ||
              formikForm.errors.confirmPassword && formikForm.touched.confirmPassword && formikForm.errors.confirmPassword
            } timeout={5000} /> */}
          {
            isConfirmCode
              ? <ConfirmCodeForm onSubmit={formikSubmit} />
              : <RegisterForm onSubmit={formikSubmit} />
          }

        </div>
      </div>
    </section>
  )
}

export default ResetPassword