package com.quanlytro.controller;

import com.quanlytro.model.MenuItem;
import com.quanlytro.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller quản lý các dịch vụ đi kèm phòng trọ
 * (Wifi, điện, nước, giặt ủi, bảo vệ, v.v.)
 */
@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {
    
    private final MenuService menuService;
    
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllServices() {
        return ResponseEntity.ok(menuService.getAllMenuItems());
    }
    
    @GetMapping("/available")
    public ResponseEntity<List<MenuItem>> getAvailableServices() {
        return ResponseEntity.ok(menuService.getAvailableMenuItems());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getServiceById(@PathVariable @NonNull String id) {
        return ResponseEntity.ok(menuService.getMenuItemById(id));
    }
    
    @PostMapping
    public ResponseEntity<MenuItem> createService(@RequestBody @NonNull MenuItem service) {
        return ResponseEntity.ok(menuService.createMenuItem(service));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateService(@PathVariable @NonNull String id, @RequestBody @NonNull MenuItem service) {
        return ResponseEntity.ok(menuService.updateMenuItem(id, service));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable @NonNull String id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }
}
