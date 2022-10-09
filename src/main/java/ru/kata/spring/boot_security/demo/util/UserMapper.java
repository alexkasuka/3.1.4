package ru.kata.spring.boot_security.demo.util;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.model.User;

/**
 * @author Alex Zarubin
 * created on 09.10.2022
 */
@Component
public class UserMapper {
    public UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getFullname(), user.getAge(), user.getEmail(), user.getPassword(), user.getRoles());
    }


    public User toUser(UserDTO userDTO) {
        return new User(userDTO.getUsername(), userDTO.getFullname(), userDTO.getAge(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getRoles());
    }
}
