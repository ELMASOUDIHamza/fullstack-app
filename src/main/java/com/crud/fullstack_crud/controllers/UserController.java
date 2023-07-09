package com.crud.fullstack_crud.controllers;

import com.crud.fullstack_crud.entities.User;
import com.crud.fullstack_crud.exceptions.UserNotFoundException;
import com.crud.fullstack_crud.repositories.UserRepsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    final
    UserRepsitory userRepsitory;

    public UserController(UserRepsitory userRepsitory) {
        this.userRepsitory = userRepsitory;
    }

    @GetMapping("/users")
    public List<User> getAllUsers (){
        return userRepsitory.findAll();
    }

    @GetMapping("users/{id}")
    public User getUser(@PathVariable Long id){
        return userRepsitory.findById(id)
                .orElseThrow( ()-> new UserNotFoundException(id) );

    }

    @PutMapping("/users/{id}")
    public User updateUser (@PathVariable Long id, @RequestBody User newUser){
        /*user.setId(id);
        userRepsitory.save(user);*/
        return userRepsitory.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setFullname(newUser.getFullname());
                    user.setEmail(newUser.getEmail());
                    return userRepsitory.save(user);
                }).orElseThrow(()-> new UserNotFoundException(id));
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user){
        return userRepsitory.save(user);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser (@PathVariable long id){
        if(!userRepsitory.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepsitory.deleteById(id);
        return "User with id "+id+" deleted successfully !";
    }

}
