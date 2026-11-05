@echo off
chcp 65001 >nul
title Build - My WebApp Hub
cd /d "%~dp0"

echo ===================================================
echo        📦 กำลังทำการ Build โปรเจกต์เป็น Production
echo ===================================================
echo.

call npm run build

if %ERRORLEVEL% equ 0 (
    echo.
    echo ===================================================
    echo  [SUCCESS] Build สำเร็จเรียบร้อย!
    echo  ไฟล์ผลลัพธ์พร้อมใช้งานอยู่ที่โฟลเดอร์: dist\
    echo ===================================================
) else (
    echo.
    echo [ERROR] การ Build เกิดข้อผิดพลาด
)

echo.
pause
