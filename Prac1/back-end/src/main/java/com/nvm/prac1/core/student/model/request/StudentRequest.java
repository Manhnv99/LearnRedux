package com.nvm.prac1.core.student.model.request;

import com.nvm.prac1.infrastructure.constant.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentRequest {

    @NotBlank(message = "Tên không được trống!")
    @Length(min = 5 ,message = "Tên độ dài ít nhất 5 kí tự!")
    private String name;

    @NotBlank(message = "Email không được trống!")
    @Length(min = 10 ,message = "Email độ dài ít nhất 10 kí tự!")
    private String email;

    @NotNull(message = "Bạn chưa chọn giới tính!")
    private Boolean gender;

    @NotNull(message = "Bạn chưa chọn trạng thái!")
    private Status status;

    @NotNull(message = "Ngày sinh không được để trống!")
    private LocalDate birthDay;
}
