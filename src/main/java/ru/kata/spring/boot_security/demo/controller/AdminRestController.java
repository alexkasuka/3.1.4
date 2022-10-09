package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

/**
 * @author Alex Zarubin
 * created on 09.10.2022
 */

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {
    private final UserService userService;
    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping()
    public ResponseEntity<User> create(@RequestBody User user) {
        userService.addUser(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping()
    public ResponseEntity<User> update(@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delete(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
