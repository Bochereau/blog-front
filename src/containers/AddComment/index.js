import { connect } from 'react-redux';
import AddComment from '../../components/AddComment'

import {
    getPosts,
    newPseudo,
    newComment,
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
    changePseudo: (pseudo) => {
        dispatch(newPseudo(pseudo));
    },
    changeComment: (comment) => {
        dispatch(newComment(comment));
    },
    sendComment: () => {
        dispatch(sendComment());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);