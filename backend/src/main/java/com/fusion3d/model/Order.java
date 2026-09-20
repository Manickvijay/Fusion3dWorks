package com.fusion3d.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private String id;

    private String date;
    private String time;
    private Long createdAt;

    private String customerName;
    private String customerEmail;
    private String customerPhone;

    private double subtotal;
    private double shippingFee = 0.0;
    private double total;

    private String paymentMethod;
    private String status; // "Order Placed", "Design Stage", etc.
    private int statusProgress = 10;

    private String estimatedCompletion;
    private String trackingNumber;
    private String deliveryPartner;
    private String assignedPrinter;

    // Design Proof
    @Column(columnDefinition = "TEXT")
    private String designProofImage;
    private String designProofModelType;
    private boolean designProofApproved;
    @Column(columnDefinition = "TEXT")
    private String designProofNotes;
    @Column(columnDefinition = "TEXT")
    private String designProofUserFeedback;

    // Cancellation
    private Long cancelledAt;
    @Column(columnDefinition = "TEXT")
    private String cancellationReason;

    // Review Status
    private boolean isReviewed = false;
    private Integer userRating;

    // Shipping Address
    private String shippingFullName;
    @Column(columnDefinition = "TEXT")
    private String shippingAddress;
    private String shippingCity;
    private String shippingState;
    private String shippingZip;
    private String shippingPhone;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<OrderItem> items = new ArrayList<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<OrderTimelineStep> timeline = new ArrayList<>();

    public Order() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Long createdAt) {
        this.createdAt = createdAt;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public double getShippingFee() {
        return shippingFee;
    }

    public void setShippingFee(double shippingFee) {
        this.shippingFee = shippingFee;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getStatusProgress() {
        return statusProgress;
    }

    public void setStatusProgress(int statusProgress) {
        this.statusProgress = statusProgress;
    }

    public String getEstimatedCompletion() {
        return estimatedCompletion;
    }

    public void setEstimatedCompletion(String estimatedCompletion) {
        this.estimatedCompletion = estimatedCompletion;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getDeliveryPartner() {
        return deliveryPartner;
    }

    public void setDeliveryPartner(String deliveryPartner) {
        this.deliveryPartner = deliveryPartner;
    }

    public String getAssignedPrinter() {
        return assignedPrinter;
    }

    public void setAssignedPrinter(String assignedPrinter) {
        this.assignedPrinter = assignedPrinter;
    }

    public String getDesignProofImage() {
        return designProofImage;
    }

    public void setDesignProofImage(String designProofImage) {
        this.designProofImage = designProofImage;
    }

    public String getDesignProofModelType() {
        return designProofModelType;
    }

    public void setDesignProofModelType(String designProofModelType) {
        this.designProofModelType = designProofModelType;
    }

    public boolean isDesignProofApproved() {
        return designProofApproved;
    }

    public void setDesignProofApproved(boolean designProofApproved) {
        this.designProofApproved = designProofApproved;
    }

    public String getDesignProofNotes() {
        return designProofNotes;
    }

    public void setDesignProofNotes(String designProofNotes) {
        this.designProofNotes = designProofNotes;
    }

    public String getDesignProofUserFeedback() {
        return designProofUserFeedback;
    }

    public void setDesignProofUserFeedback(String designProofUserFeedback) {
        this.designProofUserFeedback = designProofUserFeedback;
    }

    public Long getCancelledAt() {
        return cancelledAt;
    }

    public void setCancelledAt(Long cancelledAt) {
        this.cancelledAt = cancelledAt;
    }

    public String getCancellationReason() {
        return cancellationReason;
    }

    public void setCancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
    }

    public boolean isReviewed() {
        return isReviewed;
    }

    public void setReviewed(boolean reviewed) {
        isReviewed = reviewed;
    }

    public Integer getUserRating() {
        return userRating;
    }

    public void setUserRating(Integer userRating) {
        this.userRating = userRating;
    }

    public String getShippingFullName() {
        return shippingFullName;
    }

    public void setShippingFullName(String shippingFullName) {
        this.shippingFullName = shippingFullName;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getShippingCity() {
        return shippingCity;
    }

    public void setShippingCity(String shippingCity) {
        this.shippingCity = shippingCity;
    }

    public String getShippingState() {
        return shippingState;
    }

    public void setShippingState(String shippingState) {
        this.shippingState = shippingState;
    }

    public String getShippingZip() {
        return shippingZip;
    }

    public void setShippingZip(String shippingZip) {
        this.shippingZip = shippingZip;
    }

    public String getShippingPhone() {
        return shippingPhone;
    }

    public void setShippingPhone(String shippingPhone) {
        this.shippingPhone = shippingPhone;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public List<OrderTimelineStep> getTimeline() {
        return timeline;
    }

    public void setTimeline(List<OrderTimelineStep> timeline) {
        this.timeline = timeline;
    }
}
