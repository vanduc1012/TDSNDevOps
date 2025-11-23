package com.quanlytro.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {
    @NotBlank(message = "Tên phòng không được để trống")
    @Size(max = 200, message = "Tên phòng không được quá 200 ký tự")
    private String name;
    
    @NotBlank(message = "Địa chỉ không được để trống")
    @Size(max = 500, message = "Địa chỉ không được quá 500 ký tự")
    private String address;
    
    @NotNull(message = "Giá phòng không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giá phòng phải lớn hơn 0")
    private BigDecimal price;
    
    @NotNull(message = "Diện tích không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Diện tích phải lớn hơn 0")
    private BigDecimal area;
    
    @Min(value = 1, message = "Số phòng ngủ phải lớn hơn 0")
    private Integer bedrooms;
    
    @Min(value = 1, message = "Số phòng tắm phải lớn hơn 0")
    private Integer bathrooms;
    
    private List<String> amenities;
    
    private List<String> images;
    
    private String description;
    
    private String district;
    
    private String city;
    
    private String ward;
}

