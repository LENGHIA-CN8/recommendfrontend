import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import "./Cards.css"
import { useSelector } from 'react-redux';
import axios from 'axios'
import Cookies  from 'js-cookie';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Loading from './Loading'



export default function InfiniteList(props) {
  const [loadMore, setLoadMore] = useState(true);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  let [cards,setCards] = useState([]);
  let [count,setCount] = useState(-2);
  const numberperLoad = 8;
  const csrftokenCookie = Cookies.get('csrftoken');


  const getarticlefromID = async (arr1) => {
    let arr = []
    for (let i=0; i < arr1.length; i++) {
      let  response  = await axios.get(`/articles/${arr1[i]}/`)
      arr.push(response.data)
    }
    return arr
  }

  useEffect(() => {
    if ((props.link === '/' && userInfo) || (props.link === '/category/')){
      getData1(loadMore)
    } else {
      getData(loadMore);
    }
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    let l = '/articles' + props.link
      console.log(l)
      if (props.link === '/' && userInfo) {
        let formData = new FormData();
        formData.append('id',userInfo.userID)
        console.log('inside personel')
        l = l + 'get_personal_article/'
        axios.post(l,formData, {
          headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken": csrftokenCookie }
         } ).then( (response) => {
          // console.log(response.data.articleID)
          props.setState([...props.state, ...response.data.articleID]);
          let arr1 = response.data.articleID.slice(0,numberperLoad)
          getarticlefromID(arr1).then((response) => setCards([...response]))
          // const {data} = response
          // props.setState([...props.state, ...data]);
          // let arr1 = data.slice(0,numberperLoad)
          // getarticlefromID(arr1).then((response) => setCards([...response]))

          // props.setState([...props.state, ...data]);
          // let a = data.slice(0,numberperLoad);
          // setCards([...a])

        }).catch(function (error) {
          console.log(error);
        });
 
      } else if(props.link === '/search') {
        l = l + '/';
        let formData = new FormData();
        formData.append('str', props.querystr);
        axios.post(l,formData,{
          headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken":csrftokenCookie}
        }).then( (response) => {
          // console.log(response.data.articleID)
          props.setState([...props.state, ...response.data.articleID]);
          let arr1 = response.data.articleID.slice(0,numberperLoad)
          getarticlefromID(arr1).then((response) => setCards([...response]))
        }).catch(function (error) {
          console.log(error);
        });
      } else if (props.link === '/category/'){
        console.log(props.categoryID)
        l = props.link + props.categoryID + '/'
        axios.get(l,{
          headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken":csrftokenCookie}
        }).then( (response) => {
          console.log(response.data.articleID)
          props.setState([...props.state, ...response.data.articleID]);
          let arr1 = response.data.articleID.slice(0,numberperLoad)
          getarticlefromID(arr1).then((response) => setCards([...response]))
        }).catch(function (error) {
          console.log(error);
        });
      } 
      else {
        axios.get(l).then((response) => {
          const {data} = response
          props.setState([...props.state, ...data.results]);
          let a = data.results.slice(0,numberperLoad);
          setCards([...a])
        })
      }
  },[props.querystr,props.categoryID])

  useEffect(() => {
    const list = document.getElementById('list')
    if(props.scrollable) {   
      // list has fixed height
      list.addEventListener('scroll', (e) => {
        const el = e.target;
        if(el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });  
    } else {  
      // list has auto height  
      window.addEventListener('scroll', () => {  
        if (window.scrollY + window.innerHeight + 1 >=  list.clientHeight + list.offsetTop) {
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
    // <div className='container-fluid'>
    //   <div id='list' className='card-columns'>
    // <div className='container' id='list'>
    //   <div className='row' data-masonry={{"percentPosition": true }} id='list'>
    <div id = 'list'>
      
      
    { cards.length > 0 ? <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
            >
                <Masonry>
      { console.log('props state',props.state)}
      { console.log('cards',cards) }
      { typeof cards[0] !== "undefined" && cards.map((article) => <Cards key={article.id} article={article} />) }
                </Masonry>
    </ResponsiveMasonry> : <Loading></Loading>}

    </div>
    // </div>
    //   </div>
    // </div>
    
    
  );
};