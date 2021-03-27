import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      setStatus('Buổi sáng tốt lành')
    } else if (currentTime.getHours() >= 13 && currentTime.getHours() <= 18) {
      setStatus('Chào buổi chiều')
    } else {
      setStatus('Chào buổi tối')
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
        <Link to="/" class="navbar-brand">Hệ thống gợi ý tin tức cá nhân hoá PNRec</Link>
        <ul class="nav navbar-nav navbar-right flex-row">
        { userInfo ? (
          <div className = "login pl-2 mt-1 d-flex flex-column">
          <p className='h6 mb-0'><small><Link to="/profile" className='font-weight-normal text-decoration-none ' style={{fontSize :'10 px'}}>{status } {userInfo.username}  </Link></small></p>
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