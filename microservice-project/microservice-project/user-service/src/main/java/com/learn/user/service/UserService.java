package com.learn.user.service;
import com.learn.user.dto.UserDTO;
import com.learn.user.kafka.UserEventProducer;
import com.learn.user.model.User;
import com.learn.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private UserEventProducer userEventProducer;

    public List<User> getAllUsers() { return userRepository.findAll(); }
    public Optional<User> getUserById(Long id) { return userRepository.findById(id); }

    public User createUser(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        User saved = userRepository.save(user);
        userEventProducer.sendUserCreatedEvent(saved);
        return saved;
    }

    public void deleteUser(Long id) { userRepository.deleteById(id); }
}
