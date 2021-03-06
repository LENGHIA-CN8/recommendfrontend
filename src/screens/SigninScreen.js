import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
// import MessageBox from '../components/MessageBox';
import './Signin.css'

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className="login-form">    
    <form className='form' onSubmit={submitHandler}>
    	<h4 className="modal-title">ĐĂNG NHẬP</h4>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Username" required="required" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-group small clearfix">
            <label className="checkbox-inline"><input type="checkbox" /> Remember me </label>
            <a href="#" className="forgot-link">Quên mật khẩu?</a>
        </div> 
        <input type="submit" className="button btn-primary btn-block btn-lg " value="Đăng nhập" />              
    </form>			
    <div className="text-center small">Chưa có tài khoản? <Link to='signup'>Đăng kí</Link></div>
</div>
  );
}
