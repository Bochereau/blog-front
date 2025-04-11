import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import {
    Routes,
    Route
} from "react-router-dom";
import { changeColor } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';

import ScrollToTop from "../ScrollToTop";
import Menu from "../Menu";
import Alert from "../Alert";
import Home from '../Home';
import List from '../List';
import Article from "../Article";
import About from "../About";
import Contact from '../Contact';
import NotFound from "../NotFound";
// import AdminPosts from '../Admin/AdminPosts';
// import AdminDashboard from '../Admin/AdminDashboard';

const Blog = () => {
    const dispatch = useDispatch();

    const menuOpen = useSelector((state) => state.menuOpen);
    const lightTheme = useSelector((state) => state.lightTheme);
  
    useEffect(() => {
      dispatch({ type: 'GET_POSTS' });
    }, [dispatch]);
  
    // const handleChangeColor = (bool) => dispatch(changeColor(bool));

    return (
        <main className={classNames("wrapper", { "bk-p--light": lightTheme, "bk-p--dark": !lightTheme })}>
            <ScrollToTop>
                <Menu />
                <Alert />
                <div className={classNames("page", { 'open': menuOpen === true })}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/list" element={<List />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/posts/:slug" element={<Article />} />
                        <Route path="*" element={<NotFound />} />
                        {/* <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/posts" element={<AdminPosts />} /> */}
                    </Routes>
                </div>
            </ScrollToTop>
        </main>
    )
}

const mapStateToProps = (state) => ({
    menuOpen: state.menuOpen,
    lightTheme: state.lightTheme,
});

const mapDispatchToProps = (dispatch) => ({
    getPosts: () => dispatch({ type: 'GET_POSTS' }),
    // getTheme: () => dispatch({ type: 'GET_THEME' }),
    openMenu: () => dispatch(openMenu()),
    changeColor: (bool) => dispatch(changeColor(bool))
});

Blog.propTypes = {
    getPosts: PropTypes.func.isRequired,
    // getTheme: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool.isRequired,
    lightTheme: PropTypes.bool.isRequired,
    openMenu: PropTypes.func.isRequired,
    changeColor: PropTypes.func.isRequired
}

export default Blog;
