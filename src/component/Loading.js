import React from "react";
import { BoxLoading } from 'react-loadingg';
export default function Loading(props) {
  return (
    <div className='loading mt-3'>
        <h4>Wait a minute ...</h4>
        <BoxLoading size='large'/>
    </div>
  );
}
