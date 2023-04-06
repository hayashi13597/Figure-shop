import React, { useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './style.css'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerAsync } from './registerSlice';
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import * as Toastify from '../../utils/toastify';
import { loadUser } from '../../slice/authSlice'

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const user = useSelector((state: any) => state.authLogin.user);
  const isAuthenticated = useSelector((state: any) => state.authLogin.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [isAuthenticated])

  useEffect(() => {
    state === 'warning' && isAuthenticated === false &&
      Toastify.warningNotify("Hãy đăng nhập hoặc đăng ký trước khi thanh toán")
  }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email không được để trống").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email Không đúng định dạng"),
      password: Yup.string().required('Mật khẩu không được để trống').min(8, 'Mật khẩu có ít nhất 8 ký tự'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Mật khẩu không khớp nhau')
        .required('Không được để trống'),
    }),
    onSubmit(value) {
      if (!value) return;
      dispatch(registerAsync(value)).then(() => {
        setTimeout(() => {
          dispatch(loadUser())
        }, 2000)
      });
    }
  });
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="wrapperMain_content">
        <div className="layout-account">
          <div className="container">
            <div className="wrapbox-heading-account">
              <div className="header-page clearfix">
                <h1>Tạo tài khoản</h1>
              </div>
            </div>
            <div id="wrap-social-login-plus" />
            <div className="wrapbox-content-account">
              <div className="userbox customers_accountForm">
                <form id="create_customer" onSubmit={formik.handleSubmit}>
                  <label className='text-red-600'>{formik.errors.email}</label>
                  <div id="field-email" className="clearfix large_form ">
                    <input type="email" placeholder="Email" name="email" id="email" className="text" value={formik.values.email}
                      onChange={formik.handleChange} />
                  </div>
                  <div id="field-password" className="clearfix large_form">
                    <label className='text-red-600'>{formik.errors.password}</label>
                    <input type="password" placeholder="Mật khẩu" name="password" id="password" className="password text" value={formik.values.password}
                      onChange={formik.handleChange} />
                  </div>
                  <div id="field-password" className="clearfix large_form">
                    <label className='text-red-600'>{formik.errors.confirmPassword}</label>
                    <input type="password" placeholder="nhập lại mật khẩu" name="confirmPassword" id="confirm-password" className="password text" value={formik.values.confirmPassword}
                      onChange={formik.handleChange} />
                  </div>
                  <div className="clearfix large_form sitebox-recaptcha">
                    This site is protected by reCAPTCHA and the Google
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
                    and
                    <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>
                    apply.
                  </div>
                  <div className="clearfix custommer_account_action">
                    <div className="action_bottom button dark">
                      <input className="btn" type="submit" />
                    </div>
                  </div>
                  <div className="clearfix req_pass">
                    <a className="come-back" href="index.html"><FaLongArrowAltLeft /> Quay lại trang chủ</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Register