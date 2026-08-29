package com.example.medisenseai.department.dto;

public class DepartmentResponse {

    private Long id;
    private String name;
    private String code;
    private String description;
    private boolean active;

    public DepartmentResponse() {
    }

    public DepartmentResponse(
            Long id,
            String name,
            String code,
            String description,
            boolean active
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}