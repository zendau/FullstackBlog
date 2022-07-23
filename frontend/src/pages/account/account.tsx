import React, { useEffect, useState } from 'react'
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useAction } from "../../hooks/useAction"
import { Link } from "react-router-dom"
import ChangeUserData from "../../components/account/changeUserData";
import ConfirmUpdateData from "../../components/account/confirmUpdateData";
import { ChangeUserDataContext } from "../../context/ChangeUserDataContext"

import "./account.scss"

const Account: React.FC = () => {

  const state = useTypedSelector(state => state.userState)


  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const [changeDataStatus, setChangeDataStatus] = useState(true)

  return (
    <ChangeUserDataContext.Provider value={{ newEmail, setNewEmail, newPassword, setNewPassword }}>

      <section className="account-container">
        <div className="account__wrapper">
          <h1 className="account__main-title">{state.email}'s account</h1>
          <h2 className="account__status">Your account is {state.isActivate ? "activated" : "not activated"}</h2>
          <Link className="btn account__get-posts" to={`/user/${state.id}`}>Get only my posts</Link>

          {
            changeDataStatus ?
              <ChangeUserData setStatus={setChangeDataStatus} /> :
              <ConfirmUpdateData />
          }

        </div>
      </section>
    </ChangeUserDataContext.Provider>

  )
}

export default Account;