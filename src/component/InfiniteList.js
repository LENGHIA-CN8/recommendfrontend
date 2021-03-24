import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import "./Cards.css"
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'


export default function InfiniteList(props) {
  const [loadMore, setLoadMore] = useState(true);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  let [cards,setCards] = useState([]);
  let [count,setCount] = useState(-2);
  let [numbercardperLoad,setLoad] = useState(0);
  const numberperLoad = 5;

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);
  useEffect(() => {
    let l = '/articles' + props.link
      console.log(props.link)
      if (props.link === '/' && userInfo ) {
        console.log('hello')
        // const { data }  = await Axios.get(l,{'id': userInfo._id});
        // props.setState([...props.state, ...data]);
        axios.get(l).then(async (response) => {
          const {data} = response
          props.setState([...props.state, ...data.results]);
          let a = data.results.slice(0,5);
          setCards([...a])

        })
      } else {
        axios.get(l).then((response) => {
          const {data} = response
          props.setState([...props.state, ...data.results]);
          let a = data.results.slice(0,5);
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