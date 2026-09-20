package com.fusion3d.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    private String category;
    private String categoryLabel;
    private double price;
    private Double originalPrice;
    private Double discountPercent = 0.0;
    private double rating = 5.0;
    private int reviewsCount = 0;
    private String printTime;
    private int printTimeMinutes = 45;
    private String badge;
    private String dimensions;
    private String material;
    private String layerHeight;
    private String weight;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String image;

    private String modelType;
    private boolean allowCustomText = true;
    private String customTextPlaceholder;

    // Customer photo upload requirements
    private boolean requiresUserImage = false;
    private int minImages = 0;
    private int maxImages = 0;

    @Column(columnDefinition = "TEXT")
    private String imageInstructions;

    private String uploadedFileName;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_gallery", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    private List<String> gallery = new ArrayList<>();

    @Column(name = "customizable_sections_json", columnDefinition = "TEXT")
    private String customizableSectionsJson;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ProductReview> reviews = new ArrayList<>();

    public Product() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategoryLabel() {
        return categoryLabel;
    }

    public void setCategoryLabel(String categoryLabel) {
        this.categoryLabel = categoryLabel;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getReviewsCount() {
        return reviewsCount;
    }

    public void setReviewsCount(int reviewsCount) {
        this.reviewsCount = reviewsCount;
    }

    public String getPrintTime() {
        return printTime;
    }

    public void setPrintTime(String printTime) {
        this.printTime = printTime;
    }

    public int getPrintTimeMinutes() {
        return printTimeMinutes;
    }

    public void setPrintTimeMinutes(int printTimeMinutes) {
        this.printTimeMinutes = printTimeMinutes;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public String getDimensions() {
        return dimensions;
    }

    public void setDimensions(String dimensions) {
        this.dimensions = dimensions;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getLayerHeight() {
        return layerHeight;
    }

    public void setLayerHeight(String layerHeight) {
        this.layerHeight = layerHeight;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getModelType() {
        return modelType;
    }

    public void setModelType(String modelType) {
        this.modelType = modelType;
    }

    public boolean isAllowCustomText() {
        return allowCustomText;
    }

    public void setAllowCustomText(boolean allowCustomText) {
        this.allowCustomText = allowCustomText;
    }

    public String getCustomTextPlaceholder() {
        return customTextPlaceholder;
    }

    public void setCustomTextPlaceholder(String customTextPlaceholder) {
        this.customTextPlaceholder = customTextPlaceholder;
    }

    public boolean isRequiresUserImage() {
        return requiresUserImage;
    }

    public void setRequiresUserImage(boolean requiresUserImage) {
        this.requiresUserImage = requiresUserImage;
    }

    public int getMinImages() {
        return minImages;
    }

    public void setMinImages(int minImages) {
        this.minImages = minImages;
    }

    public int getMaxImages() {
        return maxImages;
    }

    public void setMaxImages(int maxImages) {
        this.maxImages = maxImages;
    }

    public String getImageInstructions() {
        return imageInstructions;
    }

    public void setImageInstructions(String imageInstructions) {
        this.imageInstructions = imageInstructions;
    }

    public String getUploadedFileName() {
        return uploadedFileName;
    }

    public void setUploadedFileName(String uploadedFileName) {
        this.uploadedFileName = uploadedFileName;
    }

    public List<String> getGallery() {
        return gallery;
    }

    public void setGallery(List<String> gallery) {
        this.gallery = gallery;
    }

    public String getCustomizableSectionsJson() {
        return customizableSectionsJson;
    }

    public void setCustomizableSectionsJson(String customizableSectionsJson) {
        this.customizableSectionsJson = customizableSectionsJson;
    }

    public List<ProductReview> getReviews() {
        return reviews;
    }

    public void setReviews(List<ProductReview> reviews) {
        this.reviews = reviews;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("customizableSections")
    @Transient
    public Object getCustomizableSections() {
        if (customizableSectionsJson == null || customizableSectionsJson.isBlank()) {
            return new ArrayList<>();
        }
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            return mapper.readValue(customizableSectionsJson, Object.class);
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
