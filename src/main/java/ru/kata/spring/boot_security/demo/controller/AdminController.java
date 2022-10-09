package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    @GetMapping()
    public String adminHomePage(Model model) {
        model.addAttribute("currentUser", userService.getCurrentUser());
        model.addAttribute("allUsers", userService.findAll());
        model.addAttribute("roles", roleService.findAll());
        model.addAttribute("user", new User());
        return "admin";
    }

//    @PostMapping("/new")
//    public String newUser(Model model) {
//        model.addAttribute(userService.getCurrentUser());
//        model.addAttribute("newUser", new User());
//        model.addAttribute("roles", roleService.findAll());
//        return "new";
//    }

    @PostMapping
    public String create(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin";
    }

//    @GetMapping("/edit/{id}")
//    public String edit(Model model, @PathVariable("id") int id) {
//        model.addAttribute("user", userService.getUserById(id));
//        model.addAttribute("roles", roleService.findAll());
//        return "edit";
//    }

    @PatchMapping("{id}")
    public String update(@ModelAttribute("user") User user, @PathVariable("id") int id) {
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return "redirect:/admin";

    }

}
