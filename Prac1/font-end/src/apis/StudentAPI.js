import {instance} from "../utils/axiosCustomize";

export const getAllStudentAPI = () =>{
    return instance.get("/api/v1/student/get-all");
}

export const postStudentAPI = (postStudent) => {
    return instance.post("/api/v1/student/post-student",postStudent);
}

export const putStudentAPI = (student_id,putStudent) => {
    return instance.put(`/api/v1/student/put-student/${student_id}`,putStudent);
}

export const deleteStudentAPI = (student_id) => {
    return instance.delete(`/api/v1/student/delete-student/${student_id}`);
}