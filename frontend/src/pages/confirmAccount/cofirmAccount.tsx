import ConfirmCodeForm from '@/components/confirmCodeForm/confirmCodeForm'
import AlertMessage from '@/components/UI/Alert/Alert'
import { useAction } from '@/hooks/useAction'
import { useActivateAccountMutation, useLazyResendConfirmCodeQuery } from '@/redux/reducers/user/user.api'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "../auth/auth.scss"



const CofirmAccount = () => {

  const [resendConfirmCode] = useLazyResendConfirmCodeQuery()
  const [activateAccount, { isSuccess }] = useActivateAccountMutation()
  const { activate } = useAction()
  const { push} = useHistory()

  function onResendCode() {
    resendConfirmCode()
  }

  const formikSubmit = ({ confirmCode }: { confirmCode: string }) => {
    activateAccount({
      confirmCode
    })
  }

  useEffect(() => {
    if (isSuccess) {
      activate()
      push("/post/all")
    }
  }, [isSuccess])




  return (
    <section className="auth-container">
      <div className="auth__wrapper">
        <div className="auth__form-container">
          <AlertMessage timeout={5000} />
          <ConfirmCodeForm onSubmit={formikSubmit} />
          <button onClick={onResendCode}>Resend confirm code</button>
        </div>
      </div>
    </section>
  )
}

export default CofirmAccount