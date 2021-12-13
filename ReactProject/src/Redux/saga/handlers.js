import axios from 'axios'
import { call, put } from 'redux-saga/effects'


export function* loginHandler(action) {
  try {
    let result = yield call(axios.post, "http://localhost:8000/users/signin", action.data)
    
    localStorage.setItem("username", result.data.username)
    localStorage.setItem("usertype", result.data.usertype)
    localStorage.setItem("token", result.data.token)

    yield put({
      type: "LOGIN_SUCCESS", data:
      {
        username: result.data.username,
        usertype: result.data.usertype,
        token: result.data.token
      }
    })
  }
  catch (e) {
    yield put({ type: "LOGIN_FAILURE" })
  }

}

export function* managerHandler(action) {
  try {
    const username =  localStorage.getItem("username")
    const UserDetail = { manager: username };
    let result = yield call(axios.post, "http://localhost:8000/users/manager",UserDetail)
    
    yield put({ type: "LOAD_EMPLOYEE", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }

}
export function* managerUpdateHandler(action) {
  try {
    let result = yield call(axios.post, "http://localhost:8000/users/updateEmployeeLockRequest", action.data)
    yield put({ type: "SEND_REQUEST", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }
}

export function* wfm_managerHandler(action) {
  

  const username =  localStorage.getItem("username")
  const UserDetail = { manager: username };
  try {
    let result = yield call(axios.post, "http://localhost:8000/users/WfmmanagerList",UserDetail)
    yield put({ type: "PENDING_APPROVAL", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }

}

export function* softStatusHandler(action) {
  
  try {
    let result = yield call(axios.post, "http://localhost:8000/users/softlockstatus", action.data)
    
    yield put({ type: "LOCK_STATUS", data: result.data })
  }
  catch (e) {
    console.log(e,"LockStatus");
    yield put({ type: "FAILURE" })
  }
}
