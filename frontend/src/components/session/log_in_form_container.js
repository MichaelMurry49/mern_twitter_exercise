import {connect} from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
    return {
      errors: state.errors.session,
      form: "Sign In",
      historyPush: "/tweets"
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        submit: user => dispatch(login(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)
