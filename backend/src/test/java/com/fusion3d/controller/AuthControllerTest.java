package com.fusion3d.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fusion3d.dto.AuthRequest;
import com.fusion3d.dto.AuthResponse;
import com.fusion3d.model.User;
import com.fusion3d.service.AuthService;
import com.fusion3d.service.S3StorageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private S3StorageService s3StorageService;

    @Test
    void testLoginSuccess() throws Exception {
        User user = new User("USR-101", "Alex Rivera", "user@gmail.com", "Pass1234", "customer", null, null, null, null, "Active");
        AuthResponse response = AuthResponse.success("customer", user);

        when(authService.login(any(AuthRequest.class))).thenReturn(response);

        AuthRequest request = new AuthRequest("user@gmail.com", "Pass1234");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.role").value("customer"))
                .andExpect(jsonPath("$.user.email").value("user@gmail.com"));
    }

    @Test
    void testLoginInvalidCredentials() throws Exception {
        AuthResponse response = AuthResponse.error("Invalid password credentials.");
        when(authService.login(any(AuthRequest.class))).thenReturn(response);

        AuthRequest request = new AuthRequest("user@gmail.com", "WrongPassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Invalid password credentials."));
    }
}
