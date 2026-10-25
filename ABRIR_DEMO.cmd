@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js antes de abrir esta demostracion.
  pause
  exit /b 1
)
if not exist node_modules (
  call npm install --no-audit --no-fund
  if errorlevel 1 exit /b 1
)
call npm run build
if errorlevel 1 exit /b 1
echo.
echo Abre http://127.0.0.1:4180 en el navegador.
echo Mantener esta ventana abierta mientras se usa la demostracion.
call npm run dev
