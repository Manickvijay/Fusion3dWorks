package com.fusion3d.repository;

import com.fusion3d.model.Printer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrinterRepository extends JpaRepository<Printer, String> {
    List<Printer> findByStatus(String status);
}
