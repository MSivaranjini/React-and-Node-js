
export const loginReducer=(state={username:"NA",token:"NA",usertype:"NA",message:""},action)=>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {...action.data,message:""};
        case "LOGIN_FAILURE":
            return {...state,message:"Login Credentials incorrect"}
        default:
            return state
    }
}

export const managerReducer=(state={employeeData:[]},action)=>{
    switch(action.type){
        case "LOAD_EMPLOYEE":
            return {employeeData:action.data};
        default:
                 return state;
    }
}

export const wfmManagerReducer = (state={wfmData:[]},action)=>{
    switch (action.type){
        case "PENDING_APPROVAL":
            return { wfmData: action.data };
        default:
            return state;
    }
}