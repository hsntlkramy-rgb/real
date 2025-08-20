Write-Host "Building RealEstateFinder..." -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Installing dependencies..." -ForegroundColor Yellow
Set-Location RealEstateFinder
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "Step 2: Building the application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to build application" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "Step 3: Copying built files to root..." -ForegroundColor Yellow
Set-Location ..
Copy-Item "RealEstateFinder\dist\public\*" -Destination "." -Recurse -Force

Write-Host ""
Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host "Your website files are now ready in the root directory." -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to continue"
