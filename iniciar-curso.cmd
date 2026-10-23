@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  ========================================
echo   Curso GROK — servidor local
echo  ========================================
echo.
echo  Abrindo em http://127.0.0.1:8765
echo  (Use 127.0.0.1 — no Windows, localhost pode ir para IPv6)
echo.
echo  Feche esta janela para parar o servidor.
echo.

where node >nul 2>&1
if %ERRORLEVEL%==0 (
  start "" "http://127.0.0.1:8765/"
  node server.mjs
  goto :eof
)

where py >nul 2>&1
if %ERRORLEVEL%==0 (
  start "" "http://127.0.0.1:8765/"
  py -3 -m http.server 8765 --bind 127.0.0.1
  goto :eof
)

where python >nul 2>&1
if %ERRORLEVEL%==0 (
  start "" "http://127.0.0.1:8765/"
  python -m http.server 8765 --bind 127.0.0.1
  goto :eof
)

echo  Nem Node nem Python encontrados no PATH.
echo  Abrindo index.html direto no Explorer...
start "" "%~dp0index.html"
pause
