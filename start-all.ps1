# Script chạy cả backend và frontend
# Sử dụng: .\start-all.ps1

Write-Host "=== KHỞI ĐỘNG BACKEND VÀ FRONTEND ===" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Java processes cũ
Write-Host "Dừng các Java processes cũ..." -ForegroundColor Yellow
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
Write-Host "✅ Đã dừng Java processes cũ" -ForegroundColor Green
Write-Host ""

# Chạy backend
Write-Host "=== KHỞI ĐỘNG BACKEND ===" -ForegroundColor Cyan
$backendPath = Join-Path $PSScriptRoot "backend"
if (Test-Path $backendPath) {
    Start-Process powershell.exe -ArgumentList "-NoExit -Command `"cd '$backendPath'; .\run-java.ps1`"" -WindowStyle Normal
    Write-Host "✅ Backend đang khởi động trong cửa sổ mới..." -ForegroundColor Green
    Write-Host "   Đợi 15-20 giây để backend khởi động hoàn toàn" -ForegroundColor Yellow
} else {
    Write-Host "❌ Không tìm thấy thư mục backend!" -ForegroundColor Red
}
Write-Host ""

# Đợi một chút trước khi chạy frontend
Start-Sleep -Seconds 5

# Chạy frontend
Write-Host "=== KHỞI ĐỘNG FRONTEND ===" -ForegroundColor Cyan
$frontendPath = Join-Path $PSScriptRoot "frontend"
if (Test-Path $frontendPath) {
    Start-Process powershell.exe -ArgumentList "-NoExit -Command `"cd '$frontendPath'; npm start`"" -WindowStyle Normal
    Write-Host "✅ Frontend đang khởi động trong cửa sổ mới..." -ForegroundColor Green
    Write-Host "   Frontend sẽ tự động mở trình duyệt tại http://localhost:3000" -ForegroundColor Yellow
} else {
    Write-Host "❌ Không tìm thấy thư mục frontend!" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== HOÀN TẤT ===" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:8080 (hoặc 8081, 8082)" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "Swagger UI: http://localhost:8080/swagger-ui.html" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Lưu ý:" -ForegroundColor Yellow
Write-Host "   - Backend và Frontend đang chạy trong các cửa sổ PowerShell riêng" -ForegroundColor White
Write-Host "   - Để dừng, đóng các cửa sổ PowerShell hoặc nhấn Ctrl+C" -ForegroundColor White

