import React, {useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {useAuthContext} from "../../context/AuthContext";
import ErrorMessage from "../../components/UI/ErrorMessage";

import "./auth.scss"
import TextInput from "../../components/UI/textInput";



const Login : React.FC = () => {

    const state = useTypedSelector(state => state.user)


    const {userAuth} = useAction()


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {setAuthStatus} =  useAuthContext()



    const sendLoginData = (type: string) => {
        userAuth(email, password, setAuthStatus, type)
    }

    return (
        <section className="auth-container">
            <div className="auth__wrapper">
                <div className="auth__form-container">
                    <ErrorMessage message={state.error} timeout={5000} />
                    <form>
                        <TextInput
                            title="Email"
                            id="email"
                            letters={30}
                            value={email}
                            setValue={setEmail}
                        />
                        <TextInput
                             title="Password"
                             id="pass"
                             letters={30}
                             value={password}
                             setValue={setPassword}
                        />

                        <input
                            type="button"
                            onClick={() => sendLoginData("login")}
                            className="btn auth__btn"
                            value="Login"/>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default  Login