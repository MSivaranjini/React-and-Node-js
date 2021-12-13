import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import WFMHome from '../../WFM/Home'

export default connect(
    (state:any)=>{
        return {
            wfmData:state.wfmData.wfmData
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            getWFM_manager:()=>{
                return {type:"PENDING_APPROVAL"}
            },
            ApproveDetail:(request:any) => {
                console.log("lockStatus",request);
                return {type:"LOCK_STATUS",data:request}
            }
        },dispatch)
    }
)(WFMHome)