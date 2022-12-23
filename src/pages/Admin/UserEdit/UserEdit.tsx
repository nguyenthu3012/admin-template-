// library
import React, { useEffect, useState } from "react";
import {
  EmailOutlined,
  CalendarMonthOutlined,
  LocalPhoneOutlined,
  WcOutlined,
  Publish,
} from "@mui/icons-material";
import { Stack, Switch, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// model
import { UserModel } from "../../../Models/UserModel/UserModel";
// css
import "./userEdit.css";
import "react-datepicker/dist/react-datepicker.css";
// image
import profile from "../../../assets/imgs/profile.png";

// redux store
import { AppDispatch, RootState } from "../../../redux/configureStore";
import {
  getUserByIdApi,
  updateUserByIdApi,
} from "../../../redux/userReducer/userReducer";
import { validation } from "../../../util/validation/validation";
import TextField from "../../../components/Admin/TextField/TextField";

type Props = {};

const UserEdit = (props: Props) => {
  const { userDetail } = useSelector((state: RootState) => state.users);

  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const [toggle, setToogle] = useState(false)

  const formik = useFormik<UserModel>({
    initialValues: {
      id: Number(id),
      name: userDetail?.name!,
      email: userDetail?.email!,
      phone: userDetail?.phone!,
      birthday: userDetail?.birthday!,
      gender: true || userDetail?.gender,
      password: userDetail?.password!,
      role: userDetail?.role || 'USER',
      avatar: userDetail?.avatar!,
    },
    // reset the form if the wrapped component props change
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values) => {
      let check = values.role
      toggle ? check = 'ADMIN' : check = 'USER'
      values.role = check
      try {
        dispatch(updateUserByIdApi(values.id, values))
        toast.success('Update successful')
      } catch (error) {
        toast.error('Something went wrong')
      }
    },
  });

  useEffect(() => {
    dispatch(getUserByIdApi(Number(id)));
  }, [id]);

  useEffect(() => {
    dispatch(getUserByIdApi(Number(id)));
  }, []);
  return (
    <div className="user">
      <h1 className="userTitle">Edit User</h1>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              className="userShowImg"
              src={userDetail?.avatar ? userDetail.avatar : profile}
              alt=""
            />
            <div className="userShowTopTitle">
              <div className="userShowUsername">{userDetail?.name}</div>
              <div className="userShowUserId">
                <div className="titleWrap">
                  <span className="title">Id:</span> <span>{userDetail?.id}</span>
                </div>
                <div className="roleWrap">
                  <span className="role">Role: </span>
                  <span>{userDetail?.role}</span>

                </div>
              </div>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <CalendarMonthOutlined />
              <span className="userShowInfoTitle">
                <span className="title">BirthDay:</span> {userDetail?.birthday}
              </span>
            </div>
            <div className="userShowInfo">
              <WcOutlined />
              <span className="userShowInfoTitle">
                <span className="title">Gender: </span>{" "}
                {userDetail?.gender ? "Male" : "Female"}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>{" "}
            <div className="userShowInfo">
              <EmailOutlined />
              <span className="userShowInfoTitle">
                <span className="title">Email: </span>
                {userDetail?.email}
              </span>
            </div>
            <div className="userShowInfo">
              <LocalPhoneOutlined />
              <span className="userShowInfoTitle">
                <span className="title">Phone: </span>
                {userDetail?.phone}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form action="" className="userUpdateForm" onSubmit={formik.handleSubmit}>
            <div className="userUpdateLeft">
              <TextField
                classWrapperStyle={'userUpdateItem'}
                label='Email'
                classStyle={'userUpdateInput'}
                formikName='email'
                inputType='text'
                placeHolder='string@gmail.com'
                formikValue={formik.values.email}
                handleChange={formik.handleChange}
                formikError={formik.errors.email}
              />
              <TextField
                classWrapperStyle={'userUpdateItem'}
                label='Username'
                classStyle={'userUpdateInput'}
                formikName='name'
                inputType='text'
                placeHolder='Your name'
                formikValue={formik.values.name}
                handleChange={formik.handleChange}
                formikError={formik.errors.name}
              />
              <TextField
                classWrapperStyle={'userUpdateItem'}
                label='Password'
                classStyle={'userUpdateInput'}
                formikName='password'
                inputType='text'
                placeHolder='Password'
                formikValue={formik.values.password}
                handleChange={formik.handleChange}
                formikError={formik.errors.password}
              />
              <TextField
                classWrapperStyle={'userUpdateItem'}
                label='Phone Number'
                classStyle={'userUpdateInput'}
                formikName='phone'
                inputType='text'
                placeHolder='+89 012 231 3123'
                formikValue={formik.values.phone}
                handleChange={formik.handleChange}
                formikError={formik.errors.phone}
              />
              <TextField
                classWrapperStyle={'userUpdateItem'}
                label='Birthday'
                classStyle={'userUpdateInput'}
                formikName='birthday'
                inputType='date'
                formikValue={formik.values.birthday}
                handleChange={formik.handleChange}
                formikError={formik.errors.birthday}
              />
              <div className="userUpdateItem">
                <div className="userUpdateItemBottom">
                  <div className="genderLabel">Gender </div>
                    <TextField
                      label='Male'
                      formikName='gender'
                      inputType='radio'
                      classStyle={'form-check'}
                      formikValue={'true'}
                      handleChange={formik.handleChange}
                      defaultChecked
                    />
                     <TextField
                      label='Female'
                      formikName='gender'
                      classStyle={'form-check'}
                      inputType='radio'
                      formikValue={'false'}
                      handleChange={formik.handleChange}
                    />
                </div>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>USER</Typography>
                  <Switch
                    checked={toggle}
                    name='role'
                    value={formik.values.role}
                    onChange={(event) => {
                      setToogle(event.target.checked)

                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <Typography>ADMIN</Typography>
                </Stack>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={profile} alt="" />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button type="submit" className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
};

export default UserEdit;
