package com.nvm.prac1.core.student.service;


import com.nvm.prac1.core.common.ResponseModel;
import com.nvm.prac1.core.student.model.request.StudentRequest;
import com.nvm.prac1.core.student.model.response.StudentResponse;

import java.util.List;

public interface StudentService {

    ResponseModel postStudent(StudentRequest studentRequest);

    ResponseModel putStudent(Long student_id,StudentRequest studentRequest);

    List<StudentResponse> getAllStudent();

    ResponseModel deleteStudent(Long student_id);

}
