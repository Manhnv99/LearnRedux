package com.nvm.prac1.core.student.model.response;

import java.time.LocalDate;


public interface StudentResponse {

    Long getId();

    String getName();

    String getEmail();

    Boolean getGender();

    String getStatus();

    LocalDate getBirthDay();
}
