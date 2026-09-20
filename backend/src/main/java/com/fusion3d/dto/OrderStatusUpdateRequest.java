package com.fusion3d.dto;

public class OrderStatusUpdateRequest {
    private String status;
    private String note;
    private String assignedPrinter;
    private String printerId;
    private String timeLeft;
    private String deliveryPartner;
    private String trackingNumber;

    // Design proof updates
    private String designProofImage;
    private String designProofNotes;
    private Boolean designProofApproved;

    public OrderStatusUpdateRequest() {}

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getAssignedPrinter() {
        return assignedPrinter;
    }

    public void setAssignedPrinter(String assignedPrinter) {
        this.assignedPrinter = assignedPrinter;
    }

    public String getPrinterId() {
        return printerId;
    }

    public void setPrinterId(String printerId) {
        this.printerId = printerId;
    }

    public String getTimeLeft() {
        return timeLeft;
    }

    public void setTimeLeft(String timeLeft) {
        this.timeLeft = timeLeft;
    }

    public String getDeliveryPartner() {
        return deliveryPartner;
    }

    public void setDeliveryPartner(String deliveryPartner) {
        this.deliveryPartner = deliveryPartner;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getDesignProofImage() {
        return designProofImage;
    }

    public void setDesignProofImage(String designProofImage) {
        this.designProofImage = designProofImage;
    }

    public String getDesignProofNotes() {
        return designProofNotes;
    }

    public void setDesignProofNotes(String designProofNotes) {
        this.designProofNotes = designProofNotes;
    }

    public Boolean getDesignProofApproved() {
        return designProofApproved;
    }

    public void setDesignProofApproved(Boolean designProofApproved) {
        this.designProofApproved = designProofApproved;
    }
}
