import {GET_ALL_STUDENT, POST_STUDENT} from "../types/StudentTypes";


const INITIAL_STATE = {
    listStudent:[],
    isLoading:false
}

export const StudentReducer = (state = INITIAL_STATE , action) =>{
    switch (action.type){
        case GET_ALL_STUDENT:
            return {
                ...state,
                listStudent: action.payload
            }
        default:
            return state
    }
}