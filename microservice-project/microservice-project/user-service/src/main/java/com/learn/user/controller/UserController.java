package com.learn.user.controller;
import com.learn.user.dto.UserDTO;
import com.learn.user.dto.UserWithProductsResponse;
import com.learn.user.model.User;
import com.learn.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired private UserService userService;

    @GetMapping
    public List<User> getAllUsers() { return userService.getAllUsers(); }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Aggregated endpoint: User Service calls Product Service (via Feign + Eureka)
    // to combine this user's details with the products they own.
    @GetMapping("/{id}/products")
    public ResponseEntity<UserWithProductsResponse> getUserWithProducts(@PathVariable Long id) {
        return userService.getUserWithProducts(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public User createUser(@RequestBody UserDTO dto) { return userService.createUser(dto); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
