import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import Axios from 'axios';

// import { signin } from '../actions/userActions';
// import MessageBox from '../components/MessageBox';
import './Signup.css'

export default function SignupScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [categorylist,setCategory] = useState([]);
    const [catergory_favorite,setFavorite] = useState();
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/category/favorite';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert('Password and confirm password are not match');
      } else {
        dispatch(register(name, email, password));
      }
    };
    useEffect( async () => {
      const { data }  = await Axios.get('https://recommendationnews1.herokuapp.com/api/category');
      // console.log(data)
      setCategory([...data])
    },[])
    useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
    }, [props.history, redirect, userInfo]);
    // useEffect(() =>{

    // })
  return (
    <div className="signup-form" >    
    <form className="form" onSubmit={submitHandler}>
    	<h4 className="modal-title">ĐĂNG KÍ </h4>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Name" required="required" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Email" required="required" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
            <input type="password" className="form-control" placeholder="Confirm Password" required="required" onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>
        {/* <div>
          Bạn quan tâm về ?
        </div>
        <div className='py-2 '>
        {
          categorylist.map ( category => <button type='button' className='btn btn-info mx-1 mb-1' value={category.name} onClick={(e) => setFavorite(e.target.value)}> {category.name} </button>  )
        }
        </div> */}
        {/* <div>{catergory_favorite}</div> */}
        <input type="submit" className="button btn-primary btn-block btn-lg " value="Đăng kí" />              
    </form>			
    <div className="text-center small">Đã có tài khoản? <Link to='signin'>Đăng nhập</Link></div>
</div>
  );
}
