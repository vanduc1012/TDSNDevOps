# Hướng Dẫn Thêm Dữ Liệu Vào MongoDB Atlas

## 📋 Tổng Quan

Dữ liệu mẫu đã được tạo sẵn trong thư mục `mongodb-data/`. Bạn cần import các file JSON này vào MongoDB Atlas.

## 📁 Các File Dữ Liệu

1. **rooms.json** - Dữ liệu phòng trọ (5 phòng)
2. **menu_items.json** - Dữ liệu dịch vụ đi kèm (8 dịch vụ)
3. **bookings.json** - Dữ liệu đặt phòng (3 booking)
4. **bills.json** - Dữ liệu hóa đơn điện nước (3 hóa đơn)
5. **posts.json** - Dữ liệu bài đăng (3 bài)
6. **reviews.json** - Dữ liệu đánh giá (3 đánh giá)
7. **news.json** - Dữ liệu tin tức (3 tin)

## 🔧 Cách 1: Import Qua MongoDB Atlas Web Interface (Dễ Nhất)

### Bước 1: Mở MongoDB Atlas
1. Đăng nhập vào [MongoDB Atlas](https://cloud.mongodb.com)
2. Chọn cluster của bạn (Cluster0)
3. Click vào **"Browse Collections"** hoặc **"Data Explorer"**

### Bước 2: Tạo Collection Mới
1. Trong database `quanlytro_db`, click **"+ Create Collection"**
2. Tạo các collections sau (nếu chưa có):
   - `rooms`
   - `menu_items`
   - `bookings`
   - `bills`
   - `posts`
   - `reviews`
   - `news`

### Bước 3: Import Dữ Liệu
1. Click vào collection bạn muốn import (ví dụ: `rooms`)
2. Click nút **"Insert Document"** hoặc **"Add Data"**
3. Click **"Import File"** hoặc **"Import JSON"**
4. Chọn file JSON tương ứng (ví dụ: `rooms.json`)
5. Click **"Import"**

**Lưu ý:** MongoDB Atlas có thể yêu cầu format đặc biệt. Nếu không import được, dùng Cách 2.

## 🔧 Cách 2: Import Qua MongoDB Compass (Khuyên Dùng)

### Bước 1: Cài Đặt MongoDB Compass
1. Tải MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Cài đặt và mở MongoDB Compass

### Bước 2: Kết Nối
1. Mở MongoDB Compass
2. Nhập connection string từ MongoDB Atlas:
   ```
   mongodb+srv://<username>:<password>@cluster0.sotowsp.mongodb.net/quanlytro_db?retryWrites=true&w=majority
   ```
3. Thay `<username>` và `<password>` bằng thông tin của bạn
4. Click **"Connect"**

### Bước 3: Import Dữ Liệu
1. Chọn database `quanlytro_db`
2. Chọn collection cần import (ví dụ: `rooms`)
3. Click **"Add Data"** → **"Import File"**
4. Chọn file JSON (ví dụ: `rooms.json`)
5. Chọn format: **JSON**
6. Click **"Import"**

## 🔧 Cách 3: Import Qua MongoDB Shell (mongoimport)

### Bước 1: Cài Đặt MongoDB Database Tools
1. Tải từ: https://www.mongodb.com/try/download/database-tools
2. Giải nén và thêm vào PATH

### Bước 2: Import Từng File
Mở terminal/PowerShell và chạy các lệnh sau:

```powershell
# Import rooms
mongoimport --uri "mongodb+srv://<username>:<password>@cluster0.sotowsp.mongodb.net/quanlytro_db" --collection rooms --file mongodb-data/rooms.json --jsonArray

# Import menu_items
mongoimport --uri "mongodb+srv://<username>:<password>@cluster0.sotowsp.mongodb.net/quanlytro_db" --collection menu_items --file mongodb-data/menu_items.json --jsonArray

# Import bookings
mongoimport --uri "mongodb+srv://<username>:<password>@cluster0.sotowsp.mongodb.net/quanlytro_db" --collection bookings --file mongodb-data/bookings.json --jsonArray

# Import bills
mongoimport --uri "mongodb+srv://<username>:<password>@cluster0.sotowsp.mongodb.net/quanlytro_db" --collection bills --file mongodb-data/bills.json --jsonArray

# Import posts
mongoimport --uri "mongodb+srv://<username>:<password>@cluster0.sotowsp.mongodb.net/quanlytro_db" --collection posts --file mongodb-data/posts.json --jsonArray

# Import reviews
mongoimport --uri "mongodb+srv://<username>:<password>@cluster0.sotowsp.mongodb.net/quanlytro_db" --collection reviews --file mongodb-data/reviews.json --jsonArray

# Import news
mongoimport --uri "mongodb+srv://<username>:<password>@cluster0.sotowsp.mongodb.net/quanlytro_db" --collection news --file mongodb-data/news.json --jsonArray
```

**Thay `<username>` và `<password>` bằng thông tin của bạn.**

## ⚠️ Lưu Ý Quan Trọng

### 1. DBRef (References)
Các collections có sử dụng **DBRef** (references) cần được cập nhật sau khi import:

#### **rooms.json**
- `owner`: Cần thay bằng ObjectId của user (ví dụ: `"$oid": "691e96f3faf5fe1d157dea2e"`)

#### **bookings.json**
- `room`: Cần thay bằng ObjectId của room (sau khi import rooms)
- `tenant`: Cần thay bằng ObjectId của user
- `owner`: Cần thay bằng ObjectId của user
- `approvedBy`: Có thể để null hoặc thay bằng ObjectId của admin

#### **bills.json**
- `room`: Cần thay bằng ObjectId của room (sau khi import rooms)

#### **posts.json**
- `author`: Cần thay bằng ObjectId của user
- `approvedBy`: Có thể để null hoặc thay bằng ObjectId của admin

#### **reviews.json**
- `room`: Cần thay bằng ObjectId của room
- `user`: Cần thay bằng ObjectId của user

### 2. Cách Cập Nhật DBRef Sau Khi Import

#### Trong MongoDB Compass:
1. Mở collection cần cập nhật (ví dụ: `bookings`)
2. Click vào document cần sửa
3. Tìm field có DBRef (ví dụ: `room`)
4. Thay giá trị bằng ObjectId thực tế:
   ```json
   {
     "$ref": "rooms",
     "$id": { "$oid": "OBJECT_ID_CUA_ROOM" }
   }
   ```
   Hoặc đơn giản hơn:
   ```json
   { "$oid": "OBJECT_ID_CUA_ROOM" }
   ```

#### Hoặc dùng MongoDB Shell:
```javascript
// Lấy ObjectId của room đầu tiên
var roomId = db.rooms.findOne()._id;

// Cập nhật booking đầu tiên
db.bookings.updateOne(
  {},
  { $set: { room: roomId } }
);
```

### 3. Thứ Tự Import (Quan Trọng)
Import theo thứ tự sau để đảm bảo references đúng:
1. ✅ **users** (đã có sẵn)
2. ✅ **rooms** (cần user làm owner)
3. ✅ **menu_items** (không có reference)
4. ✅ **bookings** (cần room và user)
5. ✅ **bills** (cần room)
6. ✅ **posts** (cần user)
7. ✅ **reviews** (cần room và user)
8. ✅ **news** (không có reference)

## 📝 Ví Dụ Cập Nhật DBRef

### Sau khi import rooms, lấy ObjectId:
1. Mở MongoDB Compass
2. Vào collection `rooms`
3. Copy ObjectId của room đầu tiên (ví dụ: `691e96f3faf5fe1d157dea2e`)

### Cập nhật bookings:
1. Vào collection `bookings`
2. Mở document đầu tiên
3. Tìm field `room`
4. Thay bằng:
   ```json
   {
     "$ref": "rooms",
     "$id": { "$oid": "691e96f3faf5fe1d157dea2e" }
   }
   ```

## ✅ Kiểm Tra Sau Khi Import

1. Mở MongoDB Compass hoặc MongoDB Atlas
2. Kiểm tra từng collection:
   - `rooms`: Có 5 documents
   - `menu_items`: Có 8 documents
   - `bookings`: Có 3 documents
   - `bills`: Có 3 documents
   - `posts`: Có 3 documents
   - `reviews`: Có 3 documents
   - `news`: Có 3 documents

3. Kiểm tra references:
   - `rooms.owner` → trỏ đến `users`
   - `bookings.room` → trỏ đến `rooms`
   - `bookings.tenant` → trỏ đến `users`
   - `bills.room` → trỏ đến `rooms`

## 🚀 Script Tự Động (Tùy Chọn)

Bạn có thể tạo script PowerShell để tự động import và cập nhật DBRef. Tuy nhiên, cách thủ công qua MongoDB Compass là đơn giản và an toàn nhất.

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra connection string
2. Kiểm tra username/password
3. Kiểm tra network access trong MongoDB Atlas
4. Đảm bảo đã tạo database `quanlytro_db` trước

