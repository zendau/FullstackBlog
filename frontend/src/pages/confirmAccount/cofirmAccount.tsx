import ConfirmCodeForm from '@/components/confirmCodeForm/confirmCodeForm'
import AlertMessage from '@/components/UI/Alert/Alert'
import { useAction } from '@/hooks/useAction'
import { useActivateAccountMutation, useLazyResendConfirmCodeQuery } from '@/redux/reducers/user/user.api'
import React, { useEffect } from 'react'
import "../auth/auth.scss"


type Props = {}

const CofirmAccount = (props: Props) => {

  const [resendConfirmCode] = useLazyResendConfirmCodeQuery()
  const [activateAccount, { data, isSuccess }] = useActivateAccountMutation()
  const { activate } = useAction()

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