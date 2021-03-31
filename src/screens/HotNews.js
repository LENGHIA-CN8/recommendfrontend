import React, { useState } from 'react';
import InfiniteList from '../component/InfiniteList';

export default function HotNews (props){
    const [state, setState] = useState([]);
    return (
        <div className='HotNews'>
            <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList>
        </div>
    )
}