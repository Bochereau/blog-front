import { connect } from 'react-redux';
import Home from '../../components/Home'

const mapStateToProps = (state) => ({
    posts: state.posts,
    loading: state.loading
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);