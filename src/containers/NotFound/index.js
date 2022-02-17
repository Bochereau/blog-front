import { connect } from 'react-redux';
import NotFound from '../../components/NotFound'

const mapStateToProps = (state) => ({
    light: state.lightTheme,
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);