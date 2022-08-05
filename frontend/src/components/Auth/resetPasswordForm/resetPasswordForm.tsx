import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import TextInput from '@/components/UI/input/textInput';

import * as yup from 'yup'
import IFormikElements from '@/interfaces/IFormikAuth';
import { useAction } from "@/hooks/useAction";

interface Props {
  onSubmit: (values: IFormikElements, { setSubmitting }: any) => void
}

const resetPasswordForm = ({ onSubmit }: Props) => {

  const { setError } = useAction()

  const schema = yup.object({
    email: yup.string().required().email(),
  })

  const formikForm = useFormik({
    initialValues: {
      email: ''
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
      <button className="btn auth__btn" type="submit" disabled={!formikForm.dirty}>
        reset password
        {formikForm.isSubmitting}
      </button>
    </form>
  )
}

export default resetPasswordForm