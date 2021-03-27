import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Axios from "axios";

// import { signin } from '../actions/userActions';
// import MessageBox from '../components/MessageBox';
import "./Signup.css";

export default function SignupScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/signin";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error, success } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else if (password.length < 8) {
      alert("Your password must contain at least 8 characters.");
    } else if (!isNaN(password)) {
      console.log(parseInt(password));
      alert("Your password can’t be entirely numeric.");
    } else {
      dispatch(register(name, email, password));
    }
    // props.history.push(redirect);
    if (success) {
      props.history.push(redirect);
    }
  };

  // useEffect(() =>{
  //   alert(
  //   "Your password can’t be too similar to your other personal information. Your password must contain at least 8 characters. Your password can’t be a commonly used password.Your password can’t be entirely numeric.")
  // },[])
  return (
    <div className="signup-form">
      <form className="form" onSubmit={submitHandler}>
        <h4 className="modal-title">ĐĂNG KÍ </h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            required="required"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            required="required"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required="required"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            required="required"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div class="alert alert-info text-left" role="alert">
          Your password can’t be too similar to your other personal information <br></br>
          Your password must contain at least 8 characters<br></br>
          Your password can’t be entirely numeric<br></br>

        </div>
        <input
          type="submit"
          className="button btn-primary btn-block btn-lg "
          value="Đăng kí"
        />
      </form>

      <div className="text-center small">
        Đã có tài khoản? <Link to="signin">Đăng nhập</Link>
      </div>
    </div>
  );
}
