import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "./BottomNav.css";
import Axios from 'axios'
export default function BottomNav() {
  const [isopen, setopenSearch] = useState(false);
  const [idlist,setIdlist] = useState([]);
  let test = [{
    "categoryID": 2017,
    "category": "thể thao",
    "level": 0
},
{
    "categoryID": 2019,
    "category": "kinh doanh",
    "level": 0
},
{
    "categoryID": 2021,
    "category": "vnexpress",
    "level": 0
},
{
    "categoryID": 2029,
    "category": "du lịch",
    "level": 0
},
{
    "categoryID": 2044,
    "category": "số hóa",
    "level": 0
},
{
    "categoryID": 2053,
    "category": "giải trí",
    "level": 0
},
{
    "categoryID": 2062,
    "category": "sức khỏe",
    "level": 0
}]
  const openSearch = (e) => {
    e.preventDefault();
    if (isopen) {
      setopenSearch(false);
    } else {
      setopenSearch(true);
    }
  };
  useEffect( async () => {
    const { data }  = await Axios.get('/category/get_top_level_category/');
    console.log(data)
    setIdlist([...data.results])
    // setIdlist([...test])
  },[])
  return (
    <div>
      {console.log(idlist)}
      <nav className="navbar py-1 px-1 mb-3 bottom-header bg-info list-unstyled ">
        <ul className='navbar-nav d-flex flex-row '>
        <NavLink exact to="/" className="Nav float-left text-decoration-none" activeClassName="nav-active">
          <li className="px-2 py-2 border-white ">TIN CỦA BẠN</li>
        </NavLink>
        <NavLink className="text-decoration-none"
          exact
          to="/hot_article"
          className="Nav float-left"
          activeClassName="nav-active"
        >
          <li className="px-2 py-2 border-white ">NÓNG</li>
        </NavLink>
        <NavLink className="text-decoration-none"
          exact
          to="/new_article"
          className="Nav float-left"
          activeClassName="nav-active"
        >
          <li className="px-2 py-2 border-white ">MỚI</li>
        </NavLink>
        {
          idlist.map((item => 
          <NavLink exact to = {`/${item.name}`} className="text-decoration-none">
            <button type='button' className='button_id btn btn-info mx-1 d-none d-md-block' value={item.categoryId} ><small> #{item.category} </small></button>
          </NavLink> ))
          
        }
        </ul>
        <div className='float-right'>
          <form class="form-inline float-right">
            <input
              class="form-control mr-sm-2 d-none d-md-block"
              type="search"
              placeholder="Tìm kiếm"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-light my-0 d-none d-md-block "
              type="submit"
            >
              <BsSearch />
            </button>
            <button class="btn d-md-none">
              <BsSearch size={20} onClick={openSearch} />
            </button>
          </form>
        </div>
      </nav>
      {isopen ? (
        <div className="d-flex border-top p-2 d-none">
          <input
            class="form-control mr-sm-2 my-2 d-md-none"
            type="search"
            placeholder="Nhập nội dung tìm kiếm"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2  d-md-none" type="submit">
            <BsSearch />
          </button>
        </div>
      ) : null}
    </div>
  );
}
