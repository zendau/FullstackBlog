import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAction } from "../../hooks/useAction";
import { useAuthContext } from "../../context/AuthContext";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";

import "./auth.scss"
import TextInput from "../../components/UI/input/textInput";
import { useHistory } from "react-router-dom";

import { useFormik } from 'formik';
import IFormikElements from "../../interfaces/formikElements";

import * as yup from 'yup'

const Login: React.FC = () => {

  const state = useTypedSelector(state => state.user)

  const { userAuth } = useAction()

  const { setAuthStatus } = useAuthContext()
  const { push } = useHistory()

  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  });


  const formikSubmit = (values: IFormikElements, { setSubmitting }: any) => {
    setSubmitting(false)
    userAuth(values.email, values.password, setAuthStatus, "login", push)
  }

  const formikForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: formikSubmit,
    validationSchema: schema
  })

  return (
    <section className="auth-container">
      <div className="auth__wrapper">
        <div className="auth__form-container">
          <ErrorMessage message={state.error} timeout={5000} />
          <ErrorMessage message={
              formikForm.errors.email && formikForm.touched.email && formikForm.errors.email ||
              formikForm.errors.password && formikForm.touched.password && formikForm.errors.password
            } timeout={5000} />
          <form onSubmit={formikForm.handleSubmit}>
            
            <TextInput
              type="email"
              name="email"
              title="Email"
              id="email"
              letters={30}
              setValue={formikForm.handleChange}
              value={formikForm.values.email}
            />
            <TextInput
              type="password"
              name="password"
              title="Password"
              id="pass"
              letters={30}
              setValue={formikForm.handleChange}
              value={formikForm.values.password}
            />
            <button className="btn auth__btn" type="submit" disabled={formikForm.isSubmitting}>
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login