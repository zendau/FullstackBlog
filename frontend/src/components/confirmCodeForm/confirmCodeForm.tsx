import { useFormik } from 'formik';
import React from 'react'
import TextInput from '../UI/input/textInput';

import * as yup from 'yup'

interface Props {
  onSubmit: (values: any, { setSubmitting }: any) => void
}

const confirmCodeForm = ({ onSubmit } : Props) => {

  const schema = yup.object({
    confirmCode: yup.string().required(),
  });
  
  const formikForm = useFormik({
    initialValues: {
      confirmCode: ''
    },
    onSubmit,
    validationSchema: schema
  })
  
  return (
    <form onSubmit={formikForm.handleSubmit}>
      <TextInput
        type="text"
        name="confirmCode"
        title="Confirm code"
        id="confirmCode"
        letters={36}
        value={formikForm.values.confirmCode}
        setValue={formikForm.handleChange}
      />


      <button className="btn auth__btn" type="submit">
        Confirm
      </button>
    </form>
  )
}

export default confirmCodeForm