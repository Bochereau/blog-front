import { connect } from 'react-redux';
import List from '../../components/List'

import {
    getTheme,
} from '../../actions';

const mapStateToProps = (state) => ({
    posts: state.posts,
    themes: state.themes,
    loading: state.loading,
    light: state.lightTheme,
});

const mapDispatchToProps = (dispatch) => ({
    getTheme: () => {
        dispatch(getTheme());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);