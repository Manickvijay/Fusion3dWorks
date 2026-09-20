package com.fusion3d.service;

import com.fusion3d.dto.FileUploadResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3StorageService {

    private static final Logger logger = LoggerFactory.getLogger(S3StorageService.class);

    private final S3Client s3Client;

    @Value("${cloud.aws.s3.bucket-name:fusion3d-storage}")
    private String bucketName;

    @Value("${cloud.aws.s3.endpoint}")
    private String endpoint;

    public S3StorageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    /**
     * Ensure the target S3 bucket exists, or create it.
     */
    public void ensureBucketExists() {
        try {
            HeadBucketRequest headBucketRequest = HeadBucketRequest.builder()
                    .bucket(bucketName)
                    .build();
            s3Client.headBucket(headBucketRequest);
            logger.info("S3 Bucket '{}' exists and is accessible.", bucketName);
        } catch (NoSuchBucketException e) {
            try {
                logger.info("Bucket '{}' does not exist. Creating bucket...", bucketName);
                CreateBucketRequest createBucketRequest = CreateBucketRequest.builder()
                        .bucket(bucketName)
                        .build();
                s3Client.createBucket(createBucketRequest);
                logger.info("S3 Bucket '{}' created successfully.", bucketName);
            } catch (Exception ex) {
                logger.warn("Could not create bucket automatically: {}", ex.getMessage());
            }
        } catch (Exception e) {
            logger.warn("Checking bucket '{}' gave warning: {}. S3 operations will continue.", bucketName, e.getMessage());
        }
    }

    /**
     * Upload an image, 3D model (STL/OBJ/3MF), or design proof to Neon S3 Storage.
     */
    public FileUploadResponse uploadFile(MultipartFile file, String folder) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload an empty file");
        }

        ensureBucketExists();

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String sanitizedFolder = (folder == null || folder.isBlank()) ? "uploads" : folder.replaceAll("[^a-zA-Z0-9_-]", "");
        String uniqueKey = sanitizedFolder + "/" + UUID.randomUUID() + extension;

        String contentType = file.getContentType();
        if (contentType == null || contentType.isBlank()) {
            if (extension.equalsIgnoreCase(".stl")) contentType = "model/stl";
            else if (extension.equalsIgnoreCase(".obj")) contentType = "model/obj";
            else if (extension.equalsIgnoreCase(".3mf")) contentType = "model/3mf";
            else if (extension.equalsIgnoreCase(".step") || extension.equalsIgnoreCase(".stp")) contentType = "model/step";
            else contentType = "application/octet-stream";
        }

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(uniqueKey)
                .contentType(contentType)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        // Formulate accessible URL
        String fileUrl = endpoint.replaceAll("/+$", "") + "/" + bucketName + "/" + uniqueKey;

        logger.info("Successfully uploaded '{}' to S3 as key: {}", originalFilename, uniqueKey);

        return FileUploadResponse.success(fileUrl, originalFilename, file.getSize(), contentType);
    }

    /**
     * Delete an object from S3.
     */
    public void deleteFile(String fileUrlOrKey) {
        if (fileUrlOrKey == null || fileUrlOrKey.isBlank()) return;

        String key = fileUrlOrKey;
        if (fileUrlOrKey.contains("/" + bucketName + "/")) {
            key = fileUrlOrKey.substring(fileUrlOrKey.indexOf("/" + bucketName + "/") + bucketName.length() + 2);
        }

        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
            logger.info("Deleted object key '{}' from bucket '{}'", key, bucketName);
        } catch (Exception e) {
            logger.error("Failed to delete S3 file with key '{}': {}", key, e.getMessage());
        }
    }
}
