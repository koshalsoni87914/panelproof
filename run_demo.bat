@echo off
setlocal
cd /d "%~dp0"

echo =======================================================================
echo               PANELPROOF CREATOR REVIEW BENCH LAUNCHER
echo              Track 04 / Digital Art ^& Visual Co-Pilot
echo                      Team: Prompt Pirates
echo =======================================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not found in PATH. Please install Node.js v20 or higher.
    pause
    exit /b 1
)

echo [1/2] Opening browser to Creator Review Bench at http://localhost:3000 ...
start "" http://localhost:3000

echo.
echo [2/2] Starting local PanelProof demo server...
node scripts\demo.js

pause
