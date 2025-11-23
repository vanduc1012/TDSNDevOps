package com.quanlytro.dto;

import com.quanlytro.model.RoomStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private String id;
    private String name;
    private String address;
    private BigDecimal price;
    private BigDecimal area;
    private Integer bedrooms;
    private Integer bathrooms;
    private List<String> amenities;
    private List<String> images;
    private Boolean available;
    private RoomStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String description;
    private String district;
    private String city;
    private String ward;
}

