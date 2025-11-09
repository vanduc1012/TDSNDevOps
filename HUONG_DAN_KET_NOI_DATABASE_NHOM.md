# Hướng dẫn kết nối Database của người khác trong dự án nhóm

## Các bước để kết nối database của thành viên khác:

### 1. Yêu cầu thông tin từ người sở hữu database

Bạn cần yêu cầu người kia cung cấp các thông tin sau:

#### A. Connection String (Khuyến nghị - Dễ nhất)
Yêu cầu họ cung cấp connection string đầy đủ:
```
mongodb+srv://username:password@cluster0.xxx.mongodb.net/database_name?retryWrites=true&w=majority
```

#### B. Hoặc các thông tin riêng lẻ:
- **Username**: Tên user database
- **Password**: Mật khẩu database
- **Cluster URL**: Ví dụ `cluster0.xxx.mongodb.net`
- **Database Name**: Tên database (ví dụ: `cafe_db`)

### 2. Người sở hữu database cần làm gì?

#### Bước 1: Thêm IP của bạn vào Network Access
1. Đăng nhập MongoDB Atlas
2. Vào **Network Access** (Security > Network Access)
3. Click **Add IP Address**
4. Có 2 cách:
   - **Cách 1**: Thêm IP cụ thể của bạn
     - Bạn cần tìm IP public của mình: https://whatismyipaddress.com/
     - Gửi IP đó cho người kia
     - Họ sẽ thêm IP đó vào (ví dụ: `123.456.789.0/32`)
   - **Cách 2**: Cho phép tất cả IP (chỉ dùng cho development)
     - Thêm `0.0.0.0/0` vào Network Access
     - Comment: "Development - Allow all IPs"

#### Bước 2: Tạo Database User cho bạn (Nếu cần)
1. Vào **Database Access** trong MongoDB Atlas
2. Click **Add New Database User**
3. Chọn:
   - **Username**: Tên user (ví dụ: `team_member_1`)
   - **Password**: Tạo password mới
   - **Database User Privileges**: Chọn `Read and write to any database` hoặc chỉ database cụ thể
4. Click **Add User**
5. **Gửi thông tin user/password cho bạn**

#### Bước 3: Cung cấp Connection String
1. Vào **Database** > **Connect** trong MongoDB Atlas
2. Chọn **Connect your application**
3. Copy connection string
4. Thay thế `<password>` bằng password thực tế
5. Thêm database name vào: `mongodb+srv://...@cluster0.xxx.mongodb.net/database_name?retryWrites=true&w=majority`
6. **Gửi connection string đầy đủ cho bạn**

### 3. Bạn cần làm gì sau khi nhận được thông tin?

#### Cách 1: Sử dụng Connection String (Khuyến nghị)

1. **Cập nhật `docker-compose.yml`**:
```yaml
environment:
  MONGODB_URI: "mongodb+srv://username:password@cluster0.xxx.mongodb.net/database_name?retryWrites=true&w=majority&tls=true&appName=Cluster0"
  MONGODB_DATABASE: database_name
```

2. **Cập nhật `application.properties`** (backup):
```properties
spring.data.mongodb.uri=${MONGODB_URI:mongodb+srv://username:password@cluster0.xxx.mongodb.net/database_name?retryWrites=true&w=majority&appName=Cluster0}
spring.data.mongodb.database=${MONGODB_DATABASE:database_name}
```

3. **Tạo file connection cho MongoDB Compass**:
   - Tạo file `MONGODB_COMPASS_CONNECTION.txt`
   - Paste connection string (không cần `tls=true` và `appName`):
   ```
   mongodb+srv://username:password@cluster0.xxx.mongodb.net/database_name?retryWrites=true&w=majority
   ```

#### Cách 2: Sử dụng thông tin riêng lẻ

Nếu nhận được thông tin riêng lẻ, tạo connection string theo format:
```
mongodb+srv://[username]:[password]@[cluster_url]/[database_name]?retryWrites=true&w=majority
```

### 4. Test kết nối

1. **Test từ MongoDB Compass**:
   - Mở MongoDB Compass
   - Paste connection string
   - Click Connect
   - Nếu thành công → Connection string đúng

2. **Test từ Backend**:
   ```bash
   docker-compose restart backend
   docker logs cafe_backend --tail 50
   ```
   - Kiểm tra xem có lỗi connection không
   - Nếu có lỗi SSL → Vấn đề Network Access
   - Nếu có lỗi Authentication → Vấn đề username/password

### 5. Checklist cho người sở hữu database

- [ ] Đã thêm IP của bạn vào Network Access (hoặc cho phép `0.0.0.0/0`)
- [ ] Đã tạo database user cho bạn (hoặc cung cấp user hiện có)
- [ ] Đã cung cấp connection string đầy đủ
- [ ] Đã test connection string hoạt động

### 6. Checklist cho bạn

- [ ] Đã nhận được connection string hoặc thông tin đầy đủ
- [ ] Đã cập nhật `docker-compose.yml`
- [ ] Đã test kết nối từ MongoDB Compass
- [ ] Đã restart backend và kiểm tra logs
- [ ] Đã test chức năng đăng ký/đăng nhập

## Lưu ý quan trọng:

1. **Bảo mật**: Không commit connection string vào Git public
   - Sử dụng environment variables
   - Thêm `.env` vào `.gitignore`

2. **Network Access**: Phải được cấu hình trước khi kết nối

3. **Database User**: Nên tạo user riêng cho mỗi thành viên để dễ quản lý

4. **Backup**: Nên có backup database trước khi làm việc nhóm

## Template message để gửi cho người sở hữu database:

```
Xin chào,

Tôi cần kết nối vào MongoDB database của bạn để làm việc trên dự án nhóm.

Bạn có thể:
1. Thêm IP của tôi vào Network Access: [IP_PUBLIC_CỦA_BẠN]
   Hoặc cho phép tất cả IP: 0.0.0.0/0 (cho development)

2. Tạo database user cho tôi hoặc cung cấp user hiện có

3. Cung cấp connection string đầy đủ:
   mongodb+srv://username:password@cluster0.xxx.mongodb.net/database_name?retryWrites=true&w=majority

Cảm ơn bạn!
```

