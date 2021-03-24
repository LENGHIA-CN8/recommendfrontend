import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteList from '../component/InfiniteList';


export default function SearchScreen (props){
    const [state, setState] = useState([]);
    return (
        <div className='Search'>
            <div>hello</div>
            {console.log(props.location)}
            <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList>
            {/* {userInfo ? <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList> : <NotificationScreen></NotificationScreen>} */}
        </div>
    )
}