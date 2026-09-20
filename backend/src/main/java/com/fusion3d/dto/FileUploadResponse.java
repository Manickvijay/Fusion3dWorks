package com.fusion3d.dto;

public class FileUploadResponse {
    private boolean success;
    private String fileUrl;
    private String fileName;
    private long fileSize;
    private String fileType;
    private String message;

    public FileUploadResponse() {}

    public FileUploadResponse(boolean success, String fileUrl, String fileName, long fileSize, String fileType, String message) {
        this.success = success;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.fileType = fileType;
        this.message = message;
    }

    public static FileUploadResponse success(String fileUrl, String fileName, long fileSize, String fileType) {
        return new FileUploadResponse(true, fileUrl, fileName, fileSize, fileType, "File uploaded successfully to cloud storage");
    }

    public static FileUploadResponse error(String message) {
        return new FileUploadResponse(false, null, null, 0, null, message);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
