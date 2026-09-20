package com.fusion3d.controller;

import com.fusion3d.model.Printer;
import com.fusion3d.service.PrinterService;
import com.fusion3d.service.S3StorageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class PrinterControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PrinterService printerService;

    @MockBean
    private S3StorageService s3StorageService;

    @Test
    void testGetAllPrinters() throws Exception {
        Printer p = new Printer("PRINTER-BAMBU-A1", "Bambu Lab A1 (AMS Lite)", "CoreXY", "Printing", "ORD-8821", "Job 1", "100/200", 50, "15m", "220C", "65C", List.of("#FFFFFF"), "Daytime");
        when(printerService.getAllPrinters()).thenReturn(List.of(p));

        mockMvc.perform(get("/api/printers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("PRINTER-BAMBU-A1"))
                .andExpect(jsonPath("$[0].status").value("Printing"));
    }
}
