import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NotificationScreen(props) {
  return (
    <div>
      <div class="alert alert-warning alert-dismissible fade show  " style={{margin:"0 30% 0 30%"}}role="alert">
        <strong>Bạn chưa đăng nhập!</strong> Hãy <Link to='/signin' className='text-decoration-none'>đăng nhập</Link> để nhận tin gợi ý cá nhân hoá
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}
