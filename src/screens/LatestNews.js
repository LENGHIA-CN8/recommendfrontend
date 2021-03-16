import React, { useState } from 'react';
import Cards from '../component/Cards';
import InfiniteList from '../component/InfiniteList';

export default function LatestNews (props){
    const [state, setState] = useState([{id:1,name:'Hai Duong gian cach xa hoi',image:'https://photo-baomoi.zadn.vn/w700_r16x9/2021_03_03_294_38105288/46aee15ed91c3042690d.jpg'}]);
    return (
        <div className='LatestNews'>
            {/* {console.log(props.location.pathname)} */}
            <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList>
        </div>
    )
}