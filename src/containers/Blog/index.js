import { connect } from 'react-redux';
import Blog from '../../components/Blog'

import {
    getPosts
} from '../../actions';

const mapStateToProps = () => null;

const mapDispatchToProps = (dispatch) => ({
    getPosts: () => {
        dispatch(getPosts());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);