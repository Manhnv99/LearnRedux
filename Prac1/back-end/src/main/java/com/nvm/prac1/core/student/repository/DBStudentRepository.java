package com.nvm.prac1.core.student.repository;

import com.nvm.prac1.core.student.model.response.StudentResponse;
import com.nvm.prac1.entity.Student;
import com.nvm.prac1.repository.StudentRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DBStudentRepository extends StudentRepository {

    @Query(value = """
              SELECT s.id,s.name,s.email,s.gender,s.status,s.birth_day as birthDay FROM student s
              """,nativeQuery = true)
    List<StudentResponse> getAllStudent();

    @Query(value = """
            SELECT * FROM student s WHERE s.email = :email
            """,nativeQuery = true)
    Optional<Student> getByEmail(String email);
}
