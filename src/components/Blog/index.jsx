import React, { useEffect } from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getPosts, getTheme } from '../../actions';

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
import AdminLogin from '../Admin/AdminThemes';
import AdminDashboard from '../Admin/AdminDashboard';
import AdminRoute from '../Admin/AdminRoute';
import AdminPosts from '../Admin/AdminPosts';
import AdminCreatePost from '../Admin/AdminPosts/AdminCreatePost';
import AdminEditPost from "../Admin/AdminPosts/AdminEditPost";
import AdminThemes from "../Admin/AdminThemes";
import AdminPreview from "../Admin/AdminPreview";
import AdminComments from "../Admin/AdminComments";
import ScrollToTopButton from "../ScrollToTopButton";
import Footer from "../Footer";

const Blog = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <main className="wrapper">
            <ScrollToTop>
                <Menu />
                <Alert />
                <div className="page">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/list" element={<List />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/posts/:slug" element={<Article />} />
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
                        <Route path="/admin/posts/edit/:id" element={
                            <AdminRoute>
                                <AdminEditPost />
                            </AdminRoute>
                        } />
                        <Route path="/admin/posts/preview/:id" element={
                            <AdminRoute>
                                <AdminPreview />
                            </AdminRoute>
                        } />
                        <Route path="/admin/themes" element={
                            <AdminRoute>
                                <AdminThemes />
                            </AdminRoute>
                        } />
                        <Route path="/admin/comments" element={
                            <AdminRoute>
                                <AdminComments />
                            </AdminRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
                <ScrollToTopButton />
            </ScrollToTop>
        </main>
    )
}

export default Blog;
