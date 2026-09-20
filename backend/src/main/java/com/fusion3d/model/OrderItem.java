package com.fusion3d.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;

    private String productId;
    private String name;

    @Column(columnDefinition = "TEXT")
    private String image;

    private double price;
    private int quantity = 1;
    private String customText;

    @Column(columnDefinition = "TEXT")
    private String selectedColorsJson;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "order_item_user_images", joinColumns = @JoinColumn(name = "order_item_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    private List<String> userImages = new ArrayList<>();

    private int printTimeMinutes = 45;
    private String category;
    private String material;

    public OrderItem() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

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
