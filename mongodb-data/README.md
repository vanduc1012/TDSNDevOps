# Hướng Dẫn Import Dữ Liệu Vào MongoDB Atlas

## 📁 Cấu Trúc Thư Mục

```
mongodb-data/
├── rooms.json              # Dữ liệu phòng trọ (5 phòng)
├── menu_items.json         # Dữ liệu dịch vụ (8 dịch vụ)
├── bookings.json           # Dữ liệu đặt phòng (3 booking)
├── bills.json              # Dữ liệu hóa đơn (3 hóa đơn)
├── posts.json              # Dữ liệu bài đăng (3 bài)
├── reviews.json            # Dữ liệu đánh giá (3 đánh giá)
├── news.json               # Dữ liệu tin tức (3 tin)
├── import-data.ps1         # Script import dữ liệu
├── update-dbref.ps1         # Script cập nhật DBRef
├── import-all.ps1          # Script tự động (import + update)
└── README.md               # File này
```

## 🚀 Cách Sử Dụng Nhanh

### Cách 1: Tự Động (Khuyên Dùng)

1. **Cài đặt MongoDB Database Tools và MongoDB Shell:**
   - MongoDB Database Tools: https://www.mongodb.com/try/download/database-tools
   - MongoDB Shell: https://www.mongodb.com/try/download/shell

2. **Chạy script tự động:**
   ```powershell
   cd D:\house\TDSNDevOps\mongodb-data
   .\import-all.ps1
   ```

3. **Nhập MongoDB Connection String khi được hỏi:**
   ```
   mongodb+srv://username:password@cluster0.sotowsp.mongodb.net
   ```

### Cách 2: Từng Bước

#### Bước 1: Import Dữ Liệu
```powershell
cd D:\house\TDSNDevOps\mongodb-data
.\import-data.ps1
```

#### Bước 2: Cập Nhật DBRef
```powershell
.\update-dbref.ps1
```

### Cách 3: Thủ Công (Nếu Không Có MongoDB Tools)

Xem file **HUONG_DAN_THEM_DU_LIEU.md** để biết cách import thủ công qua MongoDB Compass.

## 📋 Yêu Cầu

1. **MongoDB Database Tools** (cho mongoimport)
   - Tải: https://www.mongodb.com/try/download/database-tools
   - Giải nén và thêm vào PATH

2. **MongoDB Shell** (cho mongosh)
   - Tải: https://www.mongodb.com/try/download/shell
   - Cài đặt và thêm vào PATH

3. **MongoDB Connection String**
   - Lấy từ MongoDB Atlas → Connect → Connect your application
   - Format: `mongodb+srv://username:password@cluster0.sotowsp.mongodb.net`

## 🔧 Các Script

### 1. `import-data.ps1`
- Import tất cả file JSON vào MongoDB
- Tự động tạo collections nếu chưa có
- Xóa dữ liệu cũ trước khi import (--drop)

**Sử dụng:**
```powershell
.\import-data.ps1
# Hoặc với tham số:
.\import-data.ps1 -MongoUri "mongodb+srv://..." -Database "quanlytro_db"
```

### 2. `update-dbref.ps1`
- Tự động cập nhật DBRef (references) trong MongoDB
- Cập nhật:
  - `rooms.owner` → user root
  - `bookings.room` → room đầu tiên
  - `bookings.tenant` → user root
  - `bookings.owner` → user root
  - `bills.room` → room đầu tiên
  - `posts.author` → user root
  - `posts.approvedBy` → user root
  - `reviews.room` → room đầu tiên
  - `reviews.user` → user root

**Sử dụng:**
```powershell
.\update-dbref.ps1
# Hoặc với tham số:
.\update-dbref.ps1 -MongoUri "mongodb+srv://..." -Database "quanlytro_db"
```

### 3. `import-all.ps1`
- Chạy cả 2 script trên tự động
- Import dữ liệu → Cập nhật DBRef

**Sử dụng:**
```powershell
.\import-all.ps1
```

## ⚠️ Lưu Ý

1. **Đảm bảo đã có user root:**
   - Script sẽ tìm user có `username: "root"`
   - Nếu chưa có, vui lòng tạo trước

2. **Thứ tự import:**
   - Script tự động import theo thứ tự đúng
   - Không cần quan tâm thứ tự

3. **DBRef sẽ được cập nhật tự động:**
   - Tất cả references sẽ trỏ đến user root và room đầu tiên
   - Nếu muốn cập nhật khác, sửa script `update-dbref.ps1`

4. **Xóa dữ liệu cũ:**
   - Script sử dụng `--drop` để xóa dữ liệu cũ trước khi import
   - Nếu không muốn xóa, sửa script `import-data.ps1`

## 📊 Dữ Liệu Sẽ Được Import

| Collection | Số Lượng | Mô Tả |
|------------|----------|-------|
| `rooms` | 5 | Phòng trọ mẫu |
| `menu_items` | 8 | Dịch vụ đi kèm (Wifi, điện, nước, v.v.) |
| `bookings` | 3 | Đặt phòng mẫu |
| `bills` | 3 | Hóa đơn điện nước |
| `posts` | 3 | Bài đăng mẫu |
| `reviews` | 3 | Đánh giá mẫu |
| `news` | 3 | Tin tức mẫu |

## ✅ Kiểm Tra Sau Khi Import

1. **Mở MongoDB Compass hoặc MongoDB Atlas**
2. **Kết nối đến database `quanlytro_db`**
3. **Kiểm tra các collections:**
   - `rooms`: 5 documents
   - `menu_items`: 8 documents
   - `bookings`: 3 documents (đã có DBRef)
   - `bills`: 3 documents (đã có DBRef)
   - `posts`: 3 documents (đã có DBRef)
   - `reviews`: 3 documents (đã có DBRef)
   - `news`: 3 documents

4. **Kiểm tra DBRef:**
   - Mở một document trong `bookings`
   - Kiểm tra field `room` → phải trỏ đến ObjectId của room
   - Kiểm tra field `tenant` → phải trỏ đến ObjectId của user

## 🐛 Xử Lý Lỗi

### Lỗi: "mongoimport is not recognized"
- **Giải pháp:** Cài đặt MongoDB Database Tools và thêm vào PATH

### Lỗi: "mongosh is not recognized"
- **Giải pháp:** Cài đặt MongoDB Shell và thêm vào PATH

### Lỗi: "Authentication failed"
- **Giải pháp:** Kiểm tra lại username/password trong connection string

### Lỗi: "Network is unreachable"
- **Giải pháp:** 
  - Kiểm tra kết nối internet
  - Kiểm tra IP whitelist trong MongoDB Atlas
  - Thêm IP hiện tại vào Network Access

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra MongoDB Connection String
2. Kiểm tra Network Access trong MongoDB Atlas
3. Đảm bảo đã cài đặt MongoDB Tools và Shell
4. Xem file `HUONG_DAN_THEM_DU_LIEU.md` để import thủ công

