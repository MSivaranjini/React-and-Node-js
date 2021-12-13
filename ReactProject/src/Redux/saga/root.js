import { takeEvery} from 'redux-saga/effects'
import { loginHandler,managerHandler,wfm_managerHandler, managerUpdateHandler,softStatusHandler} from './handlers'


export function* rootSaga(){
    yield takeEvery("LOGIN_ACTION",loginHandler);
    yield takeEvery("Action",managerHandler);
    yield takeEvery("PENDING_APPROVAL",wfm_managerHandler);
    yield takeEvery("SEND_REQUEST",managerUpdateHandler);
    yield takeEvery("LOCK_STATUS",softStatusHandler);
}