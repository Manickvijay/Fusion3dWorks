package com.fusion3d.service;

import com.fusion3d.dto.AuthRequest;
import com.fusion3d.dto.AuthResponse;
import com.fusion3d.model.User;
import com.fusion3d.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public AuthResponse login(AuthRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();
        String password = request.getPassword();

        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(cleanEmail);
        if (userOpt.isEmpty()) {
            // If demo account or new user with valid structure
            if (cleanEmail.contains("@") && password != null && password.length() >= 4) {
                User newUser = new User(
                        "USR-" + System.currentTimeMillis() % 10000,
                        cleanEmail.split("@")[0],
                        cleanEmail,
                        password,
                        "customer",
                        "+1 (555) 000-0000",
                        "Default Shipping Address, USA",
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
                        LocalDate.now().toString(),
                        "Active"
                );
                userRepository.save(newUser);
                return AuthResponse.success("customer", newUser);
            }
            return AuthResponse.error("User not found with email: " + cleanEmail);
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            return AuthResponse.error("Invalid password credentials.");
        }

        return AuthResponse.success(user.getRole(), user);
    }

    @Transactional
    public User register(User user) {
        if (userRepository.existsByEmailIgnoreCase(user.getEmail())) {
            throw new IllegalArgumentException("User with email " + user.getEmail() + " already exists.");
        }
        if (user.getId() == null || user.getId().isBlank()) {
            user.setId("USR-" + (System.currentTimeMillis() % 100000));
        }
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("customer");
        }
        if (user.getStatus() == null) {
            user.setStatus("Active");
        }
        if (user.getRegisteredDate() == null) {
            user.setRegisteredDate(LocalDate.now().toString());
        }
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    @Transactional
    public User updateUser(String id, User updatedFields) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        if (updatedFields.getName() != null) user.setName(updatedFields.getName());
        if (updatedFields.getPhone() != null) user.setPhone(updatedFields.getPhone());
        if (updatedFields.getAddress() != null) user.setAddress(updatedFields.getAddress());
        if (updatedFields.getAvatar() != null) user.setAvatar(updatedFields.getAvatar());
        if (updatedFields.getStatus() != null) user.setStatus(updatedFields.getStatus());
        if (updatedFields.getFavoriteColor() != null) user.setFavoriteColor(updatedFields.getFavoriteColor());

        return userRepository.save(user);
    }
}
