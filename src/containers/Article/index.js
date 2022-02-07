import { connect } from 'react-redux';
import Article from '../../components/Article'

import {
    getPostId,
} from '../../actions';

const mapStateToProps = (state) => ({
    posts: state.posts,
    light: state.lightTheme,
});

const mapDispatchToProps = (dispatch) => ({
    getPostId: (id) => {
        dispatch(getPostId(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
