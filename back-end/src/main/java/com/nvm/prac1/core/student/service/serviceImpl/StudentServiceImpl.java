package com.nvm.prac1.core.student.service.serviceImpl;

import com.nvm.prac1.core.common.ResponseModel;
import com.nvm.prac1.core.student.model.request.StudentRequest;
import com.nvm.prac1.core.student.model.response.StudentResponse;
import com.nvm.prac1.core.student.repository.DBStudentRepository;
import com.nvm.prac1.core.student.service.StudentService;
import com.nvm.prac1.entity.Student;
import com.nvm.prac1.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private DBStudentRepository studentRepository;

    @Override
    public ResponseModel postStudent(StudentRequest studentRequest) {
        Optional<Student> studentOptional = studentRepository.getByEmail(studentRequest.getEmail());

        if(studentOptional.isPresent()){
            return new ResponseModel(HttpStatus.CONFLICT,"Email này đã tồn tại!");
        }

        Student postStudent = new Student();
        postStudent.setName(studentRequest.getName());
        postStudent.setEmail(studentRequest.getEmail());
        postStudent.setGender(studentRequest.getGender());
        postStudent.setBirthDay(studentRequest.getBirthDay());
        postStudent.setStatus(studentRequest.getStatus());

        studentRepository.save(postStudent);

        return new ResponseModel(HttpStatus.CREATED,"Thêm Mới Sinh Viên Thành Công!");
    }

    @Override
    public ResponseModel putStudent(Long student_id, StudentRequest studentRequest) {
        Optional<Student> studentById = studentRepository.findById(student_id);

        Optional<Student> studentOptional = studentRepository.getByEmail(studentRequest.getEmail());

        if(!studentById.get().getEmail().equalsIgnoreCase(studentRequest.getEmail())){
            if(studentOptional.isPresent()){
                return new ResponseModel(HttpStatus.CONFLICT,"Email này đã tồn tại!");
            }
        }

        Student putStudent = studentById.get();
        putStudent.setName(studentRequest.getName());
        putStudent.setEmail(studentRequest.getEmail());
        putStudent.setGender(studentRequest.getGender());
        putStudent.setBirthDay(studentRequest.getBirthDay());
        putStudent.setStatus(studentRequest.getStatus());

        studentRepository.save(putStudent);

        return new ResponseModel(HttpStatus.OK,"Cập Nhật Sinh Viên Thành Công!");
    }

    @Override
    public List<StudentResponse> getAllStudent() {
        return studentRepository.getAllStudent();
    }

    @Override
    public ResponseModel deleteStudent(Long student_id) {
        studentRepository.deleteById(student_id);
        return new ResponseModel(HttpStatus.OK,"Xóa Sinh Viên Thành Công!");
    }
}
