@echo off
echo 🚀 FREE Deployment to GitHub Pages
echo ====================================

echo.
echo 📦 Building your RealEstateFinder...
cd RealEstateFinder
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo 🌐 Your site is now ready for FREE deployment!
echo.
echo 📋 Next steps:
echo 1. Push this code to GitHub
echo 2. Enable GitHub Pages in your repository settings
echo 3. Your site will be live at: https://yourusername.github.io/RealEstateFinder
echo.
echo 💡 No accounts, no payments, no setup required!
echo.
pause
