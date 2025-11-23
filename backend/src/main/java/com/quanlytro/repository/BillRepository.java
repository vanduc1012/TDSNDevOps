package com.quanlytro.repository;

import com.quanlytro.model.Bill;
import com.quanlytro.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends MongoRepository<Bill, String> {
    List<Bill> findByRoom(Room room);
    
    List<Bill> findByRoomId(String roomId);
    
    Optional<Bill> findByRoomIdAndMonth(String roomId, String month);
    
    List<Bill> findByPaidStatus(Boolean paidStatus);
}

