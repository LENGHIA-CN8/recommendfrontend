import React, { useState } from 'react';
import Cards from '../component/Cards';
import InfiniteList from '../component/InfiniteList';

export default function HotNews (props){
    const [state, setState] = useState([]);
    return (
        <div className='HotNews'>
            {/* <div>hello</div> */}
            {console.log(props.location.pathname)}
            <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList>
        </div>
    )
}