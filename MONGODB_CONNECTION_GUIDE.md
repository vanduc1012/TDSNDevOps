# Hướng dẫn kết nối MongoDB Atlas

## Vấn đề hiện tại
Backend không thể kết nối đến MongoDB Atlas do lỗi SSL/TLS.

## Các bước để sửa lỗi kết nối:

### 1. Kiểm tra MongoDB Atlas Network Access (QUAN TRỌNG NHẤT)
**Đây là bước quan trọng nhất để kết nối được MongoDB Atlas!**

1. Đăng nhập vào [MongoDB Atlas](https://cloud.mongodb.com/)
2. Chọn project của bạn
3. Vào **Network Access** (hoặc **Security** > **Network Access**)
4. Click **Add IP Address** hoặc **Add Entry**
5. Chọn một trong các options:
   - **Option 1 (Khuyến nghị cho development)**: 
     - Click **Allow Access from Anywhere**
     - Hoặc nhập `0.0.0.0/0` vào IP Address
     - Comment: "Development - Allow all IPs"
   - **Option 2 (Bảo mật hơn)**: 
     - Tìm IP public của máy bạn: https://whatismyipaddress.com/
     - Nhập IP đó vào (ví dụ: `123.456.789.0/32`)
6. Click **Confirm** để lưu
7. **Đợi 1-2 phút** để MongoDB Atlas cập nhật network rules

### 2. Kiểm tra Database User
1. Vào **Database Access** trong MongoDB Atlas
2. Đảm bảo user `tranvanducqb1022_db_user` có quyền đọc/ghi
3. Nếu cần, tạo user mới với password mới

### 3. Lấy Connection String đúng
1. Vào **Database** > **Connect** trong MongoDB Atlas
2. Chọn **Connect your application**
3. Copy connection string và thay thế `<password>` bằng password thực tế
4. Thêm database name vào connection string: `mongodb+srv://...@cluster0.xxx.mongodb.net/cafe_db?retryWrites=true&w=majority`

### 4. Format Connection String đúng
```
mongodb+srv://username:password@cluster0.xxx.mongodb.net/database_name?retryWrites=true&w=majority&tls=true&appName=Cluster0
```

**Lưu ý**: 
- Thay `username` và `password` bằng thông tin thực tế
- Thay `database_name` bằng tên database (ví dụ: `cafe_db`)
- Nếu password có ký tự đặc biệt, cần URL encode (ví dụ: `@` thành `%40`)

### 5. Cập nhật trong docker-compose.yml
File: `docker-compose.yml`
```yaml
environment:
  MONGODB_URI: "mongodb+srv://username:password@cluster0.xxx.mongodb.net/cafe_db?retryWrites=true&w=majority&tls=true&appName=Cluster0"
  MONGODB_DATABASE: cafe_db
```

**Connection string hiện tại trong project:**
```yaml
MONGODB_URI: "mongodb+srv://tranvanducqb1022_db_user:HbQrOcg6aqkIdlEd@cluster0.talji12.mongodb.net/cafe_db?retryWrites=true&w=majority&tls=true&appName=Cluster0"
```

### 6. Test kết nối từ MongoDB Client
Sử dụng MongoDB Compass hoặc MongoDB Shell:
```
mongodb+srv://tranvanducqb1022_db_user:HbQrOcg6aqkIdlEd@cluster0.talji12.mongodb.net/cafe_db?retryWrites=true&w=majority
```

### 7. Restart Docker containers
```bash
docker-compose down
docker-compose up -d --build backend
```

## Lưu ý quan trọng:
- **Network Access**: Phải whitelist IP để kết nối được
- **Password**: Đảm bảo password không có ký tự đặc biệt cần encode (như `@`, `#`, `%`)
- **Database Name**: Phải có trong connection string hoặc set riêng
- **SSL/TLS**: MongoDB Atlas yêu cầu SSL, đảm bảo Docker container có thể kết nối SSL

## Troubleshooting:

### Lỗi SSL/TLS (internal_error)
**Nguyên nhân**: MongoDB Atlas Network Access chưa được cấu hình
**Giải pháp**: 
1. Vào MongoDB Atlas > Network Access
2. Thêm IP `0.0.0.0/0` (cho phép tất cả) hoặc IP cụ thể
3. Đợi 1-2 phút để cập nhật
4. Restart backend: `docker-compose restart backend`

### Lỗi Authentication Failed
**Nguyên nhân**: Username/password sai hoặc user không có quyền
**Giải pháp**:
1. Kiểm tra Database Access trong MongoDB Atlas
2. Đảm bảo user có quyền `readWrite` trên database `cafe_db`
3. Reset password nếu cần

### Lỗi Timeout
**Nguyên nhân**: Firewall hoặc network không cho phép kết nối
**Giải pháp**:
1. Kiểm tra Network Access trong MongoDB Atlas
2. Kiểm tra firewall trên máy local
3. Thử test connection từ MongoDB Compass trước

### Test Connection từ MongoDB Compass
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Mở MongoDB Compass
3. **Copy connection string từ file `MONGODB_COMPASS_CONNECTION.txt`** hoặc paste trực tiếp:
   ```
   mongodb+srv://tranvanducqb1022_db_user:HbQrOcg6aqkIdlEd@cluster0.talji12.mongodb.net/cafe_db?retryWrites=true&w=majority
   ```
4. Paste vào ô "New Connection" trong MongoDB Compass
5. Click **Connect**
6. Nếu kết nối thành công từ Compass nhưng không kết nối được từ Docker → Vấn đề là Network Access

**Lưu ý**: Connection string cho MongoDB Compass đơn giản hơn, không cần các options như `tls=true` hay `appName`.

