package com.fusion3d.service;

import com.fusion3d.dto.FileUploadResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class S3StorageServiceTest {

    @Mock
    private S3Client s3Client;

    private S3StorageService s3StorageService;

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
        s3StorageService = new S3StorageService(s3Client);

        // Set private fields via reflection for unit test
        Field bucketField = S3StorageService.class.getDeclaredField("bucketName");
        bucketField.setAccessible(true);
        bucketField.set(s3StorageService, "fusion3d-storage");

        Field endpointField = S3StorageService.class.getDeclaredField("endpoint");
        endpointField.setAccessible(true);
        endpointField.set(s3StorageService, "https://br-blue-bar-b5l8v16s.storage.c-7.us-east-2.aws.neon.tech");
    }

    @Test
    void testUploadFile_Success() throws IOException {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "custom_keychain.stl",
                "model/stl",
                "solid keychain facet normal ... endsolid".getBytes()
        );

        when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                .thenReturn(PutObjectResponse.builder().build());

        FileUploadResponse response = s3StorageService.uploadFile(file, "models");

        assertNotNull(response);
        assertTrue(response.isSuccess());
        assertEquals("custom_keychain.stl", response.getFileName());
        assertTrue(response.getFileUrl().contains("fusion3d-storage/models/"));
        assertTrue(response.getFileUrl().endsWith(".stl"));
    }

    @Test
    void testUploadFile_EmptyFileThrowsException() {
        MockMultipartFile emptyFile = new MockMultipartFile("file", "empty.stl", "model/stl", new byte[0]);

        assertThrows(IllegalArgumentException.class, () -> {
            s3StorageService.uploadFile(emptyFile, "models");
        });
    }
}
