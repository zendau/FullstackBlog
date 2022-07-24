import React, { useEffect, useState } from "react";
import AlertMessage from "@/components/UI/Alert/Alert";
import "./auth.scss"
import { useHistory } from "react-router-dom";
import IFormikElements from "@/interfaces/formikElements";
import { useResetPasswordMutation, useSetConfirmCodeMutation } from "@/redux/reducers/user/user.api";
import ConfirmCodeForm from "@/components/confirmCodeForm/confirmCodeForm";
import ResetPasswordForm from "@/components/Auth/resetPasswordForm/resetPasswordForm";


const ResetPassword: React.FC = () => {

  const [isConfirmCode, setConfirmStatus] = useState(false)

  const [resetPassword] = useResetPasswordMutation()
  const [confirmCode] = useSetConfirmCodeMutation()
  const [userEmail, setUserEmail] = useState<any>('')

  // TODO: добавить тип
  const submitResetPassword = (values: any, { setSubmitting }: any) => {
    resetPassword({
      email: userEmail,
      confirmCode: values.confirmCode
    })
  }

  // TODO: добавить тип
  const submitConfirmCode = (values: IFormikElements, { setSubmitting }: any) => {
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