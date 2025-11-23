# HƯỚNG DẪN IMPORT DỮ LIỆU NHANH

## 📋 Tài khoản mặc định

Sau khi import, bạn có thể đăng nhập với:
- **Username:** `root`
- **Password:** `root123`
- **Role:** ADMIN

Hoặc:
- **Username:** `admin`
- **Password:** `root123`
- **Role:** ADMIN

## 🚀 Cách import dữ liệu

### Cách 1: Sử dụng script tự động (Khuyến nghị)

```powershell
cd D:\house\TDSNDevOps\mongodb-data
.\import-all.ps1
```

Script sẽ:
1. Import tất cả collections (users, rooms, bookings, bills, posts, reviews, news, menu_items)
2. Tự động cập nhật DBRef để liên kết các documents

### Cách 2: Import từng bước

**Bước 1: Import dữ liệu**
```powershell
cd D:\house\TDSNDevOps\mongodb-data
.\import-data.ps1
```

**Bước 2: Cập nhật DBRef**
```powershell
.\update-dbref.ps1
```

### Cách 3: Import thủ công bằng MongoDB Compass

1. Mở MongoDB Compass
2. Kết nối đến database của bạn
3. Chọn database: `quanlytro_db`
4. Với mỗi collection:
   - Click vào collection
   - Click "Add Data" > "Import File"
   - Chọn file JSON tương ứng:
     - `users.json` → collection `users`
     - `rooms.json` → collection `rooms`
     - `bookings.json` → collection `bookings`
     - `bills.json` → collection `bills`
     - `posts.json` → collection `posts`
     - `reviews.json` → collection `reviews`
     - `news.json` → collection `news`
     - `menu_items.json` → collection `menu_items`

## 📝 Lưu ý quan trọng

### Về Password

File `users.json` chứa password đã được hash bằng BCrypt. Tất cả users trong file có password mặc định là `root123`.

Nếu bạn muốn thay đổi password:
1. Backend sẽ tự động hash password khi tạo user mới
2. Hoặc bạn có thể hash password trước khi import

### Về DBRef

Sau khi import, cần chạy script `update-dbref.ps1` để:
- Liên kết `rooms.owner` với user
- Liên kết `bookings.room`, `bookings.tenant`, `bookings.owner` với documents tương ứng
- Liên kết `bills.room` với room
- Liên kết `reviews.room`, `reviews.user` với documents tương ứng
- Liên kết `posts.author`, `posts.approvedBy` với user

## ✅ Kiểm tra sau khi import

1. Mở MongoDB Compass hoặc MongoDB Atlas
2. Kiểm tra database `quanlytro_db`
3. Xem các collections:
   - `users` - Phải có ít nhất user `root`
   - `rooms` - Phải có các phòng trọ mẫu
   - `bookings` - Phải có các đặt phòng mẫu
   - `bills` - Phải có các hóa đơn mẫu
   - `posts` - Phải có các bài đăng mẫu
   - `reviews` - Phải có các đánh giá mẫu
   - `news` - Phải có các tin tức mẫu
   - `menu_items` - Phải có các dịch vụ mẫu

## 🔄 Nếu đã có dữ liệu

Nếu bạn đã có dữ liệu trong database:
- Script `import-data.ps1` sử dụng flag `--drop` để xóa collection cũ trước khi import
- **CẢNH BÁO:** Tất cả dữ liệu cũ sẽ bị xóa!

Nếu muốn giữ dữ liệu cũ, hãy:
1. Sửa file `import-data.ps1` và xóa flag `--drop`
2. Hoặc import thủ công từng collection trong MongoDB Compass

## 🆘 Xử lý lỗi

### Lỗi: "mongoimport is not recognized"
- Cài đặt MongoDB Database Tools: https://www.mongodb.com/try/download/database-tools

### Lỗi: "mongosh is not recognized"
- Cài đặt MongoDB Shell: https://www.mongodb.com/try/download/shell

### Lỗi: "Authentication failed"
- Kiểm tra lại MongoDB Connection String
- Đảm bảo username và password đúng
- Đảm bảo IP đã được whitelist trong MongoDB Atlas

### Lỗi: "Collection already exists"
- Script sử dụng `--drop` nên sẽ tự động xóa collection cũ
- Nếu vẫn lỗi, hãy xóa collection thủ công trong MongoDB Compass

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra logs trong terminal
2. Kiểm tra MongoDB Compass để xem dữ liệu đã được import chưa
3. Xem file `HUONG_DAN_THEM_DU_LIEU.md` để biết thêm chi tiết

