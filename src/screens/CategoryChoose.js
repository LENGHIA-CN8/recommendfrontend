import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import Axios from 'axios';
import Cookies  from 'js-cookie';


// import { signin } from '../actions/userActions';
// import MessageBox from '../components/MessageBox';
import './Signup.css'

export default function CategoryChoose(props) {
    const [categorylist,setCategory] = useState([]);
    const [catergory_favorite,setFavorite] = useState(new Map());
    const [object_category,setObject] = useState({
    })
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;
    
    const testarr = [{
      "count": 7,
      "next": null,
      "previous": null,
      "results": [
          {
              "categoryID": 2017,
              "category": "thể thao",
              "level": 0
          },
          {
              "categoryID": 2019,
              "category": "kinh doanh",
              "level": 0
          },
          {
              "categoryID": 2021,
              "category": "vnexpress",
              "level": 0
          },
          {
              "categoryID": 2029,
              "category": "du lịch",
              "level": 0
          },
          {
              "categoryID": 2044,
              "category": "số hóa",
              "level": 0
          },
          {
              "categoryID": 2053,
              "category": "giải trí",
              "level": 0
          },
          {
              "categoryID": 2062,
              "category": "sức khỏe",
              "level": 0
          }
      ]
  }]
    const handleChange = (e) => {
      const item = e.target.value;
      const isChecked = e.target.checked;
      setFavorite(catergory_favorite.set(item,isChecked))
      console.log(catergory_favorite)
      catergory_favorite.forEach((value,key,map) => {
        if(value){
          setObject({category :{ ...object_category.category,[key] : 1 },latent:[]})
        } else {
          setObject({category :{ ...object_category.category,[key] : 0 },latent:[]})
        }
      })
    }
    const submitHandler = async (e) => {
      var csrftokenCookie = Cookies.get('csrftoken');
      const { data }  = await Axios.put('https://recommendationnews1.herokuapp.com/api/users/favorite_category',{object_category,id:userInfo._id},{
        headers: { "X-CSRFToken":csrftokenCookie}
      });
      e.preventDefault();
      props.history.push(redirect);

    };
    useEffect( async () => {
      // const { data }  = await Axios.get('/category/get_top_level_category/');
      // console.log(data)
      // setCategory([...data.results])
      setCategory([...testarr]);
    },[])
    useEffect(()=> {
      categorylist.map( (cate)=> setFavorite(catergory_favorite.set(cate.name,false)))

    },[categorylist])
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
        { console.log(JSON.stringify(object_category)) }
        <h4>
          Bạn quan tâm về ?
        </h4>
        <div className='py-2 '>
        {/* {
          categorylist.length > 0 ? categorylist.map ( item => {
          if(item.category.localeCompare("video") ){
            return <div className="d-inline-block w-50 text-left" style={{width: '100px'}}><input type='checkbox' className='m-2 p-0' value={item.categoryID} onChange={handleChange} checked={catergory_favorite.get(item.categoryID)}/>{item.category}</div> 
          }
         
        }) : <div></div>
        } */}
        {
        console.log(categorylist)
      }
        </div>
        <input type="submit" className="button btn-primary btn-block btn-lg " value="Hoàn Thành" />              
    </form>			
</div>
  );
}
