import React, { useState } from 'react';
import Cards from '../component/Cards';
import InfiniteList from '../component/InfiniteList';

export default function LatestNews (props){
    const [state, setState] = useState([]);
    return (
        <div className='LatestNews'>
            {/* {console.log(props.location.pathname)} */}
            <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList>
        </div>
    )
}