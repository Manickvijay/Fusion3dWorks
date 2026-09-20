package com.fusion3d.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fusion3d.dto.CreateOrderDto;
import com.fusion3d.dto.OrderItemDto;
import com.fusion3d.dto.OrderStatusUpdateRequest;
import com.fusion3d.model.Order;
import com.fusion3d.model.OrderTimelineStep;
import com.fusion3d.service.OrderService;
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
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    @MockBean
    private S3StorageService s3StorageService;

    private Order testOrder;

    @BeforeEach
    void setUp() {
        testOrder = new Order();
        testOrder.setId("ORD-9999");
        testOrder.setCustomerName("Alex Rivera");
        testOrder.setCustomerEmail("user@gmail.com");
        testOrder.setSubtotal(29.99);
        testOrder.setTotal(29.99);
        testOrder.setStatus("Order Placed");
        testOrder.setStatusProgress(10);
        testOrder.setTimeline(List.of(new OrderTimelineStep(testOrder, "Order Placed", "12:00", true, "Order received")));
    }

    @Test
    void testGetOrders() throws Exception {
        when(orderService.getAllOrders()).thenReturn(List.of(testOrder));

        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("ORD-9999"))
                .andExpect(jsonPath("$[0].status").value("Order Placed"));
    }

    @Test
    void testGetOrderById() throws Exception {
        when(orderService.getOrderById("ORD-9999")).thenReturn(Optional.of(testOrder));

        mockMvc.perform(get("/api/orders/ORD-9999"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("ORD-9999"))
                .andExpect(jsonPath("$.customerEmail").value("user@gmail.com"));
    }

    @Test
    void testCreateOrder() throws Exception {
        CreateOrderDto dto = new CreateOrderDto();
        dto.setCustomerName("Alex Rivera");
        dto.setCustomerEmail("user@gmail.com");
        dto.setTotal(29.99);

        OrderItemDto item = new OrderItemDto();
        item.setProductId("prod-keychain-dual");
        item.setName("Dual Keychain");
        item.setPrice(12.99);
        item.setQuantity(1);
        dto.setItems(List.of(item));

        when(orderService.createOrder(any(CreateOrderDto.class))).thenReturn(testOrder);

        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("ORD-9999"));
    }

    @Test
    void testUpdateOrderStatus() throws Exception {
        OrderStatusUpdateRequest update = new OrderStatusUpdateRequest();
        update.setStatus("Design Stage");
        update.setNote("Extruding geometry");

        testOrder.setStatus("Design Stage");
        when(orderService.updateOrderStatus(eq("ORD-9999"), any(OrderStatusUpdateRequest.class))).thenReturn(testOrder);

        mockMvc.perform(patch("/api/orders/ORD-9999/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(update)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("Design Stage"));
    }

    @Test
    void testCancelOrder() throws Exception {
        testOrder.setStatus("Cancelled");
        when(orderService.cancelOrder(eq("ORD-9999"), any())).thenReturn(testOrder);

        mockMvc.perform(post("/api/orders/ORD-9999/cancel")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("reason", "Changed mind"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("Cancelled"));
    }
}
