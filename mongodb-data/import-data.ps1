# Script tự động import dữ liệu vào MongoDB Atlas
# Sử dụng: .\import-data.ps1

param(
    [string]$MongoUri = "",
    [string]$Database = "quanlytro_db"
)

Write-Host "=== SCRIPT IMPORT DỮ LIỆU VÀO MONGODB ATLAS ===" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra mongoimport
$mongoimportPath = Get-Command mongoimport -ErrorAction SilentlyContinue
if (-not $mongoimportPath) {
    Write-Host "⚠️ mongoimport chưa được cài đặt!" -ForegroundColor Yellow
    Write-Host "Vui lòng cài đặt MongoDB Database Tools:" -ForegroundColor Yellow
    Write-Host "  https://www.mongodb.com/try/download/database-tools" -ForegroundColor Green
    Write-Host ""
    Write-Host "Hoặc sử dụng MongoDB Compass để import thủ công." -ForegroundColor Yellow
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

# Đường dẫn đến thư mục chứa file JSON
$dataDir = Join-Path $PSScriptRoot "."

# Danh sách collections và files
$collections = @(
    @{ Name = "users"; File = "users.json" },
    @{ Name = "rooms"; File = "rooms.json" },
    @{ Name = "menu_items"; File = "menu_items.json" },
    @{ Name = "bookings"; File = "bookings.json" },
    @{ Name = "bills"; File = "bills.json" },
    @{ Name = "posts"; File = "posts.json" },
    @{ Name = "reviews"; File = "reviews.json" },
    @{ Name = "news"; File = "news.json" }
)

Write-Host "=== BƯỚC 1: IMPORT DỮ LIỆU ===" -ForegroundColor Cyan
Write-Host ""

$importedCollections = @()

foreach ($collection in $collections) {
    $filePath = Join-Path $dataDir $collection.File
    
    if (-not (Test-Path $filePath)) {
        Write-Host "⚠️ Không tìm thấy file: $($collection.File)" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Importing $($collection.Name)..." -ForegroundColor Yellow
    
    try {
        $result = & mongoimport `
            --uri "$fullUri" `
            --collection $collection.Name `
            --file $filePath `
            --jsonArray `
            --drop 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Import $($collection.Name) thành công!" -ForegroundColor Green
            $importedCollections += $collection.Name
        } else {
            Write-Host "❌ Import $($collection.Name) thất bại: $result" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Lỗi khi import $($collection.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "=== BƯỚC 2: CẬP NHẬT DBREF ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️ Cần cập nhật DBRef thủ công hoặc chạy script update-dbref.ps1" -ForegroundColor Yellow
Write-Host ""

Write-Host "=== HOÀN TẤT ===" -ForegroundColor Cyan
Write-Host "Đã import các collections:" -ForegroundColor Green
foreach ($col in $importedCollections) {
    Write-Host "  - $col" -ForegroundColor Gray
}
Write-Host ""
Write-Host "📝 Bước tiếp theo:" -ForegroundColor Yellow
Write-Host "  1. Chạy script: .\update-dbref.ps1" -ForegroundColor White
Write-Host "  2. Hoặc cập nhật DBRef thủ công trong MongoDB Compass" -ForegroundColor White

