import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Cards.css'

export default function Cards(props) {
  const { article } = props;
  return (
    <div key={article.id} className="card " style={{textAlign:"left"}}>
    <Link to={`/post/${article._id}`}>
    <img className="card-img-top" style={{padding:"0"}} src={article.image} alt="Card image cap"/>
    </Link>
    <Link to={`/post/${article._id}`} className='text-decoration-none'>
    <div className="card-body ">
      <h5 className="card-title " style={{color:"rgb(11, 137, 141)"}}>{article.name}</h5>
      <p className="card-text " style={{color:"grey"}}><small>{article.brand}...</small></p>
    </div>
    </Link>
  </div>
  );
}
