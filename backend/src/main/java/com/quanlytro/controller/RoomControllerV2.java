package com.quanlytro.controller;

import com.quanlytro.dto.PageResponse;
import com.quanlytro.dto.RoomRequest;
import com.quanlytro.dto.RoomResponse;
import com.quanlytro.model.Room;
import com.quanlytro.model.RoomStatus;
import com.quanlytro.service.RoomService;
import com.quanlytro.service.RoomServiceV2;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
@Slf4j
public class RoomControllerV2 {
    
    private final RoomServiceV2 roomServiceV2;
    private final RoomService roomService; // For backward compatibility methods
    
    @GetMapping
    public ResponseEntity<PageResponse<RoomResponse>> getAllRooms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) BigDecimal minArea,
            @RequestParam(required = false) BigDecimal maxArea,
            @RequestParam(required = false) String address) {
        
        log.info("GET /api/rooms - page: {}, size: {}, sortBy: {}, sortDir: {}", page, size, sortBy, sortDir);
        
        PageResponse<RoomResponse> response;
        if (keyword != null || minPrice != null || maxPrice != null || minArea != null || maxArea != null || address != null) {
            response = roomServiceV2.searchRooms(keyword, minPrice, maxPrice, minArea, maxArea, address, 
                    page, size, sortBy, sortDir);
        } else {
            response = roomServiceV2.getAllRooms(page, size, sortBy, sortDir);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<RoomResponse>> getActiveRooms() {
        log.info("GET /api/rooms/active");
        List<Room> rooms = roomService.getActiveRooms();
        List<RoomResponse> responses = rooms.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<RoomResponse>> getRoomsByStatus(@PathVariable RoomStatus status) {
        log.info("GET /api/rooms/status/{}", status);
        List<Room> rooms = roomService.getRoomsByStatus(status);
        List<RoomResponse> responses = rooms.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<RoomResponse>> getRoomsByOwner(@PathVariable @NonNull String ownerId) {
        log.info("GET /api/rooms/owner/{}", ownerId);
        List<Room> rooms = roomService.getRoomsByOwner(ownerId);
        List<RoomResponse> responses = rooms.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable @NonNull String id) {
        log.info("GET /api/rooms/{}", id);
        return ResponseEntity.ok(roomServiceV2.getRoomById(id));
    }
    
    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody @NonNull RoomRequest request) {
        log.info("POST /api/rooms - Creating room: {}", request.getName());
        RoomResponse response = roomServiceV2.createRoom(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(
            @PathVariable @NonNull String id,
            @Valid @RequestBody @NonNull RoomRequest request) {
        log.info("PUT /api/rooms/{} - Updating room", id);
        return ResponseEntity.ok(roomServiceV2.updateRoom(id, request));
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<RoomResponse> updateRoomStatus(
            @PathVariable @NonNull String id,
            @RequestBody Map<String, String> request) {
        log.info("PATCH /api/rooms/{}/status", id);
        String statusStr = Objects.requireNonNull(request.get("status"), "Status is required");
        RoomStatus status = RoomStatus.valueOf(statusStr);
        Room room = roomService.updateRoomStatus(id, status);
        return ResponseEntity.ok(mapToResponse(room));
    }
    
    @PatchMapping("/{id}/toggle-visibility")
    public ResponseEntity<RoomResponse> toggleRoomVisibility(@PathVariable @NonNull String id) {
        log.info("PATCH /api/rooms/{}/toggle-visibility", id);
        Room room = roomService.toggleRoomVisibility(id);
        return ResponseEntity.ok(mapToResponse(room));
    }
    
    @PutMapping("/{id}/images")
    public ResponseEntity<RoomResponse> updateRoomImages(
            @PathVariable @NonNull String id,
            @RequestBody Map<String, List<String>> request) {
        log.info("PUT /api/rooms/{}/images", id);
        List<String> images = Objects.requireNonNull(request.get("images"), "Images are required");
        Room room = roomService.updateRoomImages(id, images);
        return ResponseEntity.ok(mapToResponse(room));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable @NonNull String id) {
        log.info("DELETE /api/rooms/{} - Deleting room", id);
        roomServiceV2.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
    
    private RoomResponse mapToResponse(Room room) {
        RoomResponse response = new RoomResponse();
        response.setId(room.getId());
        response.setName(room.getName() != null ? room.getName() : room.getTitle());
        response.setAddress(room.getAddress());
        response.setPrice(room.getPrice());
        response.setArea(room.getArea());
        response.setBedrooms(room.getBedrooms());
        response.setBathrooms(room.getBathrooms());
        response.setAmenities(room.getAmenities());
        response.setImages(room.getImages());
        response.setAvailable(room.getIsActive() != null && room.getIsActive() && room.getStatus() == RoomStatus.AVAILABLE);
        response.setStatus(room.getStatus());
        response.setCreatedAt(room.getCreatedAt());
        response.setUpdatedAt(room.getUpdatedAt());
        response.setDescription(room.getDescription());
        response.setDistrict(room.getDistrict());
        response.setCity(room.getCity());
        response.setWard(room.getWard());
        return response;
    }
}

