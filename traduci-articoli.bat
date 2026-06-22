@echo off
chcp 65001 >nul
title Traduzione articoli IT -> EN
cd /d "%~dp0"

REM === Modello da usare (Ollama). Cambia qui se vuoi: qwen2.5:7b | gemma2:9b | aya-expanse:8b ===
set MODEL=qwen2.5:7b

echo ============================================
echo   Traduzione articoli IT -^> EN
echo   Modello: %MODEL%  (Ollama locale)
echo ============================================
echo.

where ollama >nul 2>nul
if errorlevel 1 (
  echo [ERRORE] Ollama non trovato. Installa da https://ollama.com
  pause & exit /b 1
)

echo Avvio Ollama (se non gia' attivo)...
start "" /min ollama serve
timeout /t 2 >nul

echo Scarico il modello %MODEL% se manca...
call ollama pull %MODEL%
echo.

echo Traduco gli articoli mancanti...
call node scripts/translate-articles.mjs --model %MODEL%

echo.
echo Fatto. Ricostruisci il sito con build per vedere i risultati.
pause
