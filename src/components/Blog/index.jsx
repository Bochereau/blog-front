import React, { useEffect, Suspense, lazy } from "react";
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
import NotFound from "../NotFound";
import AdminRoute from '../Admin/AdminRoute';
import ScrollToTopButton from "../ScrollToTopButton";
import Footer from "../Footer";
import Loader from "../Loader";

// Lazy-loaded routes (non critiques pour la home)
const Article = lazy(() => import("../Article"));
const About = lazy(() => import("../About"));
const Contact = lazy(() => import("../Contact"));
const AdminLogin = lazy(() => import("../Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("../Admin/AdminDashboard"));
const AdminPosts = lazy(() => import("../Admin/AdminPosts"));
const AdminCreatePost = lazy(() => import("../Admin/AdminPosts/AdminCreatePost"));
const AdminEditPost = lazy(() => import("../Admin/AdminPosts/AdminEditPost"));
const AdminThemes = lazy(() => import("../Admin/AdminThemes"));
const AdminPreview = lazy(() => import("../Admin/AdminPreview"));
const AdminComments = lazy(() => import("../Admin/AdminComments"));

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
                    <Suspense fallback={<Loader />}>
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
                    </Suspense>
                </div>
                <Footer />
                <ScrollToTopButton />
            </ScrollToTop>
        </main>
    )
}

export default Blog;
