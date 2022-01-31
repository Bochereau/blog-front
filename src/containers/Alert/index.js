import { connect } from 'react-redux';
import Alert from '../../components/Alert';

import {
    dispatchMessage
} from '../../actions';

const mapStateToProps = (state) => ({
    alert: state.alert,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchMessage: (message) => {
        dispatch(dispatchMessage(message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);