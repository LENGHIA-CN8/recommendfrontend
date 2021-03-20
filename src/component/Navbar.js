import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { signout } from '../actions/userActions';

export default function Navbar(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [currentTime,setCurrentTime] = useState(new Date())
  const [status,setStatus] = useState('Chao')
  
  useEffect(() =>{
    if(currentTime.getHours() >= 0 && currentTime.getHours() <= 12) {
      setStatus('Chào buổi sáng')
    } else if (currentTime.getHours() >= 13 && currentTime.getHours() <= 18) {
      setStatus('Chào buồi chiều')
    } else {
      setStatus('Chào buồi tối')
    }
    var timerID = setInterval( () => tick(), 1000 );
    // return function cleanup() {
    //   clearInterval(timerID);
    // }; 
   },[currentTime.getHours()])
    function tick() {
      setCurrentTime(new Date());
     }
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <div>
    <nav class="navbar navbar-light bg-light ">
        <Link to="/" class="navbar-brand">RecommendationNews</Link>
        <ul class="nav navbar-nav navbar-right flex-row">
        { userInfo ? (
          <div className = "login pl-2 d-flex flex-column">
          <Link to="/profile" className='font-weight-bold text-decoration-none'><small> {status } {userInfo.username} </small></Link>
          <Link to="#signout" onClick={signoutHandler} style = {{color : "red"}} className='text-decoration-none'>
            <small>Thoát</small>  
          </Link>
          </div> 
        ) : (
          <li className='pl-2 py-2 my-2'>
          <Link to="/signin">
            <BsPerson size={24}/>
          </Link>
          </li>
        )
        }
        </ul>
    </nav>
    </div>
  );
}