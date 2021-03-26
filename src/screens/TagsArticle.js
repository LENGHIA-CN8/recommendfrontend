import React, { useState } from 'react';
import InfiniteList from '../component/InfiniteList';

export default function TagsArticle (props){
    const tag = props.match.params.tagsname;
    const [state, setState] = useState([]);
    return (
        <div className='TagsNews'>
            {console.log(props.location)}
            <InfiniteList link={`?tag=${tag}`} state ={state} setState={setState}></InfiniteList>
        </div>
    )
}