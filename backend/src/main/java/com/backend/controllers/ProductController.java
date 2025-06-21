package com.backend.controllers;

import com.backend.entities.Product;
import com.backend.entities.UserEntity;
import com.backend.services.ProductService;
import com.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService service;
    @Autowired
    private UserService userService;
    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product, @RequestParam Long id){
        UserEntity user= userService.getUserById(id);
        if (user!=null){
            product.setCreatedBy(user);
            product.setCreatedAt(LocalDateTime.now());
            product.setUpdatedAt(LocalDateTime.now());
            Product savedProduct=service.addProduct(product);
            return ResponseEntity.ok(savedProduct);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getProduct")
    public Product getProduct(@RequestParam Long id){
        return service.getProductById(id).getBody();
    }

    @PutMapping("/updateProduct")
    public Product updateProduct(@RequestParam Long id,@RequestBody Product product){
        return service.updateProduct(id,product).getBody();
    }

    @DeleteMapping("/deleteProduct")
    public boolean deleteProduct(@RequestParam Long id){
        return service.deleteProduct(id);
    }

    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts(){
        return service.getAllProducts();
    }
    //POSTMAN REQUEST BE LIKE GET: http://localhost:8081/product/byUser/20
    @GetMapping("/byUser/{id}")
    public List<Product> getProductByUser(@PathVariable Long id){
        return service.getAllProducts().stream()
                .filter(p ->p.getCreatedBy()!=null && p.getCreatedBy().getId().equals(id))
                .collect(Collectors.toList());
    }

}
