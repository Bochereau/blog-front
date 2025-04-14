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
import AdminLogin from '../Admin/AdminLogin';
import AdminDashboard from '../Admin/AdminDashboard';
import AdminRoute from '../Admin/AdminRoute';
import AdminPosts from '../Admin/AdminPosts';
import AdminCreatePost from '../Admin/AdminCreatePost';
import AdminThemes from "../Admin/AdminThemes";

const Blog = () => {
    const dispatch = useDispatch();

    const lightTheme = useSelector((state) => state.lightTheme);

    useEffect(() => {
        dispatch({ type: 'GET_POSTS' });
        dispatch({ type: 'GET_THEME' });
    }, [dispatch]);

    // const handleChangeColor = (bool) => dispatch(changeColor(bool));

    return (
        <main className={classNames("wrapper", { "bk-p--light": lightTheme, "bk-p--dark": !lightTheme })}>
            <ScrollToTop>
                <Menu />
                <Alert />
                <div className={"page"}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/list" element={<List />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/posts/:slug" element={<Article />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        } />
                        <Route path="/admin/posts" element={
                            <AdminRoute>
                                <AdminPosts />
                            </AdminRoute>
                        } />
                        <Route path="/admin/posts/create" element={
                            <AdminRoute>
                                <AdminCreatePost />
                            </AdminRoute>
                        } />
                        <Route path="/admin/themes" element={
                            <AdminRoute>
                                <AdminThemes />
                            </AdminRoute>
                        } />
                    </Routes>
                </div>
            </ScrollToTop>
        </main>
    )
}

export default Blog;
