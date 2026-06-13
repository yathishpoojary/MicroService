package com.learn.product.service;
import com.learn.product.dto.ProductDTO;
import com.learn.product.model.Product;
import com.learn.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired private ProductRepository productRepository;

    public List<Product> getAllProducts() { return productRepository.findAll(); }
    public Optional<Product> getProductById(Long id) { return productRepository.findById(id); }
    public List<Product> getProductsByUserId(Long userId) { return productRepository.findByUserId(userId); }

    public Product createProduct(ProductDTO dto) {
        Product p = new Product();
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        p.setUserId(dto.getUserId());
        return productRepository.save(p);
    }

    public void deleteProduct(Long id) { productRepository.deleteById(id); }
}
