@echo off
REM ==============================================================================
REM Tên file: autopush.bat (Phien ban Kiem soat loi tuyet doi)
REM ==============================================================================
chcp 65001 >nul
echo ========================================================
echo       TIEN TRINH DONG BO DU LIEU LEN GITHUB
echo ========================================================
echo.

REM --- BUOC 1: Kiem tra khoi tao Git ---
echo [1/4] Kiem tra trang thai Git...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo [LOI] Thu muc nay chua duoc khoi tao Git!
    echo Giai phap: Hay mo Terminal va chay lenh 'git init'.
    goto :halt
)
echo --^> [OK] Git da san sang.
echo.

REM --- BUOC 2: Gom file (Staging) ---
echo [2/4] Dang gom cac file thay doi vao Staging...
git add .
if %errorlevel% neq 0 (
    echo [LOI] Khong the them file bang lenh 'git add .'.
    goto :halt
)
echo --^> [OK] Da gom file thanh cong.
echo.

REM --- BUOC 3: Dong goi (Commit) ---
echo [3/4] Dang tao Commit...
set COMMIT_MSG=%~1
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Auto commit luc %time% ngay %date%

REM Chay lenh commit nhung khong chan output de nguoi dung thay Git dang lam gi
git commit -m "%COMMIT_MSG%"

REM Kiem tra ma loi cua buoc Commit
if %errorlevel% equ 1 (
    echo.
    echo [THONG BAO] Khong co file nao bi thay doi. Kho code cua ban dang o trang thai moi nhat.
    echo Ban khong can phai push tiep.
    goto :halt
) else if %errorlevel% neq 0 (
    echo [LOI] Co loi xay ra trong qua trinh Commit.
    goto :halt
)
echo --^> [OK] Da commit thanh cong.
echo.

REM --- BUOC 4: Day len Github (Push) ---
echo [4/4] Dang ket noi va day code len GitHub...
echo --------------------------------------------------------
REM Chay lenh push. Moi thong bao cua Git se hien thi o day.
git push
echo --------------------------------------------------------

if %errorlevel% neq 0 (
    echo.
    echo ========================================================
    echo [LOI NGHIEM TRONG] PUSH THAT BAI!
    echo ========================================================
    echo Hay doc dong thong bao loi cua Git nam o giua 2 duong ke ngang tren.
    echo Cac nguyen nhan pho bien va cach sua:
    echo 1. Chua link voi Github: Chay lenh 'git remote add origin ^<link-github-cua-ban^>'
    echo 2. Chua set nhanh upstream: Chay lenh 'git push -u origin main'
    echo 3. Xung dot code: Chay lenh 'git pull' de keo code moi tren mang ve truoc.
    echo ========================================================
    goto :halt
)

echo.
echo ========================================================
echo [THANH CONG] MA NGUON DA DUOC DAY LEN GITHUB AN TOAN!
echo ========================================================

:halt
echo.
REM Lenh pause giu cua so khong bi tat cho den khi ban bam phim bat ky
pause