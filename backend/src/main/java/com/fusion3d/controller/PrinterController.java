package com.fusion3d.controller;

import com.fusion3d.model.Printer;
import com.fusion3d.service.PrinterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/printers")
public class PrinterController {

    private final PrinterService printerService;

    public PrinterController(PrinterService printerService) {
        this.printerService = printerService;
    }

    @GetMapping
    public ResponseEntity<List<Printer>> getAllPrinters() {
        return ResponseEntity.ok(printerService.getAllPrinters());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Printer> getPrinterById(@PathVariable String id) {
        return printerService.getPrinterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Printer> updatePrinter(@PathVariable String id, @RequestBody Printer printer) {
        return ResponseEntity.ok(printerService.updatePrinter(id, printer));
    }

    @PostMapping
    public ResponseEntity<Printer> createPrinter(@RequestBody Printer printer) {
        return ResponseEntity.ok(printerService.createPrinter(printer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrinter(@PathVariable String id) {
        printerService.deletePrinter(id);
        return ResponseEntity.noContent().build();
    }
}
