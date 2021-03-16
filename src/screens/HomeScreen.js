import React, { useState } from 'react';
import Cards from '../component/Cards';
import InfiniteList from '../component/InfiniteList';

export default function HomeScreen (props){
    const [state, setState] = useState([]);
    return (
        <div className='Home'>
            {console.log(props.location)}
            <InfiniteList link={props.location.pathname} state ={state} setState={setState}></InfiniteList>
        </div>
    )
}