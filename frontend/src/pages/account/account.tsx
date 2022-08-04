import React, { useEffect, useState } from 'react'
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useAction } from "../../hooks/useAction"
import { Link } from "react-router-dom"
import ChangeUserData from "../../components/account/changeUserData";
import AlertMessage from "@/components/UI/Alert/Alert";
import ConfirmCodeForm from "@/components/confirmCodeForm/confirmCodeForm"
import "./account.scss"
import { IUser } from '@/interfaces/IUser';
import IFormikElements from '@/interfaces/formikElements';
import { useEditUserDataMutation, useSetConfirmCodeMutation } from '@/redux/reducers/user/user.api';

const Account: React.FC = () => {

  const state = useTypedSelector(state => state.userState)

  const [isConfirmCode, setConfirmStatus] = useState(false)

  const [editUser] = useEditUserDataMutation()
  const [confirmCode] = useSetConfirmCodeMutation()

  const [editUserData, setEditUserData] = useState<any>(null)

   // TODO: добавить тип
   const submitEditData = (values: any, { setSubmitting }: any) => {
  
    editUser({
      ...(editUserData.email && { newEmail: editUserData.email }),
      ...(editUserData.password && { newPassword: editUserData.password }),
      userId: state.id,
      code: values.confirmCode
    })
  }

  // TODO: добавить тип
  const submitConfirmCode = (values: IFormikElements, { setSubmitting }: any) => {
    
    confirmCode({
      email: state.email
    })
    debugger
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