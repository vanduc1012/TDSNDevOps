# Script test API và hướng dẫn xem trong MongoDB
# Sử dụng: .\test-api-mongodb.ps1

Write-Host "=== TEST API VÀ XEM TRONG MONGODB ===" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8080/api"

# 1. Test GET /api/rooms
Write-Host "1. Test GET /api/rooms..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/rooms" -Method GET -TimeoutSec 5
    Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   📊 Số phòng: $($response.Content | ConvertFrom-Json | Measure-Object | Select-Object -ExpandProperty Count)" -ForegroundColor Gray
    Write-Host "   💡 Xem trong MongoDB Compass: quanlytro_db > rooms" -ForegroundColor Cyan
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   💡 Đảm bảo backend đang chạy!" -ForegroundColor Yellow
}

Write-Host ""

# 2. Test GET /api/services (menu_items)
Write-Host "2. Test GET /api/services..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/services" -Method GET -TimeoutSec 5
    Write-Host "   ✅ Status: $($response.StatusCode)" -ForegroundColor Green
    $services = $response.Content | ConvertFrom-Json
    Write-Host "   📊 Số dịch vụ: $($services.Count)" -ForegroundColor Gray
    Write-Host "   💡 Xem trong MongoDB Compass: quanlytro_db > menu_items" -ForegroundColor Cyan
} catch {
    Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 3. Hướng dẫn xem trong MongoDB
Write-Host "=== HƯỚNG DẪN XEM TRONG MONGODB COMPASS ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Mở MongoDB Compass" -ForegroundColor Yellow
Write-Host "2. Kết nối đến: cluster0.sotowsp.mongodb.net" -ForegroundColor White
Write-Host "3. Chọn database: quanlytro_db" -ForegroundColor White
Write-Host "4. Xem các collections:" -ForegroundColor White
Write-Host "   - rooms: Phòng trọ" -ForegroundColor Gray
Write-Host "   - bookings: Đặt phòng" -ForegroundColor Gray
Write-Host "   - bills: Hóa đơn điện nước" -ForegroundColor Gray
Write-Host "   - users: Người dùng" -ForegroundColor Gray
Write-Host "   - menu_items: Dịch vụ đi kèm" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Test API qua Swagger UI:" -ForegroundColor Yellow
Write-Host "   http://localhost:8080/swagger-ui.html" -ForegroundColor Green
Write-Host ""
Write-Host "6. Sau khi test API, refresh MongoDB Compass để xem dữ liệu mới" -ForegroundColor Yellow

