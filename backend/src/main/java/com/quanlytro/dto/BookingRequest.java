package com.quanlytro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    @NotBlank(message = "Room ID không được để trống")
    private String roomId;
    
    @NotNull(message = "Ngày nhận phòng không được để trống")
    private LocalDate checkInDate;
    
    @NotNull(message = "Ngày trả phòng không được để trống")
    private LocalDate checkOutDate;
    
    private String notes;
}

