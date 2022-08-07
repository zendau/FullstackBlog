import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AlertMessage from "@/components/UI/Alert/Alert";
import RegisterForm from "@/components/Auth/registerForm/registerForm";
import IFormikElements from "@/interfaces/IFormikAuth";
import { useRegisterUserMutation } from "@/redux/reducers/user/user.api";
import "./auth.scss"


const Register: React.FC = () => {

  const { push } = useHistory()
  const [userRegister, { isSuccess }] = useRegisterUserMutation()

  useEffect(() => {
    if (isSuccess) {
      push("/post/all")
    }
  }, [isSuccess])

  const formikSubmit = (values: IFormikElements) => {
    userRegister({
      email: values.email,
      password: values.password as string
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