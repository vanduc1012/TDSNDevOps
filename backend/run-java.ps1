# Script chạy backend bằng Java (JAR file)
# Sử dụng: .\run-java.ps1 [port]

param(
    [int]$Port = 8080
)

Write-Host "=== CHẠY BACKEND BẰNG JAVA ===" -ForegroundColor Cyan
Write-Host ""

# Set JAVA_HOME (ưu tiên Java 17+)
$env:JAVA_HOME = "C:\Users\MSI-PC\.jdks\corretto-22.0.2"
$javaBin = "$env:JAVA_HOME\bin"
# Đặt Java bin lên đầu PATH để ưu tiên
$env:PATH = "$javaBin;$env:PATH"

Write-Host "JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Green
$javaVersion = java -version 2>&1 | Select-Object -First 1
Write-Host "Java version: $javaVersion" -ForegroundColor Gray

# Kiểm tra Java version
$versionOutput = java -version 2>&1 | Out-String
if ($versionOutput -match "1\.8|java version ""1\.") {
    Write-Host "⚠️ Cảnh báo: Đang dùng Java 8, cần Java 17+" -ForegroundColor Yellow
    Write-Host "   Đang thử dùng Java từ JAVA_HOME..." -ForegroundColor Yellow
    & "$javaBin\java.exe" -version 2>&1 | Select-Object -First 1
}
Write-Host ""

# Kiểm tra JAR file
$jarPath = "target\quanlytro-management-1.0.0.jar"
if (-not (Test-Path $jarPath)) {
    Write-Host "⚠️ JAR file chưa được build!" -ForegroundColor Yellow
    Write-Host "Đang build JAR file..." -ForegroundColor Yellow
    Write-Host ""
    
    mvn clean package -DskipTests
    
    if (-not (Test-Path $jarPath)) {
        Write-Host "❌ Build JAR thất bại!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Build JAR thành công!" -ForegroundColor Green
    Write-Host ""
}

# Kiểm tra port và tự động đổi nếu bị chiếm
Write-Host "Kiểm tra port $Port..." -ForegroundColor Yellow
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

# Chạy backend
Write-Host "=== KHỞI ĐỘNG BACKEND ===" -ForegroundColor Cyan
Write-Host "Port: $Port" -ForegroundColor White
Write-Host "URL: http://localhost:$Port" -ForegroundColor Green
Write-Host "Nhấn Ctrl+C để dừng" -ForegroundColor Gray
Write-Host ""
Write-Host "--- LOGS ---" -ForegroundColor DarkGray
Write-Host ""

# Chạy bằng java từ JAVA_HOME để đảm bảo dùng đúng version
& "$javaBin\java.exe" -jar $jarPath --server.port=$Port

