import { connect } from 'react-redux';
import Blog from '../../components/Blog'

import {
    getPosts,
    getTheme,
} from '../../actions';

const mapStateToProps = (state) => ({
    menuOpen: state.menuOpen,
    light: state.lightTheme,
});

const mapDispatchToProps = (dispatch) => ({
    getPosts: () => {
        dispatch(getPosts());
    },
    getTheme: () => {
        dispatch(getTheme());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);