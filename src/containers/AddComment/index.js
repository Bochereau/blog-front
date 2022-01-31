import { connect } from 'react-redux';
import AddComment from '../../components/AddComment'

import {
    getPosts,
    changeValue,
    sendComment,
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
    changeValue: (newValue, name) => {
        dispatch(changeValue(newValue, name));
    },
    sendComment: () => {
        dispatch(sendComment());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);