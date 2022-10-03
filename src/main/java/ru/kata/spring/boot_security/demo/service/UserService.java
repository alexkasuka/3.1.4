package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

        List<User> findAll();
        User getUserById (int id);
        void addUser (User user);
        User getCurrentUser();
        void deleteUser (int id);
        void updateUser (User user);

}
