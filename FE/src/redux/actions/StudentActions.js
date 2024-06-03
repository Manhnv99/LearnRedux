import {GET_ALL_STUDENT} from "../types/StudentTypes";
import {getAllStudentAPI} from "../../apis/StudentAPI";


export const getAllStudentAction = () =>{
    return async (dispatch,getState)=>{
        const response = await getAllStudentAPI();
        dispatch({
            type:GET_ALL_STUDENT,
            payload:response.data
        });
    }
}

