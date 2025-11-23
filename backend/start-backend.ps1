# Script để khởi động backend đúng cách
# Sử dụng: .\start-backend.ps1 [port] [method]
# Ví dụ: .\start-backend.ps1 8081 maven
#        .\start-backend.ps1 8081 java

param(
    [int]$Port = 8080,
    [string]$Method = "maven"  # "maven" hoặc "java"
)

Write-Host "=== Khởi động Backend Quản Lý Trọ ===" -ForegroundColor Cyan
Write-Host "Port: $Port" -ForegroundColor White
Write-Host "Method: $Method" -ForegroundColor White
Write-Host ""

# 1. Setup JAVA_HOME
Write-Host "[1/4] Thiết lập JAVA_HOME..." -ForegroundColor Yellow
$env:JAVA_HOME = "C:\Users\MSI-PC\.jdks\corretto-22.0.2"
$javaBin = "$env:JAVA_HOME\bin"
# Đặt Java bin lên đầu PATH để ưu tiên
$env:PATH = "$javaBin;$env:PATH"

Write-Host "JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Green
# Kiểm tra Java version (dùng java từ JAVA_HOME)
Write-Host "Java version:" -ForegroundColor Gray
& "$javaBin\java.exe" -version 2>&1 | Select-Object -First 1

# 2. Kiểm tra port và tự động đổi nếu bị chiếm
Write-Host "`n[2/4] Kiểm tra port $Port..." -ForegroundColor Yellow
$portCheck = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if ($portCheck) {
    Write-Host "⚠️ Port $Port đang được sử dụng bởi process: $($portCheck.OwningProcess)" -ForegroundColor Yellow
    Write-Host "   Đang tự động chuyển sang port 8081..." -ForegroundColor Yellow
    $Port = 8081
    
    # Kiểm tra port 8081
    $portCheck8081 = Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue
    if ($portCheck8081) {
        Write-Host "⚠️ Port 8081 cũng đang được sử dụng" -ForegroundColor Yellow
        Write-Host "   Đang thử port 8082..." -ForegroundColor Yellow
        $Port = 8082
        
        $portCheck8082 = Get-NetTCPConnection -LocalPort 8082 -ErrorAction SilentlyContinue
        if ($portCheck8082) {
            Write-Host "❌ Cả port 8081 và 8082 đều bị chiếm. Vui lòng dừng các process hoặc chỉ định port khác." -ForegroundColor Red
            exit 1
        }
    }
    Write-Host "✅ Sẽ chạy trên port $Port" -ForegroundColor Green
} else {
    Write-Host "✅ Port $Port đang trống" -ForegroundColor Green
}

# 3. Build (nếu dùng method java)
if ($Method -eq "java") {
    Write-Host "`n[3/4] Build JAR file..." -ForegroundColor Yellow
    mvn clean package -DskipTests
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build thất bại!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build thành công!" -ForegroundColor Green
} else {
    Write-Host "`n[3/4] Bỏ qua build (sử dụng Maven run)" -ForegroundColor Yellow
}

# 4. Chạy backend
Write-Host "`n[4/4] Khởi động backend..." -ForegroundColor Yellow
Write-Host "Backend sẽ chạy tại: http://localhost:$Port" -ForegroundColor Green
Write-Host "Nhấn Ctrl+C để dừng`n" -ForegroundColor Yellow

if ($Method -eq "java") {
    # Chạy bằng JAR file (dùng java từ JAVA_HOME)
    & "$javaBin\java.exe" -jar target/quanlytro-management-1.0.0.jar --server.port=$Port
} else {
    # Chạy bằng Maven
    $env:SERVER_PORT = "$Port"
    mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=$Port"
}

