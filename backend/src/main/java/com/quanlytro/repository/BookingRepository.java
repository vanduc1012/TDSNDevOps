package com.quanlytro.repository;

import com.quanlytro.model.Booking;
import com.quanlytro.model.BookingStatus;
import com.quanlytro.model.PaymentStatus;
import com.quanlytro.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByTenant(User tenant);
    List<Booking> findByOwner(User owner);
    List<Booking> findByPaymentStatus(PaymentStatus paymentStatus);
    
    // Tìm booking theo userId (tenant)
    @Query("{ 'tenant._id': ?0 }")
    List<Booking> findByUserId(String userId);
    
    // Tìm booking theo roomId
    @Query("{ 'room._id': ?0 }")
    List<Booking> findByRoomId(String roomId);
}

