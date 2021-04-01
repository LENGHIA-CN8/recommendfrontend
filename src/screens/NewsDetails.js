import React, { useEffect, useState } from 'react';
import './NewsDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import axios from 'axios';
import Avatar from 'react-avatar';
import { getComment,createComment} from '../actions/commentActions'
import Footer from '../component/Footer';
import Cookies  from 'js-cookie';
import { Link } from 'react-router-dom';


export default function NewsDetails (props){
    const dispatch = useDispatch();
    const commentlists = useSelector((state) => state.commentlists)
    const commentsCreate = useSelector((state) => state.commentsCreate)
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [articleID,setID] = useState(props.match.params.id);
    const [content,setContent] = useState({});
    const [commentcontent,setComment] = useState();
    const [date,setDate] = useState();
    const [relatedNews,setRelated] = useState([]);
    const csrftokenCookie = Cookies.get('csrftoken');


    let { comments } = commentlists;
    let { success } = commentsCreate;
    const getarticlefromID = async (arr1) => {
        let arr = []
        for (let i=0; i < arr1.length; i++) {
          let  response  = await axios.get(`/articles/${arr1[i]}/`)
          arr.push(response.data)
        }
        return arr
      }
    useEffect( async () => {
        const { data }  = await Axios.get(`/articles/${props.match.params.id}`);
        setContent(data)
        setDate(new Date(data.time*1000))
        setID(props.match.params.id)
        window.scrollTo(0, 0);
      },[props.match.params.id])
    useEffect(() =>{
        if(success){
            dispatch(getComment(articleID))
            dispatch({type:'COMMENT_CREATE_RESET'})
        }
    }
    ,[dispatch,success]);
    useEffect(() => {
        dispatch(getComment(articleID))
    },[dispatch,articleID])
    useEffect(() =>{
        let formData = new FormData();
        formData.append('articleID',props.match.params.id)
        axios.post('/articles/get_related_articles_by_id/',formData, {
            headers: {  "Content-Type": "multipart/form-data", "X-CSRFToken": csrftokenCookie }
           } ).then( (response) => {
            console.log(response.data);
            let arr1 = response.data.articles.slice(1,6)
            getarticlefromID(arr1).then((response) => setRelated([...response]))  
          }).catch(function (error) {
            console.log(error);
          });

    },[props.match.params.id])


    const handleComment = (e) => {
        e.preventDefault();
        if(userInfo){
            dispatch(createComment({
                CommentID: 3,
                articleID,
                userId: userInfo.userID,
                content: commentcontent,
                time:12,

            }))
        } else {
            alert("Bạn phải đăng nhập để sử dụng tính năng này !!")
            // props.history.push('/signin')
        }
    }
    return(

    <div>
    {console.log('related',relatedNews)}
    {console.log('related',props.match.params.id)}
    <div className='detail bg-light'>
        <section className='topdetail mb-2 bg-light'>
        <div className='container-details bg-light'>
        { date ?  <small><div className='timestamp float-right ' style={{color:'gray'}}>{ date.toGMTString()}</div></small> : null }
           <div className ='sidebar-1 '>
            <h1 className='title-detail'>{content.title}</h1>
            <p className='description'>{content.sapo}</p>
            
             {ReactHtmlParser(content.displayContent)}
           </div>
           <div className = 'recommend'>
            <div className = 'sidebar2-title text-left mb-2 ml-0'>
                Tin liên quan
            </div>
            { 
            relatedNews ? relatedNews.map((item) => (
                <div className='title-article-sidebar2 mt-2 '><Link className='text-decoration-none text-info' onClick={ (e) => (props.history.push(`/post/${item.articleID}`))}>{item.title}</Link></div>
            )) : <div></div> 
        }

            </div>
       </div>
       
        </section>
        <div className='middledetail'>
            <div className='box-comment w-100'>
                <div className='left'>
                    <h3>Ý kiến</h3>
                </div>
                <div className='input-comment w-100'>
                    <form >
                    <textarea type='text-area' className='form-control ' placeholder='Ý kiến của bạn' onChange={(e) => setComment(e.target.value)}/>
                    <button className='float-right mt-1 btn-info btn' onClick={(e) => handleComment(e)}>Gửi</button>
                    </form>
                </div>
                <div className='filter-comment pt-2'>
                    <h3 className='font-weight-bold h6 pt-2 pb-2 d-inline-block'>Mới nhất</h3>
                </div>
                <div className='box-comment pt-0 mb-2 pl-0'>
                    {
                        // console.log(comments)
                        comments && comments.results ? comments.results.reverse().map((comment) => (
                            <div className='comment-item d-flex mb-2'>
                                <div className='avatar pt-1'><Avatar name={comment.user} size="40" round={true}/></div>
                                <div className='name pt-3 pl-2' style={{color:"blue",font:"400 15px arial"}}><strong>{comment.userID}</strong></div>
                                <div className='content pt-3 pl-2' style={{font:"400 15px arial"}}> {comment.content}</div>
                            </div>
                        )) : <div> </div>
                    }
                </div>
            </div>
        </div> 
        <Footer />  
        </div>
        </div>

    );
};