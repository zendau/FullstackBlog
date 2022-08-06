import React, { useEffect } from 'react';
import { useAction } from "@/hooks/useAction";
import IFormikElements from '@/interfaces/IFormikAuth';
import * as yup from 'yup'
import { useFormik } from 'formik';
import TextInput from '@/components/UI/input/textInput';

interface Props {
  onSubmit: (values: IFormikElements, { setSubmitting }: any) => void
}

const ChangeUserData = ({ onSubmit }: Props) => {

  const { setError } = useAction()

  // const schema = yup.lazy((value) =>
  //   yup.object().shape({
  //     email: value.email?.length > 0 && yup.string().email(),
  //     password: value.password?.length > 0 && ,
  //     confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  //   })
  // );

  const schema = yup.object({
    email: yup.string().email(),
    password: yup.string().min(6),
    confirmPassword: yup.string().test('passwords-match', 'Passwords must match', function (value) { return this.parent.password === value })
  });

  const formikForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit,
    validationSchema: schema
  })

  useEffect(() => {

    if (formikForm.isSubmitting && formikForm.errors) {
      console.log(formikForm)
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
        letters={30}
        value={formikForm.values.password}
        setValue={formikForm.handleChange}
      />
      <TextInput
        type="password"
        name="confirmPassword"
        title="Confirm password"
        id="confirmPass"
        letters={30}
        value={formikForm.values.confirmPassword}
        setValue={formikForm.handleChange}
      />


      <button className="btn account__btn" type="submit" disabled={!formikForm.dirty}>
        Change user data
        {formikForm.isSubmitting}
      </button>
    </form>

  );
};

export default ChangeUserData;