package com.fusion3d.service;

import com.fusion3d.model.Printer;
import com.fusion3d.repository.PrinterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PrinterService {

    private final PrinterRepository printerRepository;

    public PrinterService(PrinterRepository printerRepository) {
        this.printerRepository = printerRepository;
    }

    @Transactional(readOnly = true)
    public List<Printer> getAllPrinters() {
        return printerRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Printer> getPrinterById(String id) {
        return printerRepository.findById(id);
    }

    @Transactional
    public Printer updatePrinter(String id, Printer updatedFields) {
        Printer printer = printerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Printer not found with id: " + id));

        if (updatedFields.getStatus() != null) printer.setStatus(updatedFields.getStatus());
        if (updatedFields.getCurrentJobId() != null) printer.setCurrentJobId(updatedFields.getCurrentJobId());
        if (updatedFields.getCurrentJobName() != null) printer.setCurrentJobName(updatedFields.getCurrentJobName());
        if (updatedFields.getLayerProgress() != null) printer.setLayerProgress(updatedFields.getLayerProgress());
        if (updatedFields.getPercentage() >= 0) printer.setPercentage(updatedFields.getPercentage());
        if (updatedFields.getTimeLeft() != null) printer.setTimeLeft(updatedFields.getTimeLeft());
        if (updatedFields.getTempNozzle() != null) printer.setTempNozzle(updatedFields.getTempNozzle());
        if (updatedFields.getTempBed() != null) printer.setTempBed(updatedFields.getTempBed());
        if (updatedFields.getPreferredShift() != null) printer.setPreferredShift(updatedFields.getPreferredShift());
        if (updatedFields.getSpoolColors() != null && !updatedFields.getSpoolColors().isEmpty()) {
            printer.setSpoolColors(updatedFields.getSpoolColors());
        }

        return printerRepository.save(printer);
    }

    @Transactional
    public Printer createPrinter(Printer printer) {
        if (printer.getId() == null || printer.getId().isBlank()) {
            printer.setId("PRINTER-" + System.currentTimeMillis());
        }
        return printerRepository.save(printer);
    }

    @Transactional
    public void deletePrinter(String id) {
        printerRepository.deleteById(id);
    }
}
