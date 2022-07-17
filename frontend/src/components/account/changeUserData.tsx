import React, { FormEvent, useEffect, useState } from 'react';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAction } from "../../hooks/useAction";
import { useChangeUserDataContext } from "../../context/ChangeUserDataContext";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";

interface IChangeUserData {
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}


const ChangeUserData: React.FC<IChangeUserData> = ({ setStatus }) => {

  const { email, id, error } = useTypedSelector(state => state.user)

  const [userEmail, setUserEmail] = useState(email)

  useEffect(() => {
    setUserEmail(email)
  }, [email])

  const { userDataUpdateRequest } = useAction()

  const { setNewEmail, newPassword, setNewPassword } = useChangeUserDataContext()


  function sendReqToUpdateData(event: FormEvent) {
    event.preventDefault()
    userDataUpdateRequest(id, userEmail)
    setNewEmail(userEmail)
    setStatus(false)
  }

  return (

    <div className="account__change-data-container">

      <h2 className="account__title">Change user email and password</h2>

      <ErrorMessage message={error} timeout={5000} />

      <form>
        <div className="textInput">
          <label htmlFor="newEmail">Email</label>
          <input type="text" id="newEmail" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
          <p className="letters"><span>30</span> Characters remaining</p>
        </div>

        <div className="textInput">
          <label htmlFor="newPass">Password</label>
          <input type="text" id="newPass" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <p className="letters"><span>30</span> Characters remaining</p>
        </div>

        <input type="button" className="btn account__btn" onClick={sendReqToUpdateData} value="Change user data" />

      </form>

    </div>

  );
};

export default ChangeUserData;