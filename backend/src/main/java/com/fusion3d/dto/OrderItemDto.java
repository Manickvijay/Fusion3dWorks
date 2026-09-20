package com.fusion3d.dto;

import java.util.List;

public class OrderItemDto {
    private String productId;
    private String name;
    private String image;
    private double price;
    private int quantity;
    private String customText;
    private String selectedColorsJson;
    private List<String> userImages;
    private int printTimeMinutes = 45;
    private String category;
    private String material;

    public OrderItemDto() {}

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCustomText() {
        return customText;
    }

    public void setCustomText(String customText) {
        this.customText = customText;
    }

    public String getSelectedColorsJson() {
        return selectedColorsJson;
    }

    public void setSelectedColorsJson(String selectedColorsJson) {
        this.selectedColorsJson = selectedColorsJson;
    }

    public List<String> getUserImages() {
        return userImages;
    }

    public void setUserImages(List<String> userImages) {
        this.userImages = userImages;
    }

    public int getPrintTimeMinutes() {
        return printTimeMinutes;
    }

    public void setPrintTimeMinutes(int printTimeMinutes) {
        this.printTimeMinutes = printTimeMinutes;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }
}
