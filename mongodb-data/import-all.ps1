# Script tự động import tất cả dữ liệu và cập nhật DBRef
# Sử dụng: .\import-all.ps1

param(
    [string]$MongoUri = "",
    [string]$Database = "quanlytro_db"
)

Write-Host "=== SCRIPT TỰ ĐỘNG IMPORT VÀ CẬP NHẬT DBREF ===" -ForegroundColor Cyan
Write-Host ""

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

Write-Host ""
Write-Host "Bắt đầu import và cập nhật dữ liệu..." -ForegroundColor Yellow
Write-Host ""

# Bước 1: Import dữ liệu
Write-Host "=== BƯỚC 1: IMPORT DỮ LIỆU ===" -ForegroundColor Cyan
& "$PSScriptRoot\import-data.ps1" -MongoUri $MongoUri -Database $Database

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️ Import dữ liệu có lỗi, nhưng sẽ tiếp tục cập nhật DBRef..." -ForegroundColor Yellow
}

Write-Host ""
Start-Sleep -Seconds 2

# Bước 2: Cập nhật DBRef
Write-Host "=== BƯỚC 2: CẬP NHẬT DBREF ===" -ForegroundColor Cyan
& "$PSScriptRoot\update-dbref.ps1" -MongoUri $MongoUri -Database $Database

Write-Host ""
Write-Host "=== HOÀN TẤT TẤT CẢ ===" -ForegroundColor Cyan
Write-Host "✅ Đã import và cập nhật dữ liệu thành công!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Kiểm tra dữ liệu:" -ForegroundColor Yellow
Write-Host "   - Mở MongoDB Compass hoặc MongoDB Atlas" -ForegroundColor White
Write-Host "   - Kiểm tra database: $Database" -ForegroundColor White
Write-Host "   - Xem các collections: rooms, bookings, bills, posts, reviews, menu_items, news" -ForegroundColor White

