import React, { useEffect, useState } from 'react';
import './NewsDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import Avatar from 'react-avatar';
import { getComment,createComment} from '../actions/commentActions'
import Footer from '../component/Footer';

export default function NewsDetails (props){
    const dispatch = useDispatch();
    const commentlists = useSelector((state) => state.commentlists)
    const commentsCreate = useSelector((state) => state.commentsCreate)
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const articleId = props.match.params.id;
    const [content,setContent] = useState({});
    const [commentcontent,setComment] = useState();
    let {error, comments} = commentlists;
    let { success , commentcreated } = commentsCreate;
    useEffect( async () => {
        const { data }  = await Axios.get(`https://recommendationnews1.herokuapp.com/api/products/${articleId}`);
        // console.log(data)
        setContent(data)
      },[])
    useEffect(() =>{
        if(success){
            dispatch(getComment({}));
        }
    }
    ,[dispatch,success]);
    useEffect(() => {
        dispatch(getComment({}))
    },[dispatch])

    const handleComment = (e) => {
        if(userInfo){
            dispatch(createComment({
                articleId: articleId,
                userId: userInfo._id,
                content: commentcontent,
            }))
        } else {
            props.history.push('/signin')
        }
        
        // props.history.push('/')
    }
    return(
    <div className='detail bg-light'>
        <section className='topdetail mb-2 bg-light'>
        <div className='container-details bg-light'>
           <div className ='sidebar-1 '>
            <h1 className='title-detail'>{content.name}</h1>
            <p className='description'>{content.brand}</p>
            
             {ReactHtmlParser(content.description)}
           </div>
           <div className = 'recommend'>
            <div className = 'sidebar2-title text-left mb-2 ml-0'>
                Tin liên quan
            </div>
            {/* <img className='side-img w-50 pt-2' src='https://i1-thethao.vnecdn.net/2021/02/06/a-7443-1612571787.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=MuLIhYlFIqrzYdXmvjHh6g '></img> */}
            <div className='title-article-sidebar2 mt-2'>Messi tự cách ly khỏi tin đồn chuyển nhượng</div>
            <div className='title-article-sidebar2 mt-2'>Messi giữ tình bạn với Suarez</div>

            </div>
       </div>
       
        </section>
        <section className='middledetail'>
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
                    <div className='comment-item d-flex mb-2'>
                        <div className='avatar pt-1'><Avatar name="Le Nghia" size="40" round={true}/></div>
                        <div className='name pt-3 pl-2' style={{color:"blue",font:"400 15px arial"}}><strong>Le Nghia</strong></div>
                        <div className='content pt-3 pl-2' style={{font:"400 15px arial"}}> Một bài viết hay ý nghĩa</div>
                    </div>
                    {
                        comments ? comments.map((comment) => (
                            <div className='comment-item d-flex mb-2'>
                                <div className='avatar pt-1'><Avatar name={comment.user} size="40" round={true}/></div>
                                <div className='name pt-3 pl-2' style={{color:"blue",font:"400 15px arial"}}><strong>{comment.user}</strong></div>
                                <div className='content pt-3 pl-2' style={{font:"400 15px arial"}}> {comment.content}</div>
                            </div>
                        )) : <div> </div>
                    }
                </div>
            </div>
        </section>   
        <Footer />
        </div>
    );
};