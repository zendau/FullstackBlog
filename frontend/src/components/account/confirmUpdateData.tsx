import React, { useState } from 'react';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useChangeUserDataContext } from "../../context/ChangeUserDataContext";
import { useAction } from "../../hooks/useAction";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";

const ConfirmUpdateData = () => {

  const { confirmCode, id, error } = useTypedSelector(state => state.user)

  const { newPassword, newEmail } = useChangeUserDataContext()

  const [code, setCode] = useState("")

  const { SendCodeForUpdateRequest } = useAction()

  function sendConfirmCode() {
    SendCodeForUpdateRequest(id, newEmail, newPassword, code)
  }

  return (

    <div className="account__confirm-code">

      <h2 className="account__title">Confirm code</h2>

      <ErrorMessage message={error} timeout={5000} />
      <form>
        <div className="textInput">
          <label htmlFor="confirmCode">Confirm code</label>
          <input type="text" id="confirmCode" placeholder="Confirm code" value={code} onChange={(e) => setCode(e.target.value)} />
          <p className="letters"><span>30</span> Characters remaining</p>
        </div>
        <input type="button" onClick={sendConfirmCode} className="btn account__btn" value="Confirm change user data" />
      </form>
    </div>
  );
};

export default ConfirmUpdateData;