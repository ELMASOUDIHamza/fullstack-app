package com.crud.fullstack_crud.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Couldn't found user with id : "+id);
    }
}
