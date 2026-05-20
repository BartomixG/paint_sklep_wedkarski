package com.example.sklepwedkarski.service;

import com.example.sklepwedkarski.entity.Order;
import com.example.sklepwedkarski.entity.User;
import com.example.sklepwedkarski.entity.UserRole;
import com.example.sklepwedkarski.repository.OrderRepository;
import com.example.sklepwedkarski.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Optional<User> registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return Optional.empty();
        }
        user.setUserRole(UserRole.USER);
        return Optional.of(userRepository.save(user));
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public Optional<User> updateUser(Integer id, User updatedUser) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public boolean deleteUser(Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<List<Order>> getUserOrders(Integer id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(value -> orderRepository.findByUser(value));
    }
}
