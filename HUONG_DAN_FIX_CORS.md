# HƯỚNG DẪN FIX LỖI CORS

## 🔴 Lỗi thường gặp

```
Access to XMLHttpRequest at 'http://localhost:8080/api/auth/login' from origin 'http://localhost:3000' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## ✅ Giải pháp

### Cách 1: Sử dụng script tự động (Khuyến nghị)

```powershell
cd D:\house\TDSNDevOps
.\fix-cors.ps1
```

Script sẽ:
1. Kiểm tra port backend đang chạy
2. Rebuild backend với CORS config mới
3. Restart backend
4. Hướng dẫn restart frontend

### Cách 2: Fix thủ công

**Bước 1: Kiểm tra port backend**
```powershell
Get-NetTCPConnection -LocalPort 8080,8081,8082 -State Listen | Where-Object { $_.OwningProcess -eq (Get-Process -Name java).Id }
```

**Bước 2: Cập nhật frontend API URL**

Mở file `frontend/src/api/axios.js` và đảm bảo:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
```

**Bước 3: Rebuild backend**
```powershell
cd D:\house\TDSNDevOps\backend
mvn clean package -DskipTests
```

**Bước 4: Restart backend**
```powershell
# Dừng backend cũ
Get-Process -Name java | Stop-Process -Force

# Chạy lại backend
.\run-java.ps1
```

**Bước 5: Restart frontend**
```powershell
cd D:\house\TDSNDevOps\frontend
# Dừng frontend (Ctrl+C)
npm start
```

### Cách 3: Sử dụng environment variable

Nếu backend chạy trên port khác, tạo file `.env` trong thư mục `frontend`:

```env
REACT_APP_API_URL=http://localhost:8081/api
```

Sau đó restart frontend.

## 🔍 Kiểm tra CORS config

Đảm bảo `SecurityConfig.java` có:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",
    "http://127.0.0.1:3000"
));
configuration.setAllowCredentials(true);
```

## 📝 Lưu ý

1. **Port backend**: Backend có thể chạy trên port 8080, 8081, hoặc 8082 tùy vào port nào trống
2. **Frontend URL**: Phải khớp với `allowedOrigins` trong CORS config
3. **Rebuild**: Sau khi sửa CORS config, phải rebuild backend
4. **Restart**: Cả backend và frontend đều cần restart sau khi thay đổi

## 🆘 Vẫn còn lỗi?

1. Kiểm tra backend có đang chạy không:
   ```powershell
   Get-NetTCPConnection -LocalPort 8081 -State Listen
   ```

2. Kiểm tra CORS config trong backend logs:
   - Tìm dòng "CORS configuration"
   - Đảm bảo `allowedOrigins` có `http://localhost:3000`

3. Kiểm tra browser console:
   - Xem error message chi tiết
   - Kiểm tra Network tab để xem request/response headers

4. Thử clear browser cache:
   - Ctrl+Shift+Delete
   - Clear cache và cookies
   - Refresh trang

5. Kiểm tra firewall/antivirus:
   - Đảm bảo không block localhost connections

