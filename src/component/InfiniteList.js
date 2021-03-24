import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import "./Cards.css"
import { useSelector } from 'react-redux';
import axios from 'axios'
import Cookies  from 'js-cookie';



export default function InfiniteList(props) {
  const [loadMore, setLoadMore] = useState(true);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  let [cards,setCards] = useState([]);
  let [count,setCount] = useState(-2);
  const numberperLoad = 5;
  const csrftokenCookie = Cookies.get('csrftoken');


  const getarticlefromID = async (arr1) => {
    let arr = []
    for (let i=0; i < arr1.length; i++) {
      let  response  = await axios.get(`/articles/${arr1[i]}`)
      arr.push(response.data)
    }
    return arr
  }

  useEffect(() => {
    if (props.link === '/' && userInfo){
      getData1(loadMore)
    } else {
      getData(loadMore);
    }
  }, [loadMore]);

  useEffect(() => {
    let l = '/articles' + props.link
      console.log(l)
      if (props.link === '/' && userInfo) {
        console.log('hello')
        // const { data }  = await Axios.get(l,{'id': userInfo._id});
        // props.setState([...props.state, ...data]);
        axios.get(l,{"userID":userInfo.userID}).then( (response) => {
          const {data} = response
          props.setState([...props.state, ...data]);
          let arr1 = data.slice(0,numberperLoad)
          getarticlefromID(arr1).then((response) => setCards([...response]))

          // props.setState([...props.state, ...data]);
          // let a = data.slice(0,numberperLoad);
          // setCards([...a])

        }).catch(function (error) {
          console.log(error);
        });
 
      } else if(props.link === '/search') {
        let formData = new FormData();
        formData.append('str', props.querystr);
        axios.post(l,formData,{
          headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken":csrftokenCookie}
        }).then( (response) => {
          const { data } = response
          console.log(JSON.parse(response))
          props.setState([...props.state, ...data.articleID]);
          let arr1 = data.slice(0,numberperLoad)
          getarticlefromID(arr1).then((response) => setCards([...response]))
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        axios.get(l).then((response) => {
          const {data} = response
          props.setState([...props.state, ...data.results]);
          let a = data.results.slice(0,numberperLoad);
          setCards([...a])

        })
      }
  },[])

  useEffect(() => {
    const list = document.getElementById('list')
    if(props.scrollable) {   
      // list has fixed height
      list.addEventListener('scroll', (e) => {
        const el = e.target;
        if(el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
          console.log(loadMore)
        }
      });  
    } else {  
      // list has auto height  
      window.addEventListener('scroll', () => {
        
        if (window.scrollY + window.innerHeight + 1 >= list.clientHeight + list.offsetTop) {
          setLoadMore(true);
        }
      });
    }
  }, []);



  const getData = (load) => {
    if(cards.length < props.state.length ) {
    setCount(++count)
    console.log('count',count)
    // if(cards.length >= props.state.length - 5 ){
    //   console.log('loadmore');
    //   HandleFetch();
    // }
    if (cards.length + numberperLoad > props.state.length){
      let current = props.state.slice(cards.length,props.state.length+1)
      setCards([...cards,...current])
    } else if (load) {
      let offset = count * numberperLoad;
      let current = props.state.slice(offset , offset+numberperLoad);
      console.log('current',current)
      setCards([...cards,...current])
    }

    }
  };
  const getData1 = (load) => {
    if(cards.length < props.state.length ) {
      setCount(++count)
      console.log('count',count)
      if (cards.length + numberperLoad > props.state.length){
        let current = props.state.slice(cards.length,props.state.length+1)
        getarticlefromID(current).then((response) => setCards([...cards,...response]))
        // setCards([...cards,...current])
      } else if (load) {
        let offset = count * numberperLoad;
        let current = props.state.slice(offset , offset+numberperLoad);
        console.log('current',current)
        getarticlefromID(current).then((response) => setCards([...cards,...response]))
        // setCards([...cards,...current])
      }
    }

  }

  return (
    <div className='container-fluid'>
      <div id='list' className='card-columns'>
      { console.log('props state',props.state)}
      { console.log('cards',cards) }
      { typeof cards[0] !== "undefined" && cards.map((article) => <Cards key={article.id} article={article} />) }
      
      </div>
    </div>
    
    
  );
};