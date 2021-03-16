import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import "./Cards.css"

export default function InfiniteList(props) {

  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    getData(loadMore);
    // console.log('hello')
    setLoadMore(false);
  }, [loadMore]);

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
          // console.log(window.scrollY,window.innerHeight,list.clientHeight,list.offsetTop)
          // console.log(window.scrollY+window.innerHeight,list.clientHeight+list.offsetTop)
          // console.log(loadMore)
          setLoadMore(true);
          // console.log(loadMore)
        }
      });
    }
  }, []);

  // useEffect(() => {
  //   const list = document.getElementById('list');

  //   if(list.clientHeight <= window.innerHeight && list.clientHeight) {
  //     setLoadMore(true);
  //     console.log(loadMore)
  //   }
  // }, [props.state]);


  const getData = (load) => {
    if (load) {
      // https://dog.ceo/api/breeds/image/random/15
      let l = 'https://recommendationnews1.herokuapp.com/api/products' + props.link
      console.log(l)
      fetch(l)
        .then(res => {
          return !res.ok 
          ? res.json().then(e => Promise.reject(e)) 
          : res.json();
        })
        .then(res => {
          // console.log(res)
          props.setState([...props.state, ...res]);
        });
    }
  };

  return (
    <div className='container-fluid'>
      <div id='list' className='card-columns'>
      { console.log(props.state)}
      { props.state.map((article) => <Cards key={article.id} article={article} />) }
      </div>
    </div>
    
  );
};