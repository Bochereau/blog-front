import { connect } from 'react-redux';
import Article from '../../components/Article'

import {
    getPosts
} from '../../actions';

const mapStateToProps = (state) => ({
    posts: state.posts
});

const mapDispatchToProps = (dispatch) => ({
    getPosts: () => {
        dispatch(getPosts());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
