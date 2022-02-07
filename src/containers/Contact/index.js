import { connect } from 'react-redux';
import Contact from '../../components/Contact';

import {
    changeValue,
    sendMessage,
} from '../../actions';

const mapStateToProps = (state) => ({
    pseudo: state.pseudo,
    email: state.email,
    message: state.message,
    light: state.lightTheme,
});

const mapDispatchToProps = (dispatch) => ({
    changeValue: (newValue, name) => {
        dispatch(changeValue(newValue, name));
    },
    sendMessage: () => {
        dispatch(sendMessage());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);