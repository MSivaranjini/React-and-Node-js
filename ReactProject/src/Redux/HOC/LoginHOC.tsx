import {connect} from 'react-redux';
import { bindActionCreators } from "redux"
import Login from '../../Login';

export default connect(
    (state:any)=>{
        return {
            token: state.loginData.token,
            usertype: state.loginData.usertype
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            performLogin:(user:any)=>{
                return {type: "LOGIN_ACTION",data:user}
            }
        },dispatch)
    }
)(Login)