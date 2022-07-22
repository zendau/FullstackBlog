import React, { useEffect } from "react";
import AlertMessage from "@/components/UI/Alert/Alert";
import RegisterForm from "@/components/Auth/registerForm/registerForm";
import "./auth.scss"
import IFormikElements from "@/interfaces/formikElements";
import { useHistory } from "react-router-dom";
import { useRegisterUserMutation } from "@/redux/reducers/user/user.api";


const Register: React.FC = () => {

  const { push } = useHistory()
  const [userRegister, { isSuccess }] = useRegisterUserMutation()

  useEffect(() => {
    if (isSuccess) {
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