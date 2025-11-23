package com.quanlytro.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillRequest {
    @NotBlank(message = "Room ID không được để trống")
    private String roomId;
    
    @NotBlank(message = "Tháng không được để trống")
    @Pattern(regexp = "^\\d{4}-\\d{2}$", message = "Tháng phải có định dạng YYYY-MM")
    private String month;
    
    @NotNull(message = "Số điện không được để trống")
    @DecimalMin(value = "0.0", message = "Số điện phải lớn hơn hoặc bằng 0")
    private BigDecimal electricity;
    
    @NotNull(message = "Số nước không được để trống")
    @DecimalMin(value = "0.0", message = "Số nước phải lớn hơn hoặc bằng 0")
    private BigDecimal water;
    
    private String description;
    
    @NotNull(message = "Tổng tiền không được để trống")
    @DecimalMin(value = "0.0", message = "Tổng tiền phải lớn hơn hoặc bằng 0")
    private BigDecimal amount;
}

