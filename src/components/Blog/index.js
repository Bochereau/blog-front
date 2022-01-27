import React, { useEffect } from "react";
import { 
    Routes, 
    Route 
} from "react-router-dom";

import './style.scss';

import ScrollToTop from "../ScrollToTop";
import Home from '../../containers/Home';
import List from '../../containers/List';
import Article from "../../containers/Article";
import About from "../About";
import NotFound from "../NotFound";

const Blog = ({ getPosts, getTheme }) => {
    useEffect(() => {
        getPosts();
        getTheme();
    }, []);
    return(
        <main className="wrapper">
            <ScrollToTop>
                <Routes>
                    <Route path="/" exact element={<Home/>} />
                    <Route path="/list" exact element={<List/>} />
                    <Route path="/about" exact element={<About/>} />
                    <Route path="/posts/:slug" exact element={<Article />} />
                    <Route path='*' element={<NotFound/>} />
                </Routes>
            </ScrollToTop>
        </main>
    )
}

export default Blog;
