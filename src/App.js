import './App.css';
import React, { useState } from 'react';
import InfiniteList from './component/InfiniteList';
import Navbar from './component/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import SigninScreen from './screens/SigninScreen';
import HomeScreen from './screens/HomeScreen';
import BottomNav from './component/BottomNav';
import Footer from './component/Footer';
import SignupScreen from './screens/SignupScreen';
import NewsDetails from './screens/NewsDetails';
import HotNews from './screens/HotNews';
import LatestNews from './screens/LatestNews';
import TagsArticle from './screens/TagsArticle';
import CategoryChoose from './screens/CategoryChoose';
import SearchScreen from './screens/SearchScreen';



export default function App() {
  

  return (
    <BrowserRouter>
    <div className='App'>
      <Navbar />
      <BottomNav />
      {/* <InfiniteList state={state} setState={setState}/> */}
      <Route exact path='/' component={HomeScreen} ></Route>
      <Route path="/hot_article" component={HotNews}></Route>
      <Route path="/tag/:tagsname" component={TagsArticle}></Route>
      <Route path="/search" component={SearchScreen}></Route>
      <Route path='/new_article' component={LatestNews}></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/signup" component={SignupScreen}></Route>
      <Route path="/post/:id" component={NewsDetails}></Route>
      <Route path="/category/favorite" component={CategoryChoose}></Route>

    </div>
    </BrowserRouter>
  );
};

