package com.learn.product.controller;
import com.learn.product.dto.ProductDTO;
import com.learn.product.model.Product;
import com.learn.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() { return productService.getAllProducts(); }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Product> getProductsByUser(@PathVariable Long userId) {
        return productService.getProductsByUserId(userId);
    }

    @PostMapping
    public Product createProduct(@RequestBody ProductDTO dto) { return productService.createProduct(dto); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
