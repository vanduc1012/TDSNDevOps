package com.quanlytro.repository;

import com.quanlytro.model.PhongTro;
import com.quanlytro.model.TableStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhongTroRepository extends MongoRepository<PhongTro, String> {
    List<PhongTro> findByStatus(TableStatus status);
    Optional<PhongTro> findByTableNumber(Integer tableNumber);
    Boolean existsByTableNumber(Integer tableNumber);
}
