package com.backend.services;

import com.backend.entities.Product;
import com.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ProductRepository repo;
    @Override
    public Product addProduct(Product product) {
        return repo.save(product);
    }

    @Override
    public ResponseEntity<Product> updateProduct(Long id, Product product) {
        Optional<Product> p =repo.findById(id);
        if(p.isPresent()){
            Product pr=p.get();
            if (product.getName()!=null)
                pr.setName(product.getName());
            if (product.getCategory()!=null)
                pr.setCategory(product.getCategory());
            if (product.getBrand()!=null)
                pr.setBrand(product.getBrand());
            if (product.getQuantity()!=0)
                pr.setQuantity(product.getQuantity());
            if (product.getPrice()!=0)
                pr.setPrice(product.getPrice());
            if (product.getDescription()!=null)
                pr.setDescription(product.getDescription());
            product.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(repo.save(pr));
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public boolean deleteProduct(Long id) {
        Optional<Product> product=repo.findById(id);
        if (product.isPresent()){
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> products=repo.findAll();
        if (!products.isEmpty()){
            return products;
        }
        return List.of();
    }

    @Override
    public ResponseEntity<Product> getProductById(Long id) {
        Optional<Product> product=repo.findById(id);
        if (product.isPresent()){
            Product pr=product.get();
            return ResponseEntity.ok(pr);
        }
        return ResponseEntity.notFound().build();
    }
}
