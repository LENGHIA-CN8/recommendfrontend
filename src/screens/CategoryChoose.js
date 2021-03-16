import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import Axios from 'axios';

// import { signin } from '../actions/userActions';
// import MessageBox from '../components/MessageBox';
import './Signup.css'

export default function CategoryChoose(props) {
    const [categorylist,setCategory] = useState([]);
    const [catergory_favorite,setFavorite] = useState(new Map());
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const handleChange = (e) => {
      const item = e.target.value;
      const isChecked = e.target.checked;
      setFavorite(catergory_favorite.set(item,isChecked))
      console.log(catergory_favorite)

    }
    const submitHandler = (e) => {
      e.preventDefault();
      props.history.push(redirect);

    };
    useEffect( async () => {
      const { data }  = await Axios.get('https://recommendationnews1.herokuapp.com/api/category');
      // console.log(data)
      setCategory([...data])
    },[])
    // useEffect(() => {
    //   if (userInfo) {
    //     props.history.push(redirect);
    //   }
    // }, [props.history, redirect, userInfo]);
    // useEffect(() =>{

    // })
  return (
    <div className="signup-form" >    
    <form className="form" onSubmit={submitHandler}>
        <h4>
          Bạn quan tâm về ?
        </h4>
        <div className='py-2 '>
        {
          categorylist.map ( category => <div className="d-inline-block w-50 text-left" style={{width: '100px'}}><input type='checkbox' className='m-2 p-0' value={category.name} onChange={handleChange} checked={catergory_favorite.get(category.name)}/>{category.name}</div>    )
        }
        </div>
        <div>{catergory_favorite}</div>
        <input type="submit" className="button btn-primary btn-block btn-lg " value="Hoàn Thành" />              
    </form>			
</div>
  );
}
