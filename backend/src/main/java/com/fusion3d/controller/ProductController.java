package com.fusion3d.controller;

import com.fusion3d.dto.ReviewRequest;
import com.fusion3d.model.Product;
import com.fusion3d.model.ProductReview;
import com.fusion3d.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {

        if (category != null && !category.isBlank() && !"all".equalsIgnoreCase(category)) {
            return ResponseEntity.ok(productService.getProductsByCategory(category));
        }
        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(productService.searchProducts(search));
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product created = productService.createProduct(product);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        Product updated = productService.updateProduct(id, product);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/discount")
    public ResponseEntity<Product> updateDiscount(
            @PathVariable String id,
            @RequestBody Map<String, Object> payload) {

        double discountPercent = 0.0;
        Double originalPrice = null;

        if (payload.containsKey("discountPercent")) {
            discountPercent = Double.parseDouble(payload.get("discountPercent").toString());
        }
        if (payload.containsKey("originalPrice") && payload.get("originalPrice") != null) {
            originalPrice = Double.parseDouble(payload.get("originalPrice").toString());
        }

        Product updated = productService.updateDiscount(id, discountPercent, originalPrice);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<ProductReview> addReview(
            @PathVariable String id,
            @RequestBody ReviewRequest request) {

        request.setProductId(id);
        ProductReview review = productService.addReview(request);
        return ResponseEntity.ok(review);
    }
}
