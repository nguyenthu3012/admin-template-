import { Stack, Switch, Typography, } from '@mui/material'
import { useFormik } from 'formik'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { UserModel } from '../../../Models/UserModel/UserModel'
import './userCreate.css'
import profile from "../../../assets/imgs/profile.png";
import {

  Publish,
} from "@mui/icons-material";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/configureStore'
import { getAllUserApi } from '../../../redux/userReducer/userReducer'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { createUserApi } from '../../../redux/userReducer/userReducer'
import { validation } from '../../../util/validation/validation'
import TextField from '../../../components/Admin/TextField/TextField'
type Props = {}
const UserCreate = (props: Props) => {
  const [toggle, setToggle] = useState(true)

  const dispatch: AppDispatch = useDispatch()
  const { users } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    dispatch(getAllUserApi())
  }, [])

  const handleToggle = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setToggle(event.target.checked);
  })

  const formik = useFormik<UserModel>({
    initialValues: {
      id: 0,
      name: '',
      email: '',
      phone: '',
      birthday: '',
      gender: true,
      password: '',
      role: 'USER',
      avatar: null,
    },
    // reset the form if the wrapped component props change
    validationSchema: validation,
    onSubmit: (values) => {
      try {
        let check = values.role
        toggle ? check = 'ADMIN' : check = 'USER'
        values.role = check

        const checkExistEmail = users.find(user => user.email === values.email)

        if (checkExistEmail) {
          toast.error('Email already exists')
        } else {
          dispatch(createUserApi(values))
          toast.success('New user added successfully')
        }

      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className='newUser'>
      <div className='newUserHeader'>
        <h1 className='newUserTitle'>New User</h1>

        <div className="userUpdateUpload">
          <img className="userUpdateImg" src={profile} alt="" />
          <label htmlFor="file">
            <Publish className="userUpdateIcon" />
          </label>
          <input type="file" id="file" style={{ display: "none" }} />
        </div>
      </div>
      <form action="" className='newUserForm' onSubmit={formik.handleSubmit}>
        <TextField
          classWrapperStyle={'newUserItem'}
          label='User ID'
          classStyle={'userUpdateInput'}
          formikName='id'
          inputType='number'
          formikValue={formik.values.id}
          handleChange={formik.handleChange}
          formikError={formik.errors.id}
          onBlur={formik.handleBlur}
          placeHolder='Id: 01'
        />
        <TextField
          classWrapperStyle={'newUserItem'}
          label='Username'
          classStyle={'userUpdateInput'}
          formikName='name'
          inputType='text'
          formikValue={formik.values.name}
          handleChange={formik.handleChange}
          formikError={formik.errors.name}
          onBlur={formik.handleBlur}
          placeHolder='Your name'
        />
        <TextField
          classWrapperStyle={'newUserItem'}
          label='Email'
          classStyle={'userUpdateInput'}
          formikName='email'
          inputType='email'
          formikValue={formik.values.email}
          handleChange={formik.handleChange}
          formikError={formik.errors.email}
          onBlur={formik.handleBlur}
          placeHolder='string@gmail.com'
        />
        <TextField
          classWrapperStyle={'newUserItem'}
          label='Phone Number'
          classStyle={'userUpdateInput'}
          formikName='phone'
          inputType='text'
          formikValue={formik.values.phone}
          handleChange={formik.handleChange}
          formikError={formik.errors.phone}
          onBlur={formik.handleBlur}
          placeHolder='+84 213 411 2415'
        />
        <TextField
          classWrapperStyle={'newUserItem'}
          label='Password'
          classStyle={'userUpdateInput'}
          formikName='password'
          inputType='password'
          formikValue={formik.values.password}
          handleChange={formik.handleChange}
          formikError={formik.errors.password}
          onBlur={formik.handleBlur}
          placeHolder='********'
        />
        <TextField
          classWrapperStyle={'newUserItem'}
          label='Birthday'
          classStyle={'userUpdateInput'}
          formikName='birthday'
          inputType='date'
          formikValue={formik.values.birthday}
          handleChange={formik.handleChange}
          onBlur={formik.handleBlur}
          formikError={formik.errors.birthday}
        />
        <div className="newUserItem">
          <label className="genderLabel">Gender </label>
          <div className="newUserGender">
            <TextField
              label='Male'
              formikName='gender'
              inputType='radio'
              formikValue={'true'}
              handleChange={formik.handleChange}
              defaultChecked
            />
            <TextField
              label='Female'
              formikName='gender'
              inputType='radio'
              formikValue={'false'}
              handleChange={formik.handleChange}

            />
          </div>
        </div>
        <div className="newUserItem">
          <label htmlFor="">Role</label>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>USER</Typography>
            <Switch
              checked={toggle}
              name='role'
              value={formik.values.role}
              onChange={handleToggle}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography>ADMIN</Typography>
          </Stack>
        </div>
        <div className='userButton'>
          <motion.button whileTap={{ scale: 1.1 }} type='submit' className='newUserButton'>Create</motion.button>

        </div>
      </form>
    </div>
  )
}

export default UserCreate