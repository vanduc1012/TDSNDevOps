# Hướng Dẫn Xem API Trong MongoDB

## ✅ Backend đã được build và đang chạy

## 📋 Các Bước Xem API Trong MongoDB

### 1. Chạy Backend (nếu chưa chạy)
```powershell
cd D:\house\TDSNDevOps\backend
.\run-java.ps1
```

Backend sẽ chạy tại: `http://localhost:8080` (hoặc 8081, 8082 nếu 8080 bị chiếm)

### 2. Test API Qua Swagger UI

Mở trình duyệt và truy cập:
```
http://localhost:8080/swagger-ui.html
```

**Các API endpoints có sẵn:**

#### Phòng Trọ (Rooms)
- `GET /api/rooms` - Lấy danh sách phòng (pagination, filter, sort)
- `GET /api/rooms/{id}` - Chi tiết phòng
- `POST /api/rooms` - Tạo phòng mới (cần đăng nhập admin)
- `PUT /api/rooms/{id}` - Cập nhật phòng (cần đăng nhập admin)
- `DELETE /api/rooms/{id}` - Xóa phòng (cần đăng nhập admin)

#### Đặt Phòng (Bookings)
- `GET /api/bookings` - Lấy danh sách booking (cần đăng nhập)
- `GET /api/bookings/user/{userId}` - Booking của user
- `GET /api/bookings/{id}` - Chi tiết booking
- `POST /api/bookings` - Tạo booking mới (cần đăng nhập)
- `PUT /api/bookings/{id}/status` - Cập nhật status (cần đăng nhập)

#### Hóa Đơn (Bills)
- `GET /api/bills/room/{roomId}` - Lấy hóa đơn phòng (cần đăng nhập)
- `POST /api/bills` - Tạo hóa đơn mới (cần đăng nhập)
- `PUT /api/bills/{id}/status` - Cập nhật trạng thái thanh toán (cần đăng nhập)

#### Dịch Vụ (Services)
- `GET /api/services` - Lấy danh sách dịch vụ
- `GET /api/services/{id}` - Chi tiết dịch vụ
- `POST /api/services` - Tạo dịch vụ mới (cần đăng nhập admin)

### 3. Xem Dữ Liệu Trong MongoDB Compass

1. **Mở MongoDB Compass**
2. **Kết nối đến:**
   ```
   cluster0.sotowsp.mongodb.net
   ```
3. **Chọn database:** `quanlytro_db`
4. **Xem các collections:**

   | Collection | Mô tả | API Endpoint |
   |------------|-------|--------------|
   | `rooms` | Phòng trọ | `/api/rooms` |
   | `bookings` | Đặt phòng | `/api/bookings` |
   | `bills` | Hóa đơn điện nước | `/api/bills` |
   | `users` | Người dùng | `/api/auth/register` |
   | `menu_items` | Dịch vụ đi kèm | `/api/services` |

5. **Sau khi test API, refresh MongoDB Compass (F5) để xem dữ liệu mới**

### 4. Test API Bằng PowerShell

```powershell
# Test GET /api/rooms
Invoke-WebRequest -Uri "http://localhost:8080/api/rooms?page=0&size=10" -Method GET

# Test GET /api/services
Invoke-WebRequest -Uri "http://localhost:8080/api/services" -Method GET

# Test GET /api/bookings (cần token)
$token = "YOUR_JWT_TOKEN"
$headers = @{ "Authorization" = "Bearer $token" }
Invoke-WebRequest -Uri "http://localhost:8080/api/bookings" -Method GET -Headers $headers
```

### 5. Đăng Nhập Để Test API Cần Authentication

1. **Đăng ký/Đăng nhập qua Swagger UI:**
   - `POST /api/auth/register` - Đăng ký
   - `POST /api/auth/login` - Đăng nhập (lấy JWT token)

2. **Sử dụng token trong Swagger UI:**
   - Click nút "Authorize" ở góc trên bên phải
   - Nhập: `Bearer YOUR_JWT_TOKEN`
   - Click "Authorize"

3. **Hoặc test bằng PowerShell:**
   ```powershell
   # Đăng nhập
   $loginBody = @{ username = "root"; password = "root123" } | ConvertTo-Json
   $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
   $token = ($response.Content | ConvertFrom-Json).token
   
   # Sử dụng token
   $headers = @{ "Authorization" = "Bearer $token" }
   Invoke-WebRequest -Uri "http://localhost:8080/api/bookings" -Method GET -Headers $headers
   ```

## 📊 Ví Dụ Test API Và Xem Trong MongoDB

### Tạo Phòng Mới:
1. Mở Swagger UI: `http://localhost:8080/swagger-ui.html`
2. Tìm `POST /api/rooms`
3. Click "Try it out"
4. Nhập dữ liệu:
   ```json
   {
     "name": "Phòng trọ số 101",
     "address": "123 Đường ABC, Quận 1",
     "price": 3000000,
     "area": 25.5,
     "bedrooms": 1,
     "bathrooms": 1,
     "amenities": ["Wifi", "Điều hòa", "Máy nước nóng"]
   }
   ```
5. Click "Execute"
6. Mở MongoDB Compass → `quanlytro_db` → `rooms` → Refresh (F5)
7. Xem phòng mới được tạo!

### Tạo Booking:
1. Đăng nhập trước để lấy token
2. Tìm `POST /api/bookings` trong Swagger
3. Nhập dữ liệu:
   ```json
   {
     "roomId": "ROOM_ID",
     "checkInDate": "2025-12-01",
     "checkOutDate": "2025-12-31",
     "notes": "Cần phòng yên tĩnh"
   }
   ```
4. Execute và xem trong collection `bookings`

## 🔍 Lưu Ý

- **Refresh MongoDB Compass** sau mỗi lần test API để xem dữ liệu mới
- **JWT Token** có thời hạn (24 giờ mặc định)
- **Port backend** có thể là 8080, 8081, hoặc 8082 tùy vào port nào trống
- **Swagger UI** là cách dễ nhất để test API và xem response

## 📝 Collections Trong MongoDB

- **rooms**: Lưu thông tin phòng trọ
- **bookings**: Lưu thông tin đặt phòng
- **bills**: Lưu hóa đơn điện nước
- **users**: Lưu thông tin người dùng
- **menu_items**: Lưu dịch vụ đi kèm phòng trọ

