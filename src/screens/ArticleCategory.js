import React, { useState } from 'react';
import Cards from '../component/Cards';
import InfiniteList from '../component/InfiniteList';

export default function ArticleCategory (props){
    const tag = props.match.params.tagsname;
    const [state, setState] = useState([]);
    return (
        <div className='ArticleCategory'>
            {console.log(props.location)}
            <InfiniteList link={`?tag=${tag}`} state ={state} setState={setState}></InfiniteList>
        </div>
    )
}