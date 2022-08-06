import React, { useState } from "react";
import AlertMessage from "@/components/UI/Alert/Alert";
import IFormikElements from "@/interfaces/IFormikAuth";
import { useResetPasswordMutation, useSetConfirmCodeMutation } from "@/redux/reducers/user/user.api";
import ConfirmCodeForm from "@/components/confirmCodeForm/confirmCodeForm";
import ResetPasswordForm from "@/components/Auth/resetPasswordForm/resetPasswordForm";
import "./auth.scss"


const ResetPassword: React.FC = () => {

  const [isConfirmCode, setConfirmStatus] = useState(false)

  const [resetPassword] = useResetPasswordMutation()
  const [confirmCode] = useSetConfirmCodeMutation()
  const [userEmail, setUserEmail] = useState<any>('')

  const submitResetPassword = (values: { email: string, confirmCode: string }) => {
    resetPassword({
      email: userEmail,
      confirmCode: values.confirmCode
    })
  }

  const submitConfirmCode = (values: IFormikElements) => {
    confirmCode({
      email: values.email
    })
    setUserEmail(values.email)
    setConfirmStatus(true)
  }

  return (
    <section className="auth-container">
      <div className="auth__wrapper">
        <div className="auth__form-container">
          <AlertMessage timeout={5000} />
          {
            isConfirmCode
              ? <ConfirmCodeForm onSubmit={submitResetPassword} />
              : <ResetPasswordForm onSubmit={submitConfirmCode} />
          }
        </div>
      </div>
    </section>
  )
}

export default ResetPassword