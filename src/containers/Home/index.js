import { connect } from 'react-redux';
import { changeColor } from '../../actions';
import Home from '../../components/Home'

const mapStateToProps = (state) => ({
    posts: state.posts,
    loading: state.loading,
    light: state.lightTheme,
});

const mapDispatchToProps = (dispatch) => ({
    changeColor: () => {
        dispatch(changeColor());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);