@echo off
chcp 65001 >nul
title Headless Browser Test - My WebApp Hub
cd /d "%~dp0"

echo ===================================================
echo   🤖 กำลังรัน Headless Browser Automated Test
echo ===================================================
echo.
echo [1/3] เปิด Headless Chromium ตรวจสอบหน้าเว็บและ Console Errors...
echo [2/3] ทดสอบปุ่มสลับธีม และระบบค้นหาแอป...
echo [3/3] บันทึกภาพหน้าจอลงโฟลเดอร์ screenshots\ ...
echo.

call npm run test:browser

if %ERRORLEVEL% equ 0 (
    echo.
    echo ===================================================
    echo  [SUCCESS] ผ่านการทดสอบทั้งหมด 100%%!
    echo  ดูภาพหน้าจอผลลัพธ์ได้ที่: screenshots\
    echo ===================================================
) else (
    echo.
    echo [FAILED] พบข้อผิดพลาดในการทดสอบ
)

echo.
pause
