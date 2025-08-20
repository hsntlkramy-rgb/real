@echo off
echo Building RealEstateFinder...
echo.

echo Step 1: Installing dependencies...
cd RealEstateFinder
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Building the application...
npm run build
if %errorlevel% neq 0 (
    echo ERROR: Failed to build application
    pause
    exit /b 1
)

echo.
echo Step 3: Copying built files to root...
cd ..
Copy-Item "RealEstateFinder\dist\public\*" -Destination "." -Recurse -Force

echo.
echo ✅ Build completed successfully!
echo Your website files are now ready in the root directory.
echo.
pause
