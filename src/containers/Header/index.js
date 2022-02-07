import { connect } from 'react-redux';
import Header from '../../components/Header'

const mapStateToProps = (state) => ({
    light: state.lightTheme,
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);