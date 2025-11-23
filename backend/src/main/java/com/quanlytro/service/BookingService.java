package com.quanlytro.service;

import com.quanlytro.model.Booking;
import com.quanlytro.model.BookingStatus;
import com.quanlytro.model.Room;
import com.quanlytro.model.RoomStatus;
import com.quanlytro.model.User;
import com.quanlytro.repository.BookingRepository;
import com.quanlytro.repository.RoomRepository;
import com.quanlytro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Service quản lý đặt phòng trọ
 */
@Service
@RequiredArgsConstructor
public class BookingService {
    
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public List<Booking> getBookingsByRoom(@NonNull String roomId) {
        return bookingRepository.findAll().stream()
                .filter(booking -> booking.getRoom() != null && booking.getRoom().getId().equals(roomId))
                .toList();
    }
    
    @NonNull
    public Booking getBookingById(@NonNull String id) {
        return Objects.requireNonNull(bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found")));
    }
    
    @Transactional
    @NonNull
    public Booking createBooking(@NonNull String roomId, @NonNull Map<String, Object> request) {
        String username = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication().getName());
        User tenant = Objects.requireNonNull(userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found")));
        
        Room room = Objects.requireNonNull(roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found")));
        
        if (room.getStatus() != RoomStatus.AVAILABLE) {
            throw new RuntimeException("Phòng không còn trống");
        }
        
        Booking booking = new Booking();
        booking.setRoom(room);
        booking.setTenant(tenant);
        booking.setOwner(room.getOwner());
        booking.setStatus(BookingStatus.PENDING);
        
        // Parse dates
        if (request.containsKey("checkInDate")) {
            booking.setCheckInDate(LocalDate.parse(request.get("checkInDate").toString()));
        }
        if (request.containsKey("checkOutDate")) {
            booking.setCheckOutDate(LocalDate.parse(request.get("checkOutDate").toString()));
        }
        
        // Parse amounts
        if (request.containsKey("totalAmount")) {
            booking.setTotalAmount(new BigDecimal(request.get("totalAmount").toString()));
        } else {
            booking.setTotalAmount(room.getPrice());
        }
        
        if (request.containsKey("deposit")) {
            booking.setDeposit(new BigDecimal(request.get("deposit").toString()));
        }
        
        if (request.containsKey("notes")) {
            booking.setNotes(request.get("notes").toString());
        }
        
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        
        return bookingRepository.save(booking);
    }
    
    @Transactional
    @NonNull
    public Booking updateBookingStatus(@NonNull String id, @NonNull BookingStatus status) {
        Booking booking = getBookingById(id);
        booking.setStatus(status);
        booking.setUpdatedAt(LocalDateTime.now());
        
        if (status == BookingStatus.APPROVED) {
            // Cập nhật trạng thái phòng thành OCCUPIED
            Room room = booking.getRoom();
            if (room != null) {
                room.setStatus(RoomStatus.OCCUPIED);
                roomRepository.save(room);
            }
        } else if (status == BookingStatus.CANCELLED || status == BookingStatus.REJECTED) {
            // Trả phòng về trạng thái AVAILABLE
            Room room = booking.getRoom();
            if (room != null) {
                room.setStatus(RoomStatus.AVAILABLE);
                roomRepository.save(room);
            }
        }
        
        return bookingRepository.save(booking);
    }
    
    @Transactional
    @NonNull
    public Booking cancelBooking(@NonNull String id, @NonNull String reason) {
        Booking booking = getBookingById(id);
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setCancellationReason(reason);
        booking.setUpdatedAt(LocalDateTime.now());
        
        // Trả phòng về trạng thái AVAILABLE
        Room room = booking.getRoom();
        if (room != null) {
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }
        
        return bookingRepository.save(booking);
    }
    
    @Transactional
    @NonNull
    public Booking approveBooking(@NonNull String id) {
        String username = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication().getName());
        User admin = Objects.requireNonNull(userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Admin not found")));
        
        Booking booking = getBookingById(id);
        booking.setStatus(BookingStatus.APPROVED);
        booking.setApprovedBy(admin);
        booking.setUpdatedAt(LocalDateTime.now());
        
        // Cập nhật trạng thái phòng thành OCCUPIED
        Room room = booking.getRoom();
        if (room != null) {
            room.setStatus(RoomStatus.OCCUPIED);
            roomRepository.save(room);
        }
        
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getMyBookings() {
        String username = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = Objects.requireNonNull(userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found")));
        return bookingRepository.findByTenant(user);
    }
    
    public List<Booking> getBookingsByStatus(@NonNull BookingStatus status) {
        return bookingRepository.findByStatus(status);
    }
}

