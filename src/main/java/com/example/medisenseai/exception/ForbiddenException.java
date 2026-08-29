package com.example.medisenseai.exception;


public class ForbiddenException extends RuntimeException {

    public ForbiddenException(String message) {
        super(message);
    }
}