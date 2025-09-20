package com.example.pricing_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tour_prices")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Self reference: cha của TourPrice hiện tại
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_price_detail_parent_id")
    private TourPrice parent;

    // Các con (list)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourPrice> children = new ArrayList<>();

    @Column(nullable = false, length = 50)
    private String customerType;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;
}
