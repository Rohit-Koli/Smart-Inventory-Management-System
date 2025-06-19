package com.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private int quantity;
    private double price;

    private String category;
    private String brand;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity createdBy;
}
