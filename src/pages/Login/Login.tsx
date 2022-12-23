import { useFormik } from 'formik'
import { LoginModel } from '../../Models/UserModel/UserModel'
import * as Yup from 'yup'
import './login.css'
import { toast } from 'react-toastify'
import { AppDispatch } from '../../redux/configureStore'
import { useDispatch } from 'react-redux'
import { loginApi } from '../../redux/userReducer/userReducer'
type Props = {}

const Login = (props: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const formik = useFormik<LoginModel>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required'),
      password: Yup.string()
       .required('Required'),
    }),
    onSubmit: (values) => {
      try {
        dispatch(loginApi(values))
        toast.success('Login successful')
        
      } catch (error) {
        toast.error('Something went wrong')
      }
    }
  })

  return (
      <div className="animated bounceInDown">
        <div className="container">
          <span className="error animated tada" id="msg" />
          <form name="form1" className="box" onSubmit={formik.handleSubmit}>
            <h4>Admin<span>Dashboard</span></h4>
            <h5>Sign in to your account.</h5>
            <div className='inputForm'>
              <input type="text" name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.email ?? <p className='errorMsg'>{formik.errors.email}</p>}
            </div>
            <div className='inputForm'>
              <input type="password" name="password" placeholder="Passsword" id="pwd" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.password ?? <p className='errorMsg'>{formik.errors.password}</p>}
            </div>
            <button type="submit" className="btn1">Submit</button>
          </form>
          <a href="#" className="dnthave">Don’t have an account? Sign up</a>
        </div>

      </div>

  )
}

export default Login