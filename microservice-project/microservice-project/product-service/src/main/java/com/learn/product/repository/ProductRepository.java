package com.learn.product.repository;
import com.learn.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {}
