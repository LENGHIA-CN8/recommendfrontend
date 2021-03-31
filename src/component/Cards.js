import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Cards.css";

export default function Cards(props) {
  const { article } = props;
  return (
    <div>
      <div
        key={article.articleID}
        className="card mx-1 mb-1"
        style={{ textAlign: "left" }}
      >
        {article.thumbnail ? (
          <Link to={`/post/${article.articleID}`}>
            <img
              className="card-img-top"
              style={{ padding: "0" }}
              src={article.thumbnail}
              alt="Card image cap"
            />
          </Link>
        ) : null}
        <Link
          to={`/post/${article.articleID}`}
          className="text-decoration-none"
        >
          <div className="card-body ">
            <h5 className="card-title " style={{ color: "rgb(11, 137, 141)" }}>
              {article.title}
            </h5>
            <p className="card-text " style={{ color: "grey" }}>
              <small>{article.sapo}...</small>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
