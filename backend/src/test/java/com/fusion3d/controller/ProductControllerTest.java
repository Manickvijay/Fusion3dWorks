package com.fusion3d.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fusion3d.dto.ReviewRequest;
import com.fusion3d.model.Product;
import com.fusion3d.service.ProductService;
import com.fusion3d.service.S3StorageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductService productService;

    @MockBean
    private S3StorageService s3StorageService;

    private Product testProduct;

    @BeforeEach
    void setUp() {
        testProduct = new Product();
        testProduct.setId("prod-test-keychain");
        testProduct.setName("Custom 3D Test Keychain");
        testProduct.setCategory("3d-keychain");
        testProduct.setPrice(14.99);
        testProduct.setOriginalPrice(19.99);
        testProduct.setRating(5.0);
    }

    @Test
    void testGetAllProducts() throws Exception {
        when(productService.getAllProducts()).thenReturn(List.of(testProduct));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("prod-test-keychain"))
                .andExpect(jsonPath("$[0].name").value("Custom 3D Test Keychain"));
    }

    @Test
    void testGetProductById_Found() throws Exception {
        when(productService.getProductById("prod-test-keychain")).thenReturn(Optional.of(testProduct));

        mockMvc.perform(get("/api/products/prod-test-keychain"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("prod-test-keychain"))
                .andExpect(jsonPath("$.price").value(14.99));
    }

    @Test
    void testGetProductById_NotFound() throws Exception {
        when(productService.getProductById("non-existent")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/products/non-existent"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateProduct() throws Exception {
        when(productService.createProduct(any(Product.class))).thenReturn(testProduct);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testProduct)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("prod-test-keychain"));
    }

    @Test
    void testUpdateDiscount() throws Exception {
        testProduct.setDiscountPercent(20.0);
        testProduct.setPrice(11.99);
        when(productService.updateDiscount(eq("prod-test-keychain"), eq(20.0), any())).thenReturn(testProduct);

        mockMvc.perform(patch("/api/products/prod-test-keychain/discount")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("discountPercent", 20.0))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.discountPercent").value(20.0));
    }
}
