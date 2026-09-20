package com.fusion3d.repository;

import com.fusion3d.model.CustomInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomInquiryRepository extends JpaRepository<CustomInquiry, String> {
    List<CustomInquiry> findByCustomerEmailIgnoreCaseOrderByCreatedAtDesc(String customerEmail);
    List<CustomInquiry> findAllByOrderByCreatedAtDesc();
}
