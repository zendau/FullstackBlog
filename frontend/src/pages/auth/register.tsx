import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAction } from "../../hooks/useAction";
import { useAuthContext } from "../../context/AuthContext";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";


import "./auth.scss"
import TextInput from "../../components/UI/input/textInput";
import IFormikElements from "../../interfaces/formikElements";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";



const Register: React.FC = () => {

  const state = useTypedSelector(state => state.user)


  const { userAuth } = useAction()


  const { setAuthStatus } = useAuthContext()

  const { push } = useHistory()


  const formikValidate = (values: IFormikElements) => {
    const errors: IFormikElements = {}
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!values.password) {
      errors.password = 'Password is required';
    } else if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    } else if (values.password !== values.confirmPassword) {
      errors.password = "Passwords are not the same"
    }
    return errors;
  }

  const formikSubmit = (values: IFormikElements, { setSubmitting }: any) => {
    console.log(values, setSubmitting)
    setSubmitting(false)
    userAuth(values.email, values.password, setAuthStatus, "registration", push)
  }

  return (
    <section className="auth-container">
      <div className="auth__wrapper">
        <div className="auth__form-container">
          <ErrorMessage message={state.error} timeout={5000} />
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: "" }}
            validate={formikValidate}
            onSubmit={formikSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,

            }) => (
              <form onSubmit={handleSubmit}>
                <ErrorMessage message={
                  errors.email && touched.email && errors.email ||
                  errors.password && touched.password && errors.password ||
                  errors.confirmPassword && touched.confirmPassword && errors.confirmPassword
                } timeout={5000} />
                <TextInput
                  type="email"
                  name="email"
                  title="Email"
                  id="email"
                  letters={30}
                  value={values.email}
                  setValue={handleChange}
                />
                <TextInput
                  type="password"
                  name="password"
                  title="Password"
                  id="pass"
                  letters={30}
                  value={values.password}
                  setValue={handleChange}
                />
                <TextInput
                  type="password"
                  name="confirmPassword"
                  title="Confirm password"
                  id="confirmPass"
                  letters={30}
                  value={values.confirmPassword}
                  setValue={handleChange}
                />


                <button className="btn auth__btn" type="submit" disabled={isSubmitting}>
                  Register
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  )
}

export default Register