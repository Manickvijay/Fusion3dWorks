package com.fusion3d.service;

import com.fusion3d.dto.ReviewRequest;
import com.fusion3d.model.Product;
import com.fusion3d.model.ProductReview;
import com.fusion3d.repository.ProductRepository;
import com.fusion3d.repository.ProductReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductReviewRepository reviewRepository;

    public ProductService(ProductRepository productRepository, ProductReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    @Transactional(readOnly = true)
    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

    @Transactional
    public Product createProduct(Product product) {
        if (product.getId() == null || product.getId().isBlank()) {
            product.setId("prod-" + System.currentTimeMillis());
        }
        if (product.getRating() <= 0) {
            product.setRating(5.0);
        }
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(String id, Product updated) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));

        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getCategory() != null) existing.setCategory(updated.getCategory());
        if (updated.getCategoryLabel() != null) existing.setCategoryLabel(updated.getCategoryLabel());
        if (updated.getPrice() > 0) existing.setPrice(updated.getPrice());
        if (updated.getOriginalPrice() != null) existing.setOriginalPrice(updated.getOriginalPrice());
        if (updated.getDiscountPercent() != null) existing.setDiscountPercent(updated.getDiscountPercent());
        if (updated.getDescription() != null) existing.setDescription(updated.getDescription());
        if (updated.getImage() != null) existing.setImage(updated.getImage());
        if (updated.getBadge() != null) existing.setBadge(updated.getBadge());
        if (updated.getDimensions() != null) existing.setDimensions(updated.getDimensions());
        if (updated.getMaterial() != null) existing.setMaterial(updated.getMaterial());
        if (updated.getLayerHeight() != null) existing.setLayerHeight(updated.getLayerHeight());
        if (updated.getWeight() != null) existing.setWeight(updated.getWeight());
        if (updated.getPrintTime() != null) existing.setPrintTime(updated.getPrintTime());
        if (updated.getPrintTimeMinutes() > 0) existing.setPrintTimeMinutes(updated.getPrintTimeMinutes());
        if (updated.getModelType() != null) existing.setModelType(updated.getModelType());
        if (updated.getCustomTextPlaceholder() != null) existing.setCustomTextPlaceholder(updated.getCustomTextPlaceholder());
        if (updated.getGallery() != null && !updated.getGallery().isEmpty()) existing.setGallery(updated.getGallery());
        if (updated.getCustomizableSectionsJson() != null) existing.setCustomizableSectionsJson(updated.getCustomizableSectionsJson());

        existing.setAllowCustomText(updated.isAllowCustomText());
        existing.setRequiresUserImage(updated.isRequiresUserImage());
        existing.setMinImages(updated.getMinImages());
        existing.setMaxImages(updated.getMaxImages());
        if (updated.getImageInstructions() != null) existing.setImageInstructions(updated.getImageInstructions());
        if (updated.getUploadedFileName() != null) existing.setUploadedFileName(updated.getUploadedFileName());

        return productRepository.save(existing);
    }

    @Transactional
    public Product updateDiscount(String id, double discountPercent, Double customOriginalPrice) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));

        double original = customOriginalPrice != null && customOriginalPrice > 0
                ? customOriginalPrice
                : (product.getOriginalPrice() != null && product.getOriginalPrice() > 0 ? product.getOriginalPrice() : product.getPrice());

        double finalPrice = original;
        if (discountPercent > 0) {
            finalPrice = Math.round((original * (1 - (discountPercent / 100.0))) * 100.0) / 100.0;
        }

        product.setOriginalPrice(original);
        product.setPrice(finalPrice);
        product.setDiscountPercent(discountPercent);

        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public ProductReview addReview(ReviewRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + request.getProductId()));

        String reviewId = "rev-" + System.currentTimeMillis();
        ProductReview review = new ProductReview(
                reviewId,
                product,
                request.getReviewerName() != null ? request.getReviewerName() : "Verified Customer",
                request.getRating(),
                "Just now",
                request.getComment(),
                true,
                request.getUserImages()
        );

        ProductReview savedReview = reviewRepository.save(review);

        // Update product average rating & review count
        int currentCount = product.getReviewsCount();
        double currentRating = product.getRating();
        int newCount = currentCount + 1;
        double newRating = Math.round(((currentRating * currentCount + request.getRating()) / newCount) * 10.0) / 10.0;

        product.setReviewsCount(newCount);
        product.setRating(newRating);
        productRepository.save(product);

        return savedReview;
    }
}
