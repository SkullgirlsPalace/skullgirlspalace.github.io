@echo off
cd /d "%~dp0"
echo Abrindo o editor visual do site...
node tools\site-editor\serve.js --open
pause
