package com.quanlytro.controller;

import com.quanlytro.dto.BookingRequest;
import com.quanlytro.dto.BookingResponse;
import com.quanlytro.model.Booking;
import com.quanlytro.model.BookingStatus;
import com.quanlytro.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Slf4j
public class BookingControllerV2 {
    
    private final BookingService bookingService;
    
    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        log.info("GET /api/bookings - Getting all bookings");
        List<Booking> bookings = bookingService.getAllBookings();
        List<BookingResponse> responses = bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponse>> getMyBookings() {
        log.info("GET /api/bookings/my-bookings");
        List<Booking> bookings = bookingService.getMyBookings();
        List<BookingResponse> responses = bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByRoom(@PathVariable @NonNull String roomId) {
        log.info("GET /api/bookings/room/{}", roomId);
        List<Booking> bookings = bookingService.getBookingsByRoom(roomId);
        List<BookingResponse> responses = bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<BookingResponse>> getBookingsByStatus(@PathVariable @NonNull BookingStatus status) {
        log.info("GET /api/bookings/status/{}", status);
        List<Booking> bookings = bookingService.getBookingsByStatus(status);
        List<BookingResponse> responses = bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByUser(@PathVariable @NonNull String userId) {
        log.info("GET /api/bookings/user/{}", userId);
        List<Booking> bookings = bookingService.getBookingsByRoom(userId); 
        List<BookingResponse> responses = bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable @NonNull String id) {
        log.info("GET /api/bookings/{}", id);
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(mapToResponse(booking));
    }
    
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody @NonNull BookingRequest request) {
        log.info("POST /api/bookings - Creating booking for room: {}", request.getRoomId());
        String roomId = Objects.requireNonNull(request.getRoomId(), "Room ID is required");
        Map<String, Object> requestMap = Objects.requireNonNull(Map.of(
                "roomId", roomId,
                "checkInDate", Objects.requireNonNull(request.getCheckInDate(), "Check-in date is required").toString(),
                "checkOutDate", Objects.requireNonNull(request.getCheckOutDate(), "Check-out date is required").toString(),
                "notes", request.getNotes() != null ? request.getNotes() : ""
        ));
        Booking booking = bookingService.createBooking(roomId, requestMap);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponse(booking));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<BookingResponse> updateBookingStatus(
            @PathVariable @NonNull String id,
            @RequestBody Map<String, String> request) {
        log.info("PUT /api/bookings/{}/status - Updating status", id);
        String statusStr = Objects.requireNonNull(request.get("status"), "Status is required");
        BookingStatus status = BookingStatus.valueOf(statusStr);
        Booking booking = bookingService.updateBookingStatus(id, status);
        return ResponseEntity.ok(mapToResponse(booking));
    }
    
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(
            @PathVariable @NonNull String id,
            @RequestBody Map<String, String> request) {
        log.info("PATCH /api/bookings/{}/cancel", id);
        String reason = Objects.requireNonNull(request.getOrDefault("reason", "Khách hủy đơn"), "Reason is required");
        Booking booking = bookingService.cancelBooking(id, reason);
        return ResponseEntity.ok(mapToResponse(booking));
    }
    
    @PatchMapping("/{id}/approve")
    public ResponseEntity<BookingResponse> approveBooking(@PathVariable @NonNull String id) {
        log.info("PATCH /api/bookings/{}/approve", id);
        Booking booking = bookingService.approveBooking(id);
        return ResponseEntity.ok(mapToResponse(booking));
    }
    
    private BookingResponse mapToResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setRoomId(booking.getRoom() != null ? booking.getRoom().getId() : null);
        response.setRoomName(booking.getRoom() != null ? 
                (booking.getRoom().getName() != null ? booking.getRoom().getName() : booking.getRoom().getTitle()) : null);
        response.setUserId(booking.getTenant() != null ? booking.getTenant().getId() : null);
        response.setUserName(booking.getTenant() != null ? 
                (booking.getTenant().getName() != null ? booking.getTenant().getName() : booking.getTenant().getFullName()) : null);
        response.setCheckInDate(booking.getCheckInDate());
        response.setCheckOutDate(booking.getCheckOutDate());
        response.setTotalPrice(booking.getTotalAmount());
        response.setStatus(booking.getStatus());
        response.setCreatedAt(booking.getCreatedAt());
        response.setNotes(booking.getNotes());
        return response;
    }
}

