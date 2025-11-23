# Script tự động cập nhật DBRef trong MongoDB
# Sử dụng: .\update-dbref.ps1

param(
    [string]$MongoUri = "",
    [string]$Database = "quanlytro_db"
)

Write-Host "=== SCRIPT CẬP NHẬT DBREF ===" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra mongosh
$mongoshPath = Get-Command mongosh -ErrorAction SilentlyContinue
if (-not $mongoshPath) {
    Write-Host "⚠️ mongosh chưa được cài đặt!" -ForegroundColor Yellow
    Write-Host "Vui lòng cài đặt MongoDB Shell:" -ForegroundColor Yellow
    Write-Host "  https://www.mongodb.com/try/download/shell" -ForegroundColor Green
    Write-Host ""
    Write-Host "Hoặc cập nhật DBRef thủ công trong MongoDB Compass." -ForegroundColor Yellow
    exit 1
}

# Lấy MongoDB URI
if ([string]::IsNullOrEmpty($MongoUri)) {
    Write-Host "Nhập MongoDB Connection String:" -ForegroundColor Yellow
    Write-Host "Ví dụ: mongodb+srv://username:password@cluster0.sotowsp.mongodb.net" -ForegroundColor Gray
    $MongoUri = Read-Host "MongoDB URI"
}

if ([string]::IsNullOrEmpty($MongoUri)) {
    Write-Host "❌ MongoDB URI không được để trống!" -ForegroundColor Red
    exit 1
}

# Thêm database vào URI nếu chưa có
$fullUri = $MongoUri
if ($MongoUri -notmatch "/$Database") {
    if ($MongoUri.EndsWith("/")) {
        $fullUri = "$MongoUri$Database"
    } else {
        $fullUri = "$MongoUri/$Database"
    }
}

Write-Host "MongoDB URI: $fullUri" -ForegroundColor Green
Write-Host "Database: $Database" -ForegroundColor Green
Write-Host ""

# Tạo script JavaScript để cập nhật DBRef
$jsScript = @"
// Kết nối database
use('$Database');

print('=== CẬP NHẬT DBREF ===');
print('');

// Lấy ObjectId của user root (admin)
var rootUser = db.users.findOne({ username: 'root' });
if (!rootUser) {
    print('❌ Không tìm thấy user root!');
    print('Vui lòng đảm bảo đã có user root trong collection users.');
    quit(1);
}

var rootUserId = rootUser._id;
print('✅ Tìm thấy user root: ' + rootUserId);
print('');

    // Cập nhật rooms: owner -> root user
    print('1. Cập nhật rooms.owner...');
    var roomsUpdated = db.rooms.updateMany(
        { owner: { \$exists: false } },
        { \$set: { owner: rootUserId } }
    );
    print('   ✅ Đã cập nhật ' + roomsUpdated.modifiedCount + ' rooms');
    print('');
    
    // Lấy ObjectId của room đầu tiên
    var firstRoom = db.rooms.findOne();
    if (!firstRoom) {
        print('⚠️ Chưa có room nào! Vui lòng import rooms trước.');
    } else {
        var firstRoomId = firstRoom._id;
        print('✅ Tìm thấy room đầu tiên: ' + firstRoomId);
        print('');
        
        // Cập nhật bookings: room, tenant, owner
        print('2. Cập nhật bookings...');
        var bookingsUpdated = db.bookings.updateMany(
            {},
            {
                \$set: {
                    room: firstRoomId,
                    tenant: rootUserId,
                    owner: rootUserId
                }
            }
        );
        print('   ✅ Đã cập nhật ' + bookingsUpdated.modifiedCount + ' bookings');
        print('');
        
        // Cập nhật bills: room
        print('3. Cập nhật bills.room...');
        var billsUpdated = db.bills.updateMany(
            {},
            { \$set: { room: firstRoomId } }
        );
        print('   ✅ Đã cập nhật ' + billsUpdated.modifiedCount + ' bills');
        print('');
        
        // Cập nhật reviews: room, user
        print('4. Cập nhật reviews...');
        var reviewsUpdated = db.reviews.updateMany(
            {},
            {
                \$set: {
                    room: firstRoomId,
                    user: rootUserId
                }
            }
        );
        print('   ✅ Đã cập nhật ' + reviewsUpdated.modifiedCount + ' reviews');
        print('');
    }
    
    // Cập nhật posts: author, approvedBy
    print('5. Cập nhật posts...');
    var postsUpdated = db.posts.updateMany(
        {},
        {
            \$set: {
                author: rootUserId,
                approvedBy: rootUserId
            }
        }
    );
    print('   ✅ Đã cập nhật ' + postsUpdated.modifiedCount + ' posts');
    print('');
    
    print('=== HOÀN TẤT CẬP NHẬT DBREF ===');
    print('');
    print('📊 Tóm tắt:');
    print('   - Rooms: ' + (db.rooms.countDocuments()) + ' documents');
    print('   - Bookings: ' + (db.bookings.countDocuments()) + ' documents');
    print('   - Bills: ' + (db.bills.countDocuments()) + ' documents');
    print('   - Posts: ' + (db.posts.countDocuments()) + ' documents');
    print('   - Reviews: ' + (db.reviews.countDocuments()) + ' documents');
    print('   - Menu Items: ' + (db.menu_items.countDocuments()) + ' documents');
    print('   - News: ' + (db.news.countDocuments()) + ' documents');
"@

# Lưu script tạm thời
$tempScript = Join-Path $env:TEMP "update-dbref-$(Get-Date -Format 'yyyyMMddHHmmss').js"
$jsScript | Out-File -FilePath $tempScript -Encoding UTF8

Write-Host "=== ĐANG CẬP NHẬT DBREF ===" -ForegroundColor Cyan
Write-Host ""

try {
    # Chạy mongosh với script
    $result = & mongosh "$fullUri" --file $tempScript 2>&1
    
    Write-Host $result
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Cập nhật DBRef thành công!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Cập nhật DBRef thất bại!" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Lỗi: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    # Xóa file tạm
    if (Test-Path $tempScript) {
        Remove-Item $tempScript -Force
    }
}

Write-Host ""
Write-Host "=== HOÀN TẤT ===" -ForegroundColor Cyan
Write-Host "Bạn có thể kiểm tra dữ liệu trong MongoDB Compass hoặc MongoDB Atlas." -ForegroundColor Green

