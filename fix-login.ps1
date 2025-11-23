# Script sửa lỗi đăng nhập admin
# Sửa CORS và rebuild backend

Write-Host "=== SỬA LỖI ĐĂNG NHẬP ADMIN ===" -ForegroundColor Cyan
Write-Host ""

cd backend

# 1. Kiểm tra và dừng backend cũ
Write-Host "[1/4] Dừng backend cũ..." -ForegroundColor Yellow
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "✅ Đã dừng backend cũ" -ForegroundColor Green

# 2. Rebuild với CORS mới
Write-Host "`n[2/4] Rebuild backend với CORS mới..." -ForegroundColor Yellow
mvn clean package -DskipTests
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build thất bại!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build thành công!" -ForegroundColor Green

# 3. Tìm port trống
Write-Host "`n[3/4] Tìm port trống..." -ForegroundColor Yellow
$port = 8080
$portCheck = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($portCheck) {
    Write-Host "Port 8080 bị chiếm, chuyển sang 8081..." -ForegroundColor Yellow
    $port = 8081
    $portCheck = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($portCheck) {
        Write-Host "Port 8081 cũng bị chiếm, chuyển sang 8082..." -ForegroundColor Yellow
        $port = 8082
    }
}
Write-Host "✅ Sẽ chạy trên port $port" -ForegroundColor Green

# 4. Chạy backend
Write-Host "`n[4/4] Khởi động backend..." -ForegroundColor Yellow
Write-Host "Backend URL: http://localhost:$port" -ForegroundColor Green
Write-Host "Frontend cần cập nhật API URL nếu port khác 8080" -ForegroundColor Yellow
Write-Host ""

# Set JAVA_HOME
$env:JAVA_HOME = "C:\Users\MSI-PC\.jdks\corretto-22.0.2"
$javaBin = "$env:JAVA_HOME\bin"
$env:PATH = "$javaBin;$env:PATH"

& "$javaBin\java.exe" -jar target/quanlytro-management-1.0.0.jar --server.port=$port

