package com.quanlytro.service;

import com.quanlytro.model.MenuItem;
import com.quanlytro.repository.MenuItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MenuService {
    
    private final MenuItemRepository menuItemRepository;
    
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }
    
    public List<MenuItem> getAvailableMenuItems() {
        return menuItemRepository.findByAvailable(true);
    }
    
    @NonNull
    public MenuItem getMenuItemById(@NonNull String id) {
        return Objects.requireNonNull(menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found")));
    }
    
    @Transactional
    @NonNull
    public MenuItem createMenuItem(@NonNull MenuItem menuItem) {
        return Objects.requireNonNull(menuItemRepository.save(menuItem));
    }
    
    @Transactional
    @NonNull
    public MenuItem updateMenuItem(@NonNull String id, @NonNull MenuItem menuItem) {
        MenuItem existing = getMenuItemById(id);
        existing.setName(menuItem.getName());
        existing.setDescription(menuItem.getDescription());
        existing.setPrice(menuItem.getPrice());
        existing.setCategory(menuItem.getCategory());
        existing.setImageUrl(menuItem.getImageUrl());
        existing.setAvailable(menuItem.getAvailable());
        return menuItemRepository.save(existing);
    }
    
    @Transactional
    public void deleteMenuItem(@NonNull String id) {
        menuItemRepository.deleteById(id);
    }
}
