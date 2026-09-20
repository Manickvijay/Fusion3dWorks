package com.fusion3d.dto;

import com.fusion3d.model.User;

public class AuthResponse {
    private boolean success;
    private String message;
    private String role;
    private User user;

    public AuthResponse() {}

    public AuthResponse(boolean success, String message, String role, User user) {
        this.success = success;
        this.message = message;
        this.role = role;
        this.user = user;
    }

    public static AuthResponse success(String role, User user) {
        return new AuthResponse(true, "Authentication successful", role, user);
    }

    public static AuthResponse error(String message) {
        return new AuthResponse(false, message, null, null);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
