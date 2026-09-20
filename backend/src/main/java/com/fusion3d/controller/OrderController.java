package com.fusion3d.controller;

import com.fusion3d.dto.AssignPrinterRequest;
import com.fusion3d.dto.CreateOrderDto;
import com.fusion3d.dto.OrderStatusUpdateRequest;
import com.fusion3d.model.Order;
import com.fusion3d.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(@RequestParam(required = false) String customerEmail) {
        if (customerEmail != null && !customerEmail.isBlank()) {
            return ResponseEntity.ok(orderService.getOrdersByCustomerEmail(customerEmail));
        }
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderDto dto) {
        Order created = orderService.createOrder(dto);
        return ResponseEntity.ok(created);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String id,
            @RequestBody OrderStatusUpdateRequest request) {

        Order updated = orderService.updateOrderStatus(id, request);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(
            @PathVariable String id,
            @RequestBody(required = false) Map<String, String> payload) {

        String reason = payload != null && payload.containsKey("reason")
                ? payload.get("reason")
                : "Customer requested cancellation";

        Order cancelled = orderService.cancelOrder(id, reason);
        return ResponseEntity.ok(cancelled);
    }

    @PostMapping("/{id}/approve-proof")
    public ResponseEntity<Order> customerApproveDesign(@PathVariable String id) {
        Order approved = orderService.customerApproveDesign(id);
        return ResponseEntity.ok(approved);
    }

    @PostMapping("/{id}/request-proof-changes")
    public ResponseEntity<Order> customerRequestDesignChanges(
            @PathVariable String id,
            @RequestBody Map<String, String> payload) {

        String feedback = payload != null ? payload.getOrDefault("feedback", "Customer requested geometry adjustments") : "Customer requested geometry adjustments";
        Order updated = orderService.customerRequestDesignChanges(id, feedback);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/assign-printer")
    public ResponseEntity<Order> assignToPrinter(
            @PathVariable String id,
            @RequestBody AssignPrinterRequest request) {

        Order updated = orderService.assignOrderToPrinter(id, request.getPrinterId(), request.getTimeShift());
        return ResponseEntity.ok(updated);
    }
}
