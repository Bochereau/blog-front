import { connect } from 'react-redux';
import Article from '../../components/Article'

import {
    getPosts,
    getPostId,
} from '../../actions';

const mapStateToProps = (state) => ({
    posts: state.posts,
    pseudo: state.pseudo,
    comment: state.comment,
});

const mapDispatchToProps = (dispatch) => ({
    getPosts: () => {
        dispatch(getPosts());
    },
    getPostId: (id) => {
        dispatch(getPostId(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
