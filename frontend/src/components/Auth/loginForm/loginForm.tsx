import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import TextInput from '@/components/UI/input/textInput';

import * as yup from 'yup'
import IFormikElements from '@/interfaces/formikElements';
import { useAction } from "@/hooks/useAction";
import { NavLink } from 'react-router-dom';

interface Props {
  onSubmit: (values: IFormikElements, { setSubmitting }: any) => void
}

const loginForm = ({ onSubmit }: Props) => {

  const { setError } = useAction()

  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })

  const formikForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit,
    validationSchema: schema
  })

  useEffect(() => {

    if (formikForm.isSubmitting && formikForm.errors) {

      const errors: string = Object.values(formikForm.errors).map((value) => `<span>${value}</span>`).join('')

      setError({
        message: errors,
        type: 'error'
      })
    }

  }, [formikForm.isSubmitting])
  return (
    <form onSubmit={formikForm.handleSubmit}>
      <TextInput
        type="email"
        name="email"
        title="Email"
        id="email"
        letters={30}
        value={formikForm.values.email}
        setValue={formikForm.handleChange}
      />
      <TextInput
        type="password"
        name="password"
        title="Password"
        id="pass"
        letters={40}
        value={formikForm.values.password}
        setValue={formikForm.handleChange}
      />

      <button className="btn auth__btn" type="submit" disabled={!formikForm.dirty}>
        Login
        {formikForm.isSubmitting}
      </button>
      <NavLink to='/forgot'>forgot password ?</NavLink>
    </form>
  )
}

export default loginForm