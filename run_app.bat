@echo off
REM VJM NGO Website - Application Launcher for Windows
REM This batch file runs both frontend and backend servers

echo ============================================================
echo           VJM NGO Website Launcher
echo ============================================================
echo.

REM Check if client directory exists
if not exist "client\" (
    echo [ERROR] Client directory not found!
    pause
    exit /b 1
)

REM Check if server directory exists
if not exist "server\" (
    echo [ERROR] Server directory not found!
    pause
    exit /b 1
)

echo [INFO] Starting Backend Server...
start "VJM NGO - Backend" cmd /k "cd server && npm start"

timeout /t 3 /nobreak > nul

echo [INFO] Starting Frontend Server...
start "VJM NGO - Frontend" cmd /k "cd client && npm run dev"

echo.
echo ============================================================
echo [SUCCESS] Both servers are starting!
echo ============================================================
echo.
echo Frontend: http://localhost:5173/
echo Backend:  Running on configured port
echo.
echo Two new windows have been opened for the servers.
echo Close those windows to stop the servers.
echo.
pause
