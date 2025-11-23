package com.quanlytro.repository;

import com.quanlytro.model.Room;
import com.quanlytro.model.RoomStatus;
import com.quanlytro.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {
    List<Room> findByStatus(RoomStatus status);
    List<Room> findByIsActive(Boolean isActive);
    List<Room> findByOwner(User owner);
    List<Room> findByDistrict(String district);
    List<Room> findByCity(String city);
    Optional<Room> findByRoomNumber(String roomNumber);
    List<Room> findByStatusAndIsActive(RoomStatus status, Boolean isActive);
    
    // Tìm kiếm và lọc với pagination
    @Query("{ 'isActive': true, 'status': ?0 }")
    Page<Room> findByStatusAndIsActive(RoomStatus status, Pageable pageable);
    
    // Lọc theo giá
    @Query("{ 'isActive': true, 'price': { $gte: ?0, $lte: ?1 } }")
    Page<Room> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    // Lọc theo diện tích
    @Query("{ 'isActive': true, 'area': { $gte: ?0, $lte: ?1 } }")
    Page<Room> findByAreaBetween(BigDecimal minArea, BigDecimal maxArea, Pageable pageable);
    
    // Tìm kiếm theo địa chỉ
    @Query("{ 'isActive': true, $or: [ { 'address': { $regex: ?0, $options: 'i' } }, { 'district': { $regex: ?0, $options: 'i' } }, { 'city': { $regex: ?0, $options: 'i' } } ] }")
    Page<Room> searchByAddress(String keyword, Pageable pageable);
    
    // Tìm kiếm tổng hợp
    @Query("{ 'isActive': true, 'status': ?0, 'price': { $gte: ?1, $lte: ?2 }, 'area': { $gte: ?3, $lte: ?4 } }")
    Page<Room> searchRooms(RoomStatus status, BigDecimal minPrice, BigDecimal maxPrice, 
                           BigDecimal minArea, BigDecimal maxArea, Pageable pageable);
}

