package com.nvm.prac1.core.student.controller;

import com.nvm.prac1.core.common.ResponseModel;
import com.nvm.prac1.core.student.model.request.StudentRequest;
import com.nvm.prac1.core.student.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllStudent(){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.getAllStudent());
    }

    @PostMapping("/post-student")
    public ResponseEntity<?> postStudent(@ModelAttribute @Valid StudentRequest studentRequest){
        ResponseModel responseModel = studentService.postStudent(studentRequest);
        return new ResponseEntity<>(responseModel,responseModel.getStatus());
    }

    @PutMapping("/put-student/{id}")
    public ResponseEntity<?> putStudent(@PathVariable Long id,@ModelAttribute @Valid StudentRequest studentRequest){
        ResponseModel responseModel = studentService.putStudent(id,studentRequest);
        return new ResponseEntity<>(responseModel,responseModel.getStatus());
    }

    @DeleteMapping("/delete-student/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id){
        ResponseModel responseModel = studentService.deleteStudent(id);
        return new ResponseEntity<>(responseModel,responseModel.getStatus());
    }

}
