package com.example.medisenseai.department.dto;


import jakarta.validation.constraints.Size;

public class UpdateDepartmentRequest {

    @Size(max = 100, message = "Department name must not exceed 100 characters")
    private String name;

    @Size(max = 20, message = "Department code must not exceed 20 characters")
    private String code;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    private Boolean active;

    public UpdateDepartmentRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}