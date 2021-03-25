import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import Cookies  from 'js-cookie';
import './Signup.css'

export default function CategoryChoose(props) {
    const [categorylist,setCategory] = useState([]);
    const [catergory_favorite,setFavorite] = useState(new Map());
    const [object_category,setObject] = useState({'category':[]
    })
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, error } = userSignin;
    
    
    const handleChange = (e) => {
      let arr = []
      const item = e.target.value;
      const isChecked = e.target.checked;
      setFavorite(catergory_favorite.set(item,isChecked))
      console.log(catergory_favorite)
      catergory_favorite.forEach((value,key,map) => {
        if(value){
          arr.push(key)
          // setObject({category :{ ...object_category.category,[key] : 1 },latent:[]})
          setObject({'category': arr})
        } else {
          // setObject({category :{ ...object_category.category,[key] : 0 },latent:[]})
        }
      })
      console.log(arr);
    }
    const submitHandler = async (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('userID',userInfo.userID)
      formData.append('categoryIDs', object_category.category);
      var csrftokenCookie = Cookies.get('csrftoken');
      const { data }  = await Axios.post('/user_category/post_user_category/',formData,{
        headers: { "X-CSRFToken":csrftokenCookie}
      });
      // props.history.push(redirect);

    };
    useEffect( async () => {
      const { data }  = await Axios.get('/category/get_top_level_category/');
      console.log(data)
      setCategory([...data.results])
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
    <form className="form" >
        { console.log(userInfo) }
        { console.log(typeof(object_category.category)) }
        <h4>
          Bạn quan tâm về ?
        </h4>
        <div className='py-2 '>
        {
          categorylist.length > 0 ? categorylist.map ( item => {
          if(item.category.localeCompare("video") ){
            return <div className="d-inline-block w-50 text-left" style={{width: '100px'}}><input type='checkbox' className='m-2 p-0' value={item.categoryID} onChange={handleChange} checked={catergory_favorite.get(item.categoryID)}/>{item.category}</div> 
          }
         
        }) : <div></div>
        }
        {
        console.log(categorylist)
      }
        </div>
        <button className="button btn-primary btn-block btn-lg " value="Hoàn Thành" onClick={(e) => submitHandler(e)}>Hoàn Thành</button>              
    </form>			
</div>
  );
}
