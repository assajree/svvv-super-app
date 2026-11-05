@echo off
chcp 65001 >nul
title My WebApp Hub
cd /d "%~dp0"

echo ===================================================
echo        🚀 กำลังเปิด My WebApp Hub (Launchpad)
echo ===================================================
echo.

if not exist "node_modules\" (
    echo [INFO] ตรวจพบว่ายังไม่ได้ติดตั้ง dependencies กำลังดำเนินการ npm install...
    call npm install
    if errorlevel 1 (
        echo [ERROR] ติดตั้ง dependencies ไม่สำเร็จ
        pause
        exit /b 1
    )
)

echo [INFO] กำลังเปิดเว็บเบราว์เซอร์ไปที่ http://localhost:5173 ...
start http://localhost:5173

echo [INFO] เริ่มการทำงานของ Vite Dev Server...
call npm run dev

pause
