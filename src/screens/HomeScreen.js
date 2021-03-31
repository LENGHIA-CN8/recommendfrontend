import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteList from '../component/InfiniteList';
import NotificationScreen from '../component/NotificationScreen'


export default function HomeScreen (props){
    const [state, setState] = useState([]);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, error } = userSignin;
    return (
        <div className='Home'>
            {userInfo ? <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList> : <NotificationScreen></NotificationScreen>}
        </div>
    )
}