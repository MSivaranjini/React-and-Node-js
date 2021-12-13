import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ManagerHome from '../../Managers/Home';

export default connect(
    (state:any)=>{
        return {
           employeeData:state.employeeData.employeeData
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            getEmployee:()=>{
                console.log('called')
                return {type:"Action"}
            },
            RequestSoftLock:(request:any) => {
                console.log('HOC:',request)
                return {type:"SEND_REQUEST",data:request}
            }
        },dispatch)
    }
)(ManagerHome)