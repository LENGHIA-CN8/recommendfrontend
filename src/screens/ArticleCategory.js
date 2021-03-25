import React, { useState } from 'react';
import Cards from '../component/Cards';
import InfiniteList from '../component/InfiniteList';

export default function ArticleCategory (props){
    const [cat,setCat ]= useState(props.match.params.id);
    const [state, setState] = useState([]);
    return (
        <div className='ArticleCategory'>
            {console.log(props.location)}
            <InfiniteList link={'/category/'} state ={state} setState={setState} categoryID={cat}></InfiniteList>
        </div>
    )
}