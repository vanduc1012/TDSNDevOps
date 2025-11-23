package com.quanlytro.service;

import com.quanlytro.model.Room;
import com.quanlytro.model.RoomStatus;
import com.quanlytro.model.User;
import com.quanlytro.repository.RoomRepository;
import com.quanlytro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RoomService {
    
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
    
    public List<Room> getActiveRooms() {
        return roomRepository.findByIsActive(true);
    }
    
    public List<Room> getRoomsByStatus(RoomStatus status) {
        return roomRepository.findByStatus(status);
    }
    
    public List<Room> getRoomsByOwner(@NonNull String ownerId) {
        User owner = Objects.requireNonNull(userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found")));
        return roomRepository.findByOwner(owner);
    }
    
    @NonNull
    public Room getRoomById(@NonNull String id) {
        return Objects.requireNonNull(roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found")));
    }
    
    @Transactional
    @NonNull
    public Room createRoom(@NonNull Room room) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User owner = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        room.setOwner(owner);
        room.setCreatedAt(LocalDateTime.now());
        room.setUpdatedAt(LocalDateTime.now());
        
        return roomRepository.save(room);
    }
    
    @Transactional
    @NonNull
    public Room updateRoom(@NonNull String id, @NonNull Room roomData) {
        Room room = getRoomById(id);
        
        // Cập nhật thông tin
        String title = roomData.getTitle();
        if (title != null) room.setTitle(title);
        String description = roomData.getDescription();
        if (description != null) room.setDescription(description);
        if (roomData.getPrice() != null) room.setPrice(roomData.getPrice());
        if (roomData.getArea() != null) room.setArea(roomData.getArea());
        String address = roomData.getAddress();
        if (address != null) room.setAddress(address);
        String district = roomData.getDistrict();
        if (district != null) room.setDistrict(district);
        String city = roomData.getCity();
        if (city != null) room.setCity(city);
        String ward = roomData.getWard();
        if (ward != null) room.setWard(ward);
        if (roomData.getAmenities() != null) room.setAmenities(roomData.getAmenities());
        if (roomData.getImages() != null) room.setImages(roomData.getImages());
        if (roomData.getStatus() != null) room.setStatus(roomData.getStatus());
        if (roomData.getIsActive() != null) room.setIsActive(roomData.getIsActive());
        if (roomData.getCapacity() != null) room.setCapacity(roomData.getCapacity());
        String direction = roomData.getDirection();
        if (direction != null) room.setDirection(direction);
        if (roomData.getFloor() != null) room.setFloor(roomData.getFloor());
        if (roomData.getHasElevator() != null) room.setHasElevator(roomData.getHasElevator());
        if (roomData.getHasParking() != null) room.setHasParking(roomData.getHasParking());
        
        room.setUpdatedAt(LocalDateTime.now());
        
        return roomRepository.save(room);
    }
    
    @Transactional
    @NonNull
    public Room updateRoomStatus(@NonNull String id, @NonNull RoomStatus status) {
        Room room = getRoomById(id);
        room.setStatus(status);
        room.setUpdatedAt(LocalDateTime.now());
        return roomRepository.save(room);
    }
    
    @Transactional
    @NonNull
    public Room toggleRoomVisibility(@NonNull String id) {
        Room room = getRoomById(id);
        room.setIsActive(!room.getIsActive());
        room.setUpdatedAt(LocalDateTime.now());
        return roomRepository.save(room);
    }
    
    @Transactional
    public void deleteRoom(@NonNull String id) {
        Room room = Objects.requireNonNull(getRoomById(id));
        roomRepository.delete(room);
    }
    
    @Transactional
    @NonNull
    public Room updateRoomImages(@NonNull String id, @NonNull List<String> images) {
        Room room = getRoomById(id);
        room.setImages(images);
        room.setUpdatedAt(LocalDateTime.now());
        return roomRepository.save(room);
    }
}

