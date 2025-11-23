package com.quanlytro.service;

import com.quanlytro.model.PhongTro;
import com.quanlytro.model.TableStatus;
import com.quanlytro.repository.PhongTroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TableService {
    
    private final PhongTroRepository tableRepository;
    
    public List<PhongTro> getAllTables() {
        return tableRepository.findAll();
    }
    
    public List<PhongTro> getAvailableTables() {
        return tableRepository.findByStatus(TableStatus.AVAILABLE);
    }
    
    @NonNull
    public PhongTro getTableById(@NonNull String id) {
        return Objects.requireNonNull(tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found")));
    }
    
    @Transactional
    @NonNull
    public PhongTro createTable(@NonNull PhongTro table) {
        if (tableRepository.existsByTableNumber(table.getTableNumber())) {
            throw new RuntimeException("Table number already exists");
        }
        table.setStatus(TableStatus.AVAILABLE);
        return tableRepository.save(table);
    }
    
    @Transactional
    @NonNull
    public PhongTro updateTable(@NonNull String id, @NonNull PhongTro table) {
        PhongTro existing = getTableById(id);
        
        Integer tableNumber = Objects.requireNonNull(table.getTableNumber(), "Table number is required");
        if (!existing.getTableNumber().equals(tableNumber) &&
            tableRepository.existsByTableNumber(tableNumber)) {
            throw new RuntimeException("Table number already exists");
        }
        
        existing.setTableNumber(tableNumber);
        existing.setCapacity(table.getCapacity());
        existing.setStatus(table.getStatus());
        return tableRepository.save(existing);
    }
    
    @Transactional
    @NonNull
    public PhongTro updateTableStatus(@NonNull String id, @NonNull TableStatus status) {
        PhongTro table = getTableById(id);
        table.setStatus(status);
        return tableRepository.save(table);
    }
    
    @Transactional
    public void deleteTable(@NonNull String id) {
        tableRepository.deleteById(id);
    }
}
