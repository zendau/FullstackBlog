import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import ChangeUserData from "@/components/account/changeUserData";
import AlertMessage from "@/components/UI/Alert/Alert";
import ConfirmCodeForm from "@/components/confirmCodeForm/confirmCodeForm"
import IFormikElements from '@/interfaces/IFormikAuth';
import { useEditUserDataMutation, useSetConfirmCodeMutation } from '@/redux/reducers/user/user.api';
import "./account.scss"

const Account: React.FC = () => {

  const state = useTypedSelector(state => state.userState)

  const [isConfirmCode, setConfirmStatus] = useState(false)

  const [editUser] = useEditUserDataMutation()
  const [confirmCode] = useSetConfirmCodeMutation()

  const [editUserData, setEditUserData] = useState<any>(null)

   const submitEditData = (values: { confirmCode: string }) => {
  
    editUser({
      ...(editUserData.email && { newEmail: editUserData.email }),
      ...(editUserData.password && { newPassword: editUserData.password }),
      userId: state.id,
      code: values.confirmCode
    })
  }

  const submitConfirmCode = (values: IFormikElements) => {
    
    confirmCode({
      email: state.email
    })
    setEditUserData({
      email: values.email,
      password: values.password
    })
    setConfirmStatus(true)
  }

  return (
    <section className="account-container">
      <div className="account__wrapper">
        <h1 className="account__main-title">{state.email}'s account</h1>
        <h2 className="account__status">Your account is {state.isActivated ? "activated" : "not activated"}</h2>
        <Link className="btn account__get-posts" to={`/user/${state.id}`}>Get only my posts</Link>
        <div className="account__change-data-container">
          <h2 className="account__title">Change user email and password</h2>
          <AlertMessage timeout={5000} />
          {
            isConfirmCode
              ? <ConfirmCodeForm onSubmit={submitEditData} />
              : <ChangeUserData onSubmit={submitConfirmCode} />
          }
        </div>
      </div>
    </section>
  )
}

export default Account;