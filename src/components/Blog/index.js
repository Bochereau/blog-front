import React, { useEffect } from "react";
import { 
    Routes, 
    Route 
} from "react-router-dom";

import './style.scss';

import ScrollToTop from "../ScrollToTop";
import Home from '../../containers/Home';
import Article from "../../containers/Article";
import NotFound from "../NotFound";

const Blog = ({ getPosts }) => {
    useEffect(() => {
        getPosts()
    }, []);
    return(
        <main className="wrapper">
            <ScrollToTop>
                <Routes>
                    <Route path='*' element={<NotFound/>} />
                    <Route path="/" exact element={<Home/>} />
                    <Route path="/posts/:slug" exact element={<Article />} />
                </Routes>
            </ScrollToTop>
        </main>
    )
}

export default Blog;
