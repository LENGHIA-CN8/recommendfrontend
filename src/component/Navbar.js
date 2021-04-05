import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { signout } from '../actions/userActions';
import Avatar from 'react-avatar'

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
    dispatch(signout(userInfo.userID));
  };
  return (
    <div>
    <nav class="navbar navbar-light bg-light ">
        <Link to="/" class="navbar-brand">Hệ thống gợi ý tin tức cá nhân hoá PNRec</Link>
        <ul class="nav navbar-nav navbar-right flex-row">
        { userInfo ? (
          <>
          <div className = "login pl-2 mt-3 d-flex flex-column d-none d-md-block">
          <p className='mb-0 d-none d-md-block'><Link to="/profile" className='font-weight-normal text-decoration-none text-info' style={{fontSize :'50 px'}}>{status} {userInfo.username}  </Link></p>
          </div > 
          <div className='drop'>
          <Link to="/profile" className='text-decoration-none text-info' ><Avatar facebookId="100008343750912" name={userInfo.username} size="45" round={true} className='mt-md-1 ml-1 mb-1 pt-sm-1 pb-sm-1 pt-md-0 pb-md-1 px-0'/></Link>
          <Link to="#signout" onClick={signoutHandler} style = {{right : "0"}} className='text-secondary text-decoration-none dropdown-content bg-light mr-1 py-1 pl-2 text-left'>
            <small>Đăng Xuất</small>  
          </Link>
          </div>
          </>

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