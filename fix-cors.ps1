# Script tự động fix lỗi CORS và kiểm tra backend
# Sử dụng: .\fix-cors.ps1

Write-Host "=== SCRIPT FIX LỖI CORS ===" -ForegroundColor Cyan
Write-Host ""

# Bước 1: Kiểm tra port backend đang chạy
Write-Host "[1/4] Kiểm tra port backend đang chạy..." -ForegroundColor Yellow
$backendPorts = @(8080, 8081, 8082)
$runningPort = $null

foreach ($port in $backendPorts) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        $process = Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue
        if ($process -and $process.ProcessName -eq "java") {
            $runningPort = $port
            Write-Host "✅ Backend đang chạy trên port $port (PID: $($connection.OwningProcess))" -ForegroundColor Green
            break
        }
    }
}

if (-not $runningPort) {
    Write-Host "⚠️ Không tìm thấy backend đang chạy!" -ForegroundColor Yellow
    Write-Host "Vui lòng chạy backend trước:" -ForegroundColor White
    Write-Host "  cd D:\house\TDSNDevOps\backend" -ForegroundColor Green
    Write-Host "  .\run-java.ps1" -ForegroundColor Green
    exit 1
}

Write-Host ""

# Bước 2: Rebuild backend để đảm bảo CORS config được cập nhật
Write-Host "[2/4] Rebuild backend để cập nhật CORS config..." -ForegroundColor Yellow
cd D:\house\TDSNDevOps\backend
mvn clean package -DskipTests 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Rebuild backend thất bại!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Rebuild backend thành công!" -ForegroundColor Green
Write-Host ""

# Bước 3: Dừng backend cũ và chạy lại
Write-Host "[3/4] Dừng backend cũ và chạy lại..." -ForegroundColor Yellow
Get-Process -Name java -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -eq "" } | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "✅ Đã dừng backend cũ" -ForegroundColor Green
Write-Host ""

# Bước 4: Chạy lại backend
Write-Host "[4/4] Chạy lại backend..." -ForegroundColor Yellow
Start-Process powershell.exe -ArgumentList "-NoExit -Command `".\run-java.ps1`"" -WorkingDirectory "D:\house\TDSNDevOps\backend"
Write-Host "✅ Backend đang khởi động. Vui lòng đợi 15-20 giây." -ForegroundColor Green
Write-Host ""

Write-Host "=== HOÀN TẤT ===" -ForegroundColor Cyan
Write-Host "Backend sẽ chạy trên port $runningPort (hoặc port khác nếu $runningPort bị chiếm)" -ForegroundColor White
Write-Host ""
Write-Host "📝 Lưu ý:" -ForegroundColor Yellow
Write-Host "   - Frontend đã được cập nhật để gọi port 8081 mặc định" -ForegroundColor White
Write-Host "   - Nếu backend chạy trên port khác, cần cập nhật frontend/src/api/axios.js" -ForegroundColor White
Write-Host "   - Hoặc set environment variable: REACT_APP_API_URL=http://localhost:PORT/api" -ForegroundColor White
Write-Host ""
Write-Host "🔄 Restart frontend để áp dụng thay đổi:" -ForegroundColor Yellow
Write-Host "   cd D:\house\TDSNDevOps\frontend" -ForegroundColor Green
Write-Host "   npm start" -ForegroundColor Green

