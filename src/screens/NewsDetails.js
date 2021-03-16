import React, { useEffect, useState } from 'react';
import './NewsDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import Avatar from 'react-avatar';
import { getComment,createComment} from '../actions/commentActions'
export default function NewsDetails (props){
    const dispatch = useDispatch();
    const commentlists = useSelector((state) => state.commentlists)
    const commentsCreate = useSelector((state) => state.commentsCreate)
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const articleId = props.match.params.id;
    const [content,setContent] = useState({});
    const [commentcontent,setComment] = useState();
    const {error, comments} = commentlists;
    const { success } = commentsCreate;
    useEffect( async () => {
        const { data }  = await Axios.get(`https://recommendationnews1.herokuapp.com/api/products/${articleId}`);
        // console.log(data)
        setContent(data)
      },[])
    useEffect(() => {
        dispatch(getComment({}))
    },[dispatch])
    const handleComment = (e) => {
        dispatch(createComment({
            articleId: articleId,
            userId: userInfo._id,
            content: commentcontent,
        }))
        // props.history.push('/')
    }
    return(
    <div className='detail'>
        <section className='topdetail mb-2'>
        <div className='container-details'>
           <div className ='sidebar-1 '>
            <h1 className='title-detail'>{content.name}</h1>
            <p className='description'>{content.brand}</p>
            {/* <div className ='header-content'> 
            <h1 className="title-detail">Messi bắt đầu chấp nhận Griezmann ?</h1>
            </div>
            <p className='description'>Để toả sáng, mọi cầu thủ tấn công của Barca đều cần kết nối được với Lionel Messi. Một siêu sao như Antoine Griezmann cũng không phải ngoại lệ.</p>
            <article className='content-detail'>
                <img className='img-article w-100' src='https://i1-thethao.vnecdn.net/2021/02/07/griezmann-messi-granada-afp-jp-5382-8697-1612671204.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=-sC0vRLq2Ob45_wFYyw4FA '></img>
                <p className='paragraph'>Điều Barca sợ nhất trong mọi hoàn cảnh là Lionel Messi... cúi gằm mặt. Đó thường là phản ứng khi thất bại, hoặc là không hài lòng với chuyện gì đó. Còn khi anh ngẩng cao đầu, đặc biệt khi chủ động muốn tìm sự kết nối, đó là tín hiệu tốt.</p>
                <p className='paragraph'>Trận thắng ngược Granada 5-3 ở tứ kết Cúp Nhà Vua là minh chứng, khi Messi chủ động "ngẩng mặt" tìm đồng đội Griezmann để chuyền. Trận này, Messi chuyền 15 lần cho chân sút người Pháp, nhiều hơn bất cứ đồng đội nào trên sân, trong đó có pha kiến tạo rút ngắn tỷ số xuống 1-2. Pedri, người chơi tiền vệ con thoi lệch trái, trên lý thuyết, đá gần Messi hơn, nhận được 11 đường chuyền, bằng với Riqui Puig - tiền vệ trung tâm vào thay Sergio Busquets ở phút 76.</p>
                <p className='author-mail strong'>Anh Duy</p>
            </article> */}
            
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
            <div className='box-comment'>
                <div className='left'>
                    <h3>Ý kiến</h3>
                </div>
                <div className='input-comment '>
                    <form >
                    <textarea type='text-area' className='form-control ' placeholder='Ý kiến của bạn' onChange={(e) => setComment(e.target.value)}/>
                    <input value='Gửi' className='float-right mt-1 btn-info btn' onClick={(e) => handleComment(e)}></input>
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
                        comments.map((comment) => (
                            <div className='comment-item d-flex mb-2'>
                                <div className='avatar pt-1'><Avatar name={comment.user} size="40" round={true}/></div>
                                <div className='name pt-3 pl-2' style={{color:"blue",font:"400 15px arial"}}><strong>{comment.user}</strong></div>
                                <div className='content pt-3 pl-2' style={{font:"400 15px arial"}}> {comment.content}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>   
        </div>

    );
};