# Hướng dẫn chuyển đổi giữa 2 Connection Strings

## Cấu hình hiện tại

Project đã được cấu hình để hỗ trợ **2 connection strings** MongoDB:

### Connection String 1 (Mặc định - Đang sử dụng)
```
mongodb+srv://trantiennt2019_db_user:27042004@cluster0.sotowsp.mongodb.net/cafe_db?retryWrites=true&w=majority&tls=true&appName=Cluster0
```

### Connection String 2 (Backup)
```
mongodb+srv://tranvanducqb1022_db_user:HbQrOcg6aqkIdlEd@cluster0.talji12.mongodb.net/cafe_db?retryWrites=true&w=majority&tls=true&appName=Cluster0
```

## Cách chuyển đổi giữa 2 Connection Strings

### Cách 1: Thay đổi MONGODB_URI trong docker-compose.yml (Khuyến nghị)

1. Mở file `docker-compose.yml`
2. Tìm section `environment` của service `backend`
3. Thay đổi giá trị `MONGODB_URI`:

**Để dùng Connection String 1 (Database của thành viên nhóm):**
```yaml
environment:
  MONGODB_URI: "mongodb+srv://trantiennt2019_db_user:27042004@cluster0.sotowsp.mongodb.net/cafe_db?retryWrites=true&w=majority&tls=true&appName=Cluster0"
```

**Để dùng Connection String 2 (Database backup):**
```yaml
environment:
  MONGODB_URI: "mongodb+srv://tranvanducqb1022_db_user:HbQrOcg6aqkIdlEd@cluster0.talji12.mongodb.net/cafe_db?retryWrites=true&w=majority&tls=true&appName=Cluster0"
```

4. Restart backend:
```bash
docker-compose restart backend
```

### Cách 2: Sử dụng MONGODB_URI_SELECT (Nếu đã cấu hình)

Nếu bạn muốn dùng cách tự động, có thể thay đổi `MONGODB_URI_SELECT`:
```yaml
environment:
  MONGODB_URI_SELECT: "1"  # Đổi thành "2" để dùng connection string 2
```

### Cách 3: Sử dụng Environment Variable khi chạy Docker

```bash
docker-compose down
MONGODB_URI="mongodb+srv://trantiennt2019_db_user:27042004@cluster0.sotowsp.mongodb.net/cafe_db?retryWrites=true&w=majority&tls=true&appName=Cluster0" docker-compose up -d
```

```yaml
environment:
  # Để dùng Connection String 1
  MONGODB_URI: "mongodb+srv://trantiennt2019_db_user:27042004@cluster0.sotowsp.mongodb.net/cafe_db?retryWrites=true&w=majority&tls=true&appName=Cluster0"
  
  # Hoặc đổi thành Connection String 2
  # MONGODB_URI: "mongodb+srv://tranvanducqb1022_db_user:HbQrOcg6aqkIdlEd@cluster0.talji12.mongodb.net/cafe_db?retryWrites=true&w=majority&tls=true&appName=Cluster0"
```

## Kiểm tra Connection String đang sử dụng

1. Xem logs backend:
```bash
docker logs cafe_backend --tail 50 | grep -i mongodb
```

2. Hoặc kiểm tra environment variable:
```bash
docker exec cafe_backend env | grep MONGODB
```

## Test kết nối từ MongoDB Compass

### Connection String 1:
```
mongodb+srv://trantiennt2019_db_user:27042004@cluster0.sotowsp.mongodb.net/cafe_db?retryWrites=true&w=majority
```

### Connection String 2:
```
mongodb+srv://tranvanducqb1022_db_user:HbQrOcg6aqkIdlEd@cluster0.talji12.mongodb.net/cafe_db?retryWrites=true&w=majority
```

## Lưu ý

1. **Network Access**: Đảm bảo cả 2 databases đều đã cấu hình Network Access cho phép IP của bạn
2. **Database Name**: Cả 2 connection strings đều sử dụng database `cafe_db`
3. **Backup**: Connection String 2 có thể dùng làm backup nếu Connection String 1 gặp vấn đề
4. **Bảo mật**: Không commit connection strings có password vào Git public

## Troubleshooting

### Lỗi khi chuyển đổi
- Kiểm tra format connection string
- Đảm bảo Network Access đã được cấu hình
- Restart backend sau khi thay đổi

### Test cả 2 connections
1. Test Connection String 1 từ MongoDB Compass
2. Test Connection String 2 từ MongoDB Compass
3. Nếu cả 2 đều kết nối được → Có thể chuyển đổi tự do
4. Nếu một trong hai lỗi → Kiểm tra Network Access

