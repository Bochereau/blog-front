import React, { useEffect } from "react";
import classNames from "classnames";
import { 
    Routes, 
    Route 
} from "react-router-dom";

import './style.scss';

import ScrollToTop from "../ScrollToTop";
import Menu from "../../containers/Menu";
import Alert from "../../containers/Alert";
import Home from '../../containers/Home';
import List from '../../containers/List';
import Article from "../../containers/Article";
import About from "../../containers/About";
import Contact from '../../containers/Contact';
import NotFound from "../NotFound";


const Blog = ({ getPosts, getTheme, menuOpen, light }) => {
    useEffect(() => {
        getPosts();
        getTheme();
    }, []);
    return(
        <main className={classNames ("wrapper", {"bk-p--light" : light === true, "bk-p--dark" : light === false})}>
            <ScrollToTop>
                <Menu />
                <Alert />
                <div className={classNames ("page", { 'open' : menuOpen === true})}>
                    <Routes>
                        <Route path="/" exact element={<Home/>} />
                        <Route path="/list" exact element={<List/>} />
                        <Route path="/about" exact element={<About/>} />
                        <Route path="/contact" exact element={<Contact/>} />
                        <Route path="/posts/:slug" exact element={<Article />} />
                        <Route path='*' element={<NotFound/>} />
                    </Routes>
                </div>
            </ScrollToTop>
        </main>
    )
}

export default Blog;
