package com.fusion3d.controller;

import com.fusion3d.model.CustomInquiry;
import com.fusion3d.service.InquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @GetMapping
    public ResponseEntity<List<CustomInquiry>> getInquiries(@RequestParam(required = false) String customerEmail) {
        if (customerEmail != null && !customerEmail.isBlank()) {
            return ResponseEntity.ok(inquiryService.getInquiriesByCustomer(customerEmail));
        }
        return ResponseEntity.ok(inquiryService.getAllInquiries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomInquiry> getInquiryById(@PathVariable String id) {
        return inquiryService.getInquiryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CustomInquiry> createInquiry(@RequestBody CustomInquiry inquiry) {
        CustomInquiry created = inquiryService.createInquiry(inquiry);
        return ResponseEntity.ok(created);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<CustomInquiry> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> payload) {

        String status = payload.getOrDefault("status", "Pending Review");
        CustomInquiry updated = inquiryService.updateStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}
