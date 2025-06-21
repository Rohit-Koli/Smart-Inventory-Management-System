package com.backend.services;

import com.backend.entities.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product);
    ResponseEntity<Product> updateProduct(Long id, Product product);
    boolean deleteProduct(Long id);
    List<Product> getAllProducts();
    ResponseEntity<Product> getProductById(Long id);
}
