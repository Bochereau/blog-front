import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import {
    Routes,
    Route
} from "react-router-dom";
import { openMenu, changeColor } from '../../actions';
import { connect } from 'react-redux';

import './style.scss';

import ScrollToTop from "../ScrollToTop";
import Menu from "../../containers/Menu";
import Alert from "../../containers/Alert";
import Home from '../../containers/Home';
import List from '../../containers/List';
import Article from "../../containers/Article";
import About from "../../containers/About";
import Contact from '../../containers/Contact';
import NotFound from "../../containers/NotFound";

const Blog = ({
    menuOpen,
    lightTheme,
    getPosts,
    getTheme,
    openMenu,
    changeColor
}) => {
    useEffect(() => {
        getPosts();
        getTheme();
    }, [getPosts, getTheme]);

    return (
        <main className={classNames("wrapper", { "bk-p--light": lightTheme, "bk-p--dark": !lightTheme })}>
            <ScrollToTop>
                <Menu />
                <Alert />
                <div className={classNames("page", { 'open': menuOpen === true })}>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/list" exact element={<List />} />
                        <Route path="/about" exact element={<About />} />
                        <Route path="/contact" exact element={<Contact />} />
                        <Route path="/posts/:slug" exact element={<Article />} />
                        <Route path="*" element={<NotFound />} />
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
    getTheme: () => dispatch({ type: 'GET_THEME' }),
    openMenu: () => dispatch(openMenu()),
    changeColor: (bool) => dispatch(changeColor(bool))
});

Blog.propTypes = {
    getPosts: PropTypes.func.isRequired,
    getTheme: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool.isRequired,
    lightTheme: PropTypes.bool.isRequired,
    openMenu: PropTypes.func.isRequired,
    changeColor: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);