#!/bin/bash

echo "🚀 簡單行事曆部署腳本"
echo "=========================="

# 檢查是否已經設定遠端倉庫
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ 尚未設定 GitHub 遠端倉庫"
    echo ""
    echo "請先執行以下步驟："
    echo "1. 前往 github.com 建立新的 repository"
    echo "2. 複製 repository 的網址"
    echo "3. 執行：git remote add origin YOUR_REPOSITORY_URL"
    echo ""
    echo "或者，您可以使用 Netlify 部署："
    echo "1. 前往 netlify.com"
    echo "2. 用 GitHub 帳號登入"
    echo "3. 選擇 'New site from Git'"
    echo "4. 選擇您的 repository"
    echo ""
    exit 1
fi

echo "✅ 遠端倉庫已設定"
echo "📍 遠端倉庫網址：$(git remote get-url origin)"
echo ""

# 檢查是否有未提交的變更
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 發現未提交的變更，正在提交..."
    git add .
    git commit -m "Update calendar app"
    echo "✅ 變更已提交"
else
    echo "✅ 沒有未提交的變更"
fi

echo ""
echo "🚀 推送到 GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ 程式碼已成功推送到 GitHub！"
    echo ""
    echo "📋 下一步："
    echo "1. 前往您的 GitHub repository 頁面"
    echo "2. 點擊 'Settings'"
    echo "3. 左側選單選擇 'Pages'"
    echo "4. Source 選擇 'Deploy from a branch'"
    echo "5. Branch 選擇 'main'，資料夾選擇 '/ (root)'"
    echo "6. 點擊 'Save'"
    echo "7. 等待幾分鐘，您的行事曆就會有網址"
    echo ""
    echo "🎉 部署完成後，您就可以分享網址給家人了！"
else
    echo "❌ 推送失敗，請檢查您的網路連線和 GitHub 設定"
fi
