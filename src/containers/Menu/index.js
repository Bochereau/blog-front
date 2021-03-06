import { connect } from 'react-redux';
import Menu from '../../components/Menu'

import {
    openMenu,
} from '../../actions';

const mapStateToProps = (state) => ({
    open: state.menuOpen,
    light: state.lightTheme,
});

const mapDispatchToProps = (dispatch) => ({
    openMenu: () => {
        dispatch(openMenu());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);