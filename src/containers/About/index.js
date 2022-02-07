import { connect } from 'react-redux';
import About from '../../components/About'

const mapStateToProps = (state) => ({
    light: state.lightTheme,
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(About);