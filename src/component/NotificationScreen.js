import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NotificationScreen(props) {
  const [isclosed,setClose] = useState(false);
  const handleClick = (e) => {
    setClose(true);
  } 
  return (
    <div>
      { isclosed ? <div></div> : <div class="alert alert-warning alert-dismissible fade show  " data-dismiss="alert" style={{margin:"0 30% 0 30%"}} role="alert">
        <strong>Bạn chưa đăng nhập!</strong> Hãy <Link to='/signin' className='text-decoration-none'>đăng nhập</Link> để nhận tin gợi ý cá nhân hoá
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={handleClick}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div> 
      }
    </div>
  );
}
