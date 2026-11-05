@echo off
chcp 65001 >nul
title Git Push - My WebApp Hub
cd /d "%~dp0"

echo ===================================================
echo     🚀 กำลังทำการ Push โค้ดขึ้น GitHub
echo ===================================================
echo.

git push -u github master

if %ERRORLEVEL% equ 0 (
    echo.
    echo ===================================================
    echo  [SUCCESS] Push โค้ดขึ้น GitHub สำเร็จเรียบร้อย!
    echo ===================================================
) else (
    echo.
    echo [ERROR] Push ไม่สำเร็จ กรุณาตรวจสอบสิทธิ์การเข้าถึง GitHub
)

echo.
pause
