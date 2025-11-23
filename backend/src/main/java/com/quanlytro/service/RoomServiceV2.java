package com.quanlytro.service;

import com.quanlytro.dto.PageResponse;
import com.quanlytro.dto.RoomRequest;
import com.quanlytro.dto.RoomResponse;
import com.quanlytro.model.Room;
import com.quanlytro.model.RoomStatus;
import com.quanlytro.model.User;
import com.quanlytro.repository.RoomRepository;
import com.quanlytro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomServiceV2 {
    
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    
    public PageResponse<RoomResponse> getAllRooms(int page, int size, String sortBy, String sortDir) {
        log.info("Getting all rooms - page: {}, size: {}, sortBy: {}, sortDir: {}", page, size, sortBy, sortDir);
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Room> roomPage = roomRepository.findByStatusAndIsActive(RoomStatus.AVAILABLE, pageable);
        
        return mapToPageResponse(roomPage);
    }
    
    public PageResponse<RoomResponse> searchRooms(
            String keyword,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            BigDecimal minArea,
            BigDecimal maxArea,
            String address,
            int page,
            int size,
            String sortBy,
            String sortDir) {
        log.info("Searching rooms - keyword: {}, price: {}-{}, area: {}-{}, address: {}", 
                keyword, minPrice, maxPrice, minArea, maxArea, address);
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Room> roomPage;
        
        if (keyword != null && !keyword.isEmpty()) {
            roomPage = roomRepository.searchByAddress(keyword, pageable);
        } else if (minPrice != null || maxPrice != null || minArea != null || maxArea != null) {
            BigDecimal minP = minPrice != null ? minPrice : BigDecimal.ZERO;
            BigDecimal maxP = maxPrice != null ? maxPrice : BigDecimal.valueOf(Long.MAX_VALUE);
            BigDecimal minA = minArea != null ? minArea : BigDecimal.ZERO;
            BigDecimal maxA = maxArea != null ? maxArea : BigDecimal.valueOf(Long.MAX_VALUE);
            roomPage = roomRepository.searchRooms(RoomStatus.AVAILABLE, minP, maxP, minA, maxA, pageable);
        } else {
            roomPage = roomRepository.findByStatusAndIsActive(RoomStatus.AVAILABLE, pageable);
        }
        
        return mapToPageResponse(roomPage);
    }
    
    @NonNull
    public RoomResponse getRoomById(@NonNull String id) {
        log.info("Getting room by ID: {}", id);
        Room room = Objects.requireNonNull(roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found")));
        RoomResponse response = mapToResponse(room);
        return Objects.requireNonNull(response);
    }
    
    @Transactional
    @NonNull
    public RoomResponse createRoom(@NonNull RoomRequest request) {
        log.info("Creating new room: {}", request.getName());
        
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User owner = Objects.requireNonNull(userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found")));
        
        Room room = new Room();
        room.setName(request.getName());
        room.setTitle(request.getName());
        room.setAddress(request.getAddress());
        room.setPrice(request.getPrice());
        room.setArea(request.getArea());
        room.setBedrooms(request.getBedrooms());
        room.setBathrooms(request.getBathrooms());
        room.setAmenities(request.getAmenities());
        room.setImages(request.getImages());
        room.setDescription(request.getDescription());
        room.setDistrict(request.getDistrict());
        room.setCity(request.getCity());
        room.setWard(request.getWard());
        room.setOwner(owner);
        room.setStatus(RoomStatus.AVAILABLE);
        room.setIsActive(true);
        room.setCreatedAt(LocalDateTime.now());
        room.setUpdatedAt(LocalDateTime.now());
        
        Room savedRoom = roomRepository.save(room);
        log.info("Room created successfully with ID: {}", savedRoom.getId());
        
        RoomResponse response = mapToResponse(savedRoom);
        return Objects.requireNonNull(response);
    }
    
    @Transactional
    @NonNull
    public RoomResponse updateRoom(@NonNull String id, @NonNull RoomRequest request) {
        log.info("Updating room: {}", id);
        
        Room room = Objects.requireNonNull(roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found")));
        
        if (request.getName() != null) {
            room.setName(request.getName());
            room.setTitle(request.getName());
        }
        if (request.getAddress() != null) room.setAddress(request.getAddress());
        if (request.getPrice() != null) room.setPrice(request.getPrice());
        if (request.getArea() != null) room.setArea(request.getArea());
        if (request.getBedrooms() != null) room.setBedrooms(request.getBedrooms());
        if (request.getBathrooms() != null) room.setBathrooms(request.getBathrooms());
        if (request.getAmenities() != null) room.setAmenities(request.getAmenities());
        if (request.getImages() != null) room.setImages(request.getImages());
        if (request.getDescription() != null) room.setDescription(request.getDescription());
        if (request.getDistrict() != null) room.setDistrict(request.getDistrict());
        if (request.getCity() != null) room.setCity(request.getCity());
        if (request.getWard() != null) room.setWard(request.getWard());
        
        room.setUpdatedAt(LocalDateTime.now());
        
        Room updatedRoom = roomRepository.save(room);
        log.info("Room updated successfully");
        
        RoomResponse response = mapToResponse(updatedRoom);
        return Objects.requireNonNull(response);
    }
    
    @Transactional
    public void deleteRoom(@NonNull String id) {
        log.info("Deleting room: {}", id);
        Room room = Objects.requireNonNull(roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found")));
        roomRepository.delete(room);
        log.info("Room deleted successfully");
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
        response.setAvailable(room.getIsActive() && room.getStatus() == RoomStatus.AVAILABLE);
        response.setStatus(room.getStatus());
        response.setCreatedAt(room.getCreatedAt());
        response.setUpdatedAt(room.getUpdatedAt());
        response.setDescription(room.getDescription());
        response.setDistrict(room.getDistrict());
        response.setCity(room.getCity());
        response.setWard(room.getWard());
        return response;
    }
    
    private PageResponse<RoomResponse> mapToPageResponse(Page<Room> roomPage) {
        List<RoomResponse> content = roomPage.getContent().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        
        PageResponse<RoomResponse> response = new PageResponse<>();
        response.setContent(content);
        response.setPage(roomPage.getNumber());
        response.setSize(roomPage.getSize());
        response.setTotalElements(roomPage.getTotalElements());
        response.setTotalPages(roomPage.getTotalPages());
        response.setFirst(roomPage.isFirst());
        response.setLast(roomPage.isLast());
        
        return response;
    }
}

