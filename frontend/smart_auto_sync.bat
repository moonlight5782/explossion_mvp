@echo off
cd /d "%~dp0"

REM Подтягиваем последние изменения с GitHub
git pull origin main

REM Добавляем только нужные файлы, игнорируя временные папки
for %%f in (
    **/*.js
    **/*.ts
    **/*.jsx
    **/*.tsx
    **/*.css
    **/*.html
    **/*.md
) do (
    if not "%%f"=="node_modules" if not "%%f"==".next" if not "%%f"==".git" git add "%%f"
)

REM Коммитим изменения, если есть что коммитить
git commit -m "Auto commit from VS Code" 2>nul

REM Пушим на GitHub
git push origin main
