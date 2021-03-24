import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteList from '../component/InfiniteList';


export default function SearchScreen (props){
    const [state, setState] = useState([]);
    const querystr = props.location.search.split('=')[1]
    return (
        <div className='Search'>
            <div>hello</div>
            {console.log(querystr)}
            <InfiniteList link={props.location.pathname} state ={state} setState={setState} querystr={querystr}></InfiniteList>
            {/* {userInfo ? <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList> : <NotificationScreen></NotificationScreen>} */}
        </div>
    )
}