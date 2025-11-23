# 🚀 Hướng Dẫn Chạy Ứng Dụng

## Cách 1: Chạy bằng 2 Terminal (Khuyến nghị)

### Terminal 1 - Backend

**Cách 1: Dùng npm (Khuyến nghị - tiện nhất)**
```powershell
cd TDSNDevOps\backend
npm run dev
```
*Lưu ý: `npm run dev` thực chất chạy `mvn spring-boot:run` (backend là Java Spring Boot)*

**Cách 2: Dùng script PowerShell**
```powershell
cd TDSNDevOps\backend
.\start-backend.ps1
```
*Script này tự động kiểm tra port, build và chạy backend*

**Cách 3: Chạy trực tiếp bằng Maven**
```powershell
cd TDSNDevOps\backend
mvn spring-boot:run
```

**Cách 4: Chạy bằng Java JAR (Khuyến nghị nếu muốn chạy trực tiếp bằng Java)**

**Bước 1: Build JAR file (nếu chưa có)**
```powershell
cd TDSNDevOps\backend
mvn clean package -DskipTests
```

**Bước 2: Chạy bằng Java**
```powershell
cd TDSNDevOps\backend
java -jar target\quanlytro-management-1.0.0.jar
```

**Hoặc dùng script tự động:**
```powershell
cd TDSNDevOps\backend
.\run-java.ps1
```

*Script sẽ tự động build JAR nếu chưa có và chạy backend*

Backend sẽ chạy tại: **http://localhost:8080**

**⚠️ Nếu port 8080 bị chiếm (do Docker):**
```powershell
docker-compose down
```

---

### Terminal 2 - Frontend

**Lần đầu tiên (cài đặt dependencies):**
```powershell
cd TDSNDevOps\frontend
npm install
```

**Sau đó chạy:**
```powershell
npm run dev
```

**Hoặc:**
```powershell
npm start
```

(Cả 2 lệnh đều giống nhau)

Frontend sẽ chạy tại: **http://localhost:3000**

---

## Cách 2: Chạy bằng Docker (Tất cả trong 1 lệnh)

```powershell
cd TDSNDevOps
docker-compose up -d
```

**Xem logs:**
```powershell
docker-compose logs -f
```

**Dừng:**
```powershell
docker-compose down
```

---

## Lưu ý

1. **Backend cần 10-15 giây** để khởi động hoàn toàn
2. **Frontend sẽ tự động mở trình duyệt** tại http://localhost:3000
3. Đảm bảo **port 8080 và 3000** không bị chiếm
4. Nếu port 8080 bị chiếm, tắt Docker containers trước:
   ```powershell
   docker-compose down
   ```

---

## Truy cập ứng dụng

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api
- **Tài khoản Admin:**
  - Username: `root`
  - Password: `root123`

