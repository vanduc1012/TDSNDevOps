package com.quanlytro.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        log.error("RuntimeException: {}", ex.getMessage(), ex);
        Map<String, String> error = new HashMap<>();
        String message = ex.getMessage();
        
        // Xử lý các message lỗi cụ thể
        if (message != null) {
            if (message.contains("Username already exists")) {
                error.put("message", "Số điện thoại này đã được sử dụng. Vui lòng sử dụng số điện thoại khác.");
            } else if (message.contains("Email already exists")) {
                error.put("message", "Email này đã được sử dụng. Vui lòng sử dụng email khác.");
            } else if (message.contains("User not found") || message.contains("Room not found") || 
                       message.contains("Booking not found") || message.contains("Bill not found")) {
                error.put("message", message);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            } else if (message.contains("Phòng không còn trống") || message.contains("Hóa đơn cho tháng")) {
                error.put("message", message);
            } else {
                error.put("message", message);
            }
        } else {
            error.put("message", "Đã xảy ra lỗi. Vui lòng thử lại.");
        }
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Dữ liệu không hợp lệ: " + errors.values().iterator().next());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String, String>> handleDataAccessException(DataAccessException ex) {
        Map<String, String> error = new HashMap<>();
        String message = ex.getMessage();
        
        // Kiểm tra nếu là lỗi kết nối MongoDB
        if (message != null && (message.contains("MongoTimeoutException") || 
                                message.contains("MongoSocketException") ||
                                message.contains("SSLException") ||
                                message.contains("connection"))) {
            error.put("message", "Không thể kết nối đến cơ sở dữ liệu. Vui lòng thử lại sau.");
        } else {
            error.put("message", "Lỗi cơ sở dữ liệu. Vui lòng thử lại sau.");
        }
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        Map<String, String> error = new HashMap<>();
        String message = ex.getMessage();
        
        // Log exception để debug
        System.err.println("Unhandled exception: " + ex.getClass().getName());
        System.err.println("Message: " + message);
        ex.printStackTrace();
        
        error.put("message", "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

