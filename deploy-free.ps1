Write-Host "🚀 FREE Deployment to GitHub Pages" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Building your RealEstateFinder..." -ForegroundColor Yellow
Set-Location RealEstateFinder
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Your site is now ready for FREE deployment!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor White
Write-Host "1. Push this code to GitHub" -ForegroundColor White
Write-Host "2. Enable GitHub Pages in your repository settings" -ForegroundColor White
Write-Host "3. Your site will be live at: https://yourusername.github.io/RealEstateFinder" -ForegroundColor White
Write-Host ""
Write-Host "💡 No accounts, no payments, no setup required!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to continue"
