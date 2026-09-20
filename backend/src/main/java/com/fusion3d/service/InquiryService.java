package com.fusion3d.service;

import com.fusion3d.model.CustomInquiry;
import com.fusion3d.repository.CustomInquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class InquiryService {

    private final CustomInquiryRepository inquiryRepository;

    public InquiryService(CustomInquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    @Transactional(readOnly = true)
    public List<CustomInquiry> getAllInquiries() {
        return inquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<CustomInquiry> getInquiriesByCustomer(String email) {
        return inquiryRepository.findByCustomerEmailIgnoreCaseOrderByCreatedAtDesc(email);
    }

    @Transactional(readOnly = true)
    public Optional<CustomInquiry> getInquiryById(String id) {
        return inquiryRepository.findById(id);
    }

    @Transactional
    public CustomInquiry createInquiry(CustomInquiry inquiry) {
        if (inquiry.getId() == null || inquiry.getId().isBlank()) {
            inquiry.setId("INQ-" + (1000 + System.currentTimeMillis() % 9000));
        }
        if (inquiry.getDate() == null) {
            inquiry.setDate(LocalDate.now().toString());
        }
        if (inquiry.getCreatedAt() == null) {
            inquiry.setCreatedAt(System.currentTimeMillis());
        }
        if (inquiry.getStatus() == null) {
            inquiry.setStatus("Pending Review");
        }
        return inquiryRepository.save(inquiry);
    }

    @Transactional
    public CustomInquiry updateStatus(String id, String status) {
        CustomInquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Inquiry not found with id: " + id));
        inquiry.setStatus(status);
        return inquiryRepository.save(inquiry);
    }
}
