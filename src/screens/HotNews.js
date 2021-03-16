import React, { useState } from 'react';
import Cards from '../component/Cards';
import InfiniteList from '../component/InfiniteList';

export default function HotNews (props){
    const [state, setState] = useState([{id:1,name:'Toan thang nao',image:'https://media.suckhoedoisong.vn/Images/thaibinh/2021/02/26/nguyen%20tien%20quang.jpg'}]);
    return (
        <div className='HotNews'>
            {/* <div>hello</div> */}
            {console.log(props.location.pathname)}
            <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList>
        </div>
    )
}