import { connect } from 'react-redux';
import Home from '../../components/Home'

import {
    getPosts,
} from '../../actions';

const mapStateToProps = (state) => ({
    posts: state.posts,
    loading: state.loading
});

const mapDispatchToProps = (dispatch) => ({
    getPosts: () => {
        dispatch(getPosts());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);