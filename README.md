# 🏠 Hệ Thống Quản Lý Trọ

Hệ thống quản lý phòng trọ với đầy đủ tính năng cho Admin và người dùng.

## 📋 Mục Lục

1. [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
2. [Tính Năng](#tính-năng)
3. [Cài Đặt & Chạy](#cài-đặt--chạy)
4. [Tài Khoản Admin](#tài-khoản-admin)
5. [Cấu Hình Java](#cấu-hình-java)
6. [Cấu Hình MongoDB](#cấu-hình-mongodb)
7. [Troubleshooting](#troubleshooting)
8. [API Endpoints](#api-endpoints)

---

## 🛠 Công Nghệ Sử Dụng

- **Backend**: Spring Boot 3.2.0 (Java 17+)
- **Frontend**: React 18
- **Database**: MongoDB Atlas
- **Container**: Docker & Docker Compose
- **Build Tool**: Maven

---

## ✨ Tính Năng

### 👤 Người Dùng (USER)
- Đăng ký/Đăng nhập tài khoản
- Xem danh sách phòng trọ
- Đặt phòng trọ
- Xem đơn đặt phòng của mình

### 🔐 Quản Trị Viên (ADMIN)

#### 1. Quản Lý Phòng Trọ
- Thêm mới phòng trọ theo yêu cầu
- Cập nhật giá phòng, diện tích, tiện nghi, mô tả
- Cập nhật ảnh phòng
- Ẩn/hiện phòng khi còn hoặc hết phòng
- Xóa phòng vi phạm/không còn hoạt động

#### 2. Duyệt Bài Đăng & Kiểm Duyệt
- Duyệt bài đăng trước khi xuất hiện
- Kiểm tra nội dung (ảnh nhạy cảm, giá giả, địa chỉ sai, spam)
- Từ chối bài vi phạm

#### 3. Quản Lý Người Dùng
- Xem danh sách tất cả tài khoản
- Khóa tài khoản spam/vi phạm
- Reset mật khẩu
- Kiểm tra báo cáo người dùng

#### 4. Xử Lý Đặt Phòng & Giao Dịch
- Xem danh sách đơn đặt phòng
- Duyệt hoặc từ chối đơn
- Xử lý hủy đặt phòng
- Thống kê doanh thu

#### 5. Quản Lý Đánh Giá
- Xóa đánh giá sai sự thật
- Xử lý đánh giá vi phạm
- Kiểm tra báo cáo xấu

#### 6. Quản Lý Sản Phẩm/Dịch Vụ
- Thêm/Sửa/Xóa sản phẩm/dịch vụ
- Quản lý giá và mô tả

#### 7. Báo Cáo & Thống Kê
- Thống kê người dùng mới
- Số phòng đăng mới
- Doanh thu hàng tháng
- Xu hướng tìm kiếm phòng

---

## 🚀 Cài Đặt & Chạy

### Yêu Cầu

- **Java**: JDK 17+ (khuyến nghị Java 17)
- **Node.js**: 16+ 
- **Maven**: 3.6+
- **Docker** (tùy chọn): Để chạy bằng Docker

### 🚀 Cách 1: Chạy Trực Tiếp (Development)

#### Backend (Spring Boot)

**Bước 1: Setup JAVA_HOME**
```powershell
cd backend
.\set-java-home.ps1
```

**Bước 2: Chạy Backend**

**Option A: Sử dụng npm script (Khuyến nghị)**
```powershell
cd backend
npm run dev
```

**Option B: Sử dụng Maven**
```powershell
cd backend
mvn spring-boot:run
```

**Option C: Build và chạy JAR**
```powershell
cd backend
mvn clean package -DskipTests
java -jar target/quanlytro-management-1.0.0.jar
```

**Option D: Sử dụng script**
```powershell
cd backend
.\start-backend.ps1              # Script đầy đủ (build + run, hỗ trợ port tùy chỉnh)
```

Backend chạy tại: **http://localhost:8080**

#### Frontend (React)

**Bước 1: Cài đặt dependencies (lần đầu)**
```powershell
cd frontend
npm install
```

**Bước 2: Chạy Frontend**
```powershell
cd frontend
npm start
```

Frontend chạy tại: **http://localhost:3000**

### 🐳 Cách 2: Chạy bằng Docker (Production)

**Chạy cả Backend và Frontend:**
```powershell
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng
docker-compose down

# Dừng và xóa volumes
docker-compose down -v
```

**Chạy từng service:**
```powershell
# Chỉ backend
docker-compose up -d backend

# Chỉ frontend
docker-compose up -d frontend

# Xem logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 📝 Lệnh Nhanh (2 Terminal)

**Terminal 1 - Backend:**
```powershell
cd TDSNDevOps\backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd TDSNDevOps\frontend
npm start
```

---

## 🔑 Tài Khoản Admin

- **Username:** `root`
- **Password:** `root123`
- **Role:** `ADMIN`

Đăng nhập tại: http://localhost:3000/login

---

## ☕ Cấu Hình Java

### Quick Start (Session hiện tại)

Script `start-backend.ps1` đã tự động set JAVA_HOME, không cần chạy riêng.

### Cấu Hình Vĩnh Viễn

**Option 1: PowerShell (User-level)**
```powershell
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Users\MSI-PC\.jdks\corretto-22.0.2', 'User')

$currentPath = [System.Environment]::GetEnvironmentVariable('PATH', 'User')
$javaBin = 'C:\Users\MSI-PC\.jdks\corretto-22.0.2\bin'
if ($currentPath -notlike "*$javaBin*") {
    $newPath = "$javaBin;$currentPath"
    [System.Environment]::SetEnvironmentVariable('PATH', $newPath, 'User')
}
```

**Option 2: Windows GUI**
1. `Win + X` → **System** → **Advanced system settings**
2. **Environment Variables** → **New** (User variables)
3. Variable name: `JAVA_HOME`
4. Variable value: `C:\Users\MSI-PC\.jdks\corretto-22.0.2`
5. Thêm `%JAVA_HOME%\bin` vào PATH (ưu tiên đầu danh sách)
6. **Restart terminal**

### Kiểm Tra

```powershell
echo $env:JAVA_HOME
java -version
mvn -version
```

### Cài Đặt Java 17 (Khuyến nghị)

```powershell
winget install EclipseAdoptium.Temurin.17.JDK
```

---

## 🗄 Cấu Hình MongoDB

### MongoDB Atlas Setup

1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Tạo cluster miễn phí (M0)
3. **Network Access**: Thêm IP `0.0.0.0/0` (Allow from anywhere)
4. **Database Access**: Tạo user với quyền "Read and write to any database"

### Connection String

Connection string mẫu:
```
mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/quanlytro_db?retryWrites=true&w=majority&appName=Cluster0
```

### Cấu Hình trong application.properties

```properties
spring.data.mongodb.uri=${MONGODB_URI:mongodb+srv://username:password@cluster0.xxx.mongodb.net/quanlytro_db?retryWrites=true&w=majority&appName=Cluster0}
spring.data.mongodb.database=${MONGODB_DATABASE:quanlytro_db}
```

### Cấu Hình trong docker-compose.yml

```yaml
backend:
  environment:
    MONGODB_URI: "mongodb+srv://username:password@cluster0.xxx.mongodb.net/quanlytro_db?retryWrites=true&w=majority&tls=true&appName=Cluster0"
    MONGODB_DATABASE: quanlytro_db
```

### Kiểm Tra Kết Nối

```powershell
docker-compose logs backend | Select-String "MongoDB\|Started"
```

Tìm dòng: `"Connected to MongoDB successfully"` hoặc `"Started QuanLyTroApplication"`

---

## 🔧 Troubleshooting

### ❌ Lỗi ERR_EMPTY_RESPONSE khi đăng nhập

**Nguyên nhân:**
- Backend chưa khởi động hoàn toàn
- Port 8080 bị conflict
- Backend crash

**Giải pháp:**

1. **Dừng process cũ:**
```powershell
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force
```

2. **Khởi động lại backend:**
```powershell
cd backend
.\set-java-home.ps1
mvn spring-boot:run
```

3. **Đợi 10-15 giây** để backend khởi động hoàn toàn

4. **Test backend:**
Mở trình duyệt: http://localhost:8080/api/menu
- Nếu thấy JSON → Backend OK ✅
- Nếu không → Backend chưa sẵn sàng ❌

### Backend không chạy được

1. **Kiểm tra JAVA_HOME:**
```powershell
java -version
mvn -version
```

2. **Kiểm tra port 8080:**
```powershell
netstat -ano | findstr :8080
```

3. **Kiểm tra MongoDB connection:**
- Xem `application.properties`
- Kiểm tra `MONGODB_URI` trong `docker-compose.yml`

### Frontend không chạy được

1. **Xóa node_modules và cài lại:**
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

2. **Kiểm tra port 3000:**
```powershell
netstat -ano | findstr :3000
```

3. **Clear cache:**
```powershell
npm cache clean --force
```

### Docker không chạy được

1. **Kiểm tra Docker:**
```powershell
docker ps
```

2. **Rebuild images:**
```powershell
docker-compose build --no-cache
docker-compose up -d
```

3. **Xem logs:**
```powershell
docker-compose logs backend
docker-compose logs frontend
```

### "JAVA_HOME is not defined correctly"

- Đảm bảo JAVA_HOME trỏ đến JDK root (không phải `\bin`)
- Restart terminal sau khi set environment variables
- Kiểm tra: `echo $env:JAVA_HOME`

### "Maven not found"

```powershell
winget install Apache.Maven
```

---

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Admin Dashboard:** http://localhost:3000/admin

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

### Phòng Trọ (Rooms)
- `GET /api/rooms` - Lấy danh sách phòng
- `GET /api/rooms/active` - Lấy phòng đang hiển thị
- `GET /api/rooms/{id}` - Lấy chi tiết phòng
- `POST /api/rooms` - Tạo phòng mới (Admin)
- `PUT /api/rooms/{id}` - Cập nhật phòng (Admin)
- `PATCH /api/rooms/{id}/status` - Cập nhật trạng thái (Admin)
- `PATCH /api/rooms/{id}/toggle-visibility` - Ẩn/hiện phòng (Admin)
- `PUT /api/rooms/{id}/images` - Cập nhật ảnh (Admin)
- `DELETE /api/rooms/{id}` - Xóa phòng (Admin)

### Bài Đăng (Posts) - Admin
- `GET /api/posts` - Lấy tất cả bài đăng
- `GET /api/posts/pending` - Lấy bài chờ duyệt
- `POST /api/posts/{id}/approve` - Duyệt bài
- `POST /api/posts/{id}/reject` - Từ chối bài
- `POST /api/posts/{id}/mark-spam` - Đánh dấu spam
- `POST /api/posts/{id}/mark-duplicate` - Đánh dấu trùng lặp

### Người Dùng (Users) - Admin
- `GET /api/admin/users` - Lấy danh sách người dùng
- `GET /api/admin/users/{id}` - Lấy chi tiết người dùng
- `POST /api/admin/users/{id}/lock` - Khóa tài khoản
- `POST /api/admin/users/{id}/unlock` - Mở khóa
- `POST /api/admin/users/{id}/reset-password` - Reset mật khẩu
- `DELETE /api/admin/users/{id}` - Xóa người dùng

### Menu (Sản phẩm/Dịch vụ) - Admin
- `GET /api/menu` - Lấy danh sách menu
- `GET /api/menu/available` - Lấy menu còn hàng
- `POST /api/menu` - Tạo món mới
- `PUT /api/menu/{id}` - Cập nhật món
- `DELETE /api/menu/{id}` - Xóa món

### Bàn (Tables) - Admin
- `GET /api/tables` - Lấy danh sách bàn
- `GET /api/tables/available` - Lấy bàn trống
- `POST /api/tables` - Tạo bàn mới
- `PUT /api/tables/{id}` - Cập nhật bàn
- `PATCH /api/tables/{id}/status` - Cập nhật trạng thái
- `DELETE /api/tables/{id}` - Xóa bàn

### Đơn Hàng (Orders)
- `GET /api/orders` - Lấy tất cả order (Admin)
- `GET /api/orders/my-orders` - Lấy order của mình
- `POST /api/orders` - Tạo order mới
- `PATCH /api/orders/{id}/status` - Cập nhật trạng thái (Admin)

### Báo Cáo (Reports) - Admin
- `GET /api/reports/today` - Báo cáo hôm nay
- `GET /api/reports/daily?date=YYYY-MM-DD` - Báo cáo theo ngày
- `GET /api/reports/monthly?year=YYYY&month=MM` - Báo cáo theo tháng

---

## 📁 Cấu Trúc Project

```
TDSNDevOps/
├── backend/              # Spring Boot Application
│   ├── src/
│   │   └── main/
│   │       ├── java/com/quanlytro/
│   │       │   ├── controller/    # REST Controllers
│   │       │   ├── service/       # Business Logic
│   │       │   ├── repository/   # Data Access
│   │       │   ├── model/         # Entities
│   │       │   ├── dto/           # Data Transfer Objects
│   │       │   ├── security/      # JWT & Security
│   │       │   └── config/        # Configuration
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── package.json
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/   # React Components
│   │   ├── pages/        # Page Components
│   │   ├── api/          # API Services
│   │   └── App.js
│   └── package.json
├── docker-compose.yml    # Docker Configuration
└── README.md            # File này
```

---

## ✅ Kiểm Tra Hệ Thống Đã Chạy

### Backend
```powershell
# Test API
Invoke-WebRequest -Uri 'http://localhost:8080/api/menu' -UseBasicParsing
```

Hoặc mở trình duyệt: http://localhost:8080/api/menu

### Frontend
Mở trình duyệt: http://localhost:3000

### Docker
```powershell
docker-compose ps
```

---

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra logs: `docker-compose logs -f`
2. Kiểm tra port: `netstat -ano | findstr :8080`
3. Kiểm tra MongoDB connection string
4. Đảm bảo JAVA_HOME đã được cấu hình đúng

---

## 📝 Lưu Ý

- Backend cần **10-15 giây** để khởi động hoàn toàn
- Đảm bảo MongoDB Atlas đã được cấu hình đúng
- JAVA_HOME phải trỏ đến JDK root (không phải `\bin`)
- Port 8080 và 3000 không được sử dụng bởi ứng dụng khác

---

**Chúc bạn sử dụng hệ thống thành công! 🎉**
