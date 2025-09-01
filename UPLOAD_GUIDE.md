# 🚀 超級簡單上傳指南

## 🎯 這個指南會教您：
1. 什麼是您的專案
2. 如何建立 GitHub 帳號
3. 如何上傳您的程式碼
4. 如何讓家人使用您的行事曆

---

## 📁 您的專案是什麼？

### 🗂️ 專案位置
您的行事曆專案現在在您電腦的這個位置：
```
/Users/willy/Documents/Projects/simple-calendar
```

### 📋 專案內容
這個資料夾裡面有：
- `index.html` - 主要的網頁檔案（就像一個文件）
- `style.css` - 讓網頁變漂亮的樣式（就像衣服）
- `script.js` - 讓行事曆可以運作的功能（就像大腦）
- `README.md` - 說明文件
- 其他檔案

### 🌟 專案功能
- 📅 顯示月曆
- ✨ 新增事件（如：明天要開會）
- 🗑️ 刪除事件
- 📱 手機和電腦都可以使用
- 💾 自動保存您的資料

---

## 🌐 第一步：建立 GitHub 帳號

### 1️⃣ 前往 GitHub
1. 打開瀏覽器（Chrome、Safari 都可以）
2. 在網址列輸入：`github.com`
3. 按 Enter

### 2️⃣ 註冊帳號
1. 點擊右上角的 "Sign up"（註冊）
2. 填寫資料：
   - Email：您的 Email 地址
   - 密碼：設定一個密碼
   - 用戶名：選擇一個用戶名（如：willy123）
3. 點擊 "Create account"
4. 完成驗證（GitHub 會發 Email 給您）

---

## 🏗️ 第二步：建立 Repository（儲存庫）

### 1️⃣ 建立新的 Repository
1. 登入 GitHub 後，點擊右上角的 "+" 號
2. 選擇 "New repository"

### 2️⃣ 填寫 Repository 資料
1. **Repository name**：輸入 `simple-calendar`
2. **Description**：可以輸入 `我的家庭行事曆`（選填）
3. **Public**：選擇這個（公開）
4. **Private**：不要選這個
5. **Add a README file**：**不要勾選**
6. **Add .gitignore**：**不要勾選**
7. **Choose a license**：**不要選擇**

### 3️⃣ 建立 Repository
1. 點擊綠色的 "Create repository" 按鈕
2. 等待頁面載入完成

### 4️⃣ 複製網址
建立完成後，您會看到一個頁面，上面有網址，複製它！
網址看起來像：`https://github.com/您的用戶名/simple-calendar.git`

---

## 💻 第三步：上傳程式碼

### 1️⃣ 回到您的專案資料夾
您現在應該在：`/Users/willy/Documents/Projects/simple-calendar`

### 2️⃣ 執行上傳命令
複製下面的命令，把 `YOUR_USERNAME` 換成您的 GitHub 用戶名：

```bash
git remote add origin https://github.com/YOUR_USERNAME/simple-calendar.git
```

例如，如果您的用戶名是 `willy123`，就輸入：
```bash
git remote add origin https://github.com/willy123/simple-calendar.git
```

### 3️⃣ 推送到 GitHub
輸入這個命令：
```bash
git push -u origin main
```

### 4️⃣ 輸入您的 GitHub 帳號密碼
系統會要求您輸入：
- 用戶名：您的 GitHub 用戶名
- 密碼：您的 GitHub 密碼

---

## 🌍 第四步：啟用 GitHub Pages

### 1️⃣ 前往您的 Repository
1. 在 GitHub 上點擊您的 `simple-calendar` repository
2. 點擊上方的 "Settings" 標籤

### 2️⃣ 啟用 Pages
1. 左側選單點擊 "Pages"
2. Source 選擇 "Deploy from a branch"
3. Branch 選擇 "main"
4. 資料夾選擇 "/ (root)"
5. 點擊 "Save"

### 3️⃣ 等待部署
等待幾分鐘，您會看到：
```
Your site is published at https://您的用戶名.github.io/simple-calendar
```

---

## 🎉 第五步：分享給家人

### 📱 分享網址
您的行事曆網址是：
`https://您的用戶名.github.io/simple-calendar`

### 📤 分享方式
- **LINE**：複製網址，貼到 LINE 聊天
- **WhatsApp**：複製網址，貼到 WhatsApp 聊天
- **Email**：複製網址，貼到 Email 內容
- **QR Code**：可以用線上工具產生 QR Code

---

## 🔧 如果遇到問題

### ❌ 常見錯誤和解決方法

**問題 1：密碼錯誤**
- 解決：檢查您的 GitHub 密碼是否正確

**問題 2：用戶名錯誤**
- 解決：檢查您的 GitHub 用戶名是否正確

**問題 3：網址錯誤**
- 解決：確保複製的網址是完整的

**問題 4：權限錯誤**
- 解決：確保您選擇的是 "Public" repository

---

## 💡 小貼士

1. **慢慢來**：一步一步做，不要急
2. **檢查拼寫**：用戶名和密碼要完全正確
3. **複製貼上**：盡量用複製貼上，避免手打錯誤
4. **截圖記錄**：可以截圖記錄每個步驟

---

## 🎯 完成後您會得到：

✅ 一個可以在網路上使用的行事曆
✅ 一個網址，可以分享給家人
✅ 家人可以在手機和電腦上使用您的行事曆
✅ 一個可以隨時更新的專案

---

## 🚀 準備好了嗎？

現在您已經知道所有步驟了！按照這個指南一步一步做，您就能成功上傳您的行事曆了！

如果遇到任何問題，隨時告訴我！我會幫您解決的！🌟
