# 🚀 部署指南 - 如何發佈您的行事曆

## 📋 部署選項總覽

| 方法 | 難度 | 成本 | 推薦度 | 說明 |
|------|------|------|--------|------|
| GitHub Pages | ⭐⭐ | 免費 | ⭐⭐⭐⭐⭐ | 專業、穩定、免費 |
| Netlify | ⭐ | 免費 | ⭐⭐⭐⭐ | 簡單、快速、免費 |
| Vercel | ⭐ | 免費 | ⭐⭐⭐⭐ | 現代化、快速、免費 |
| 本地網路 | ⭐⭐ | 免費 | ⭐⭐⭐ | 適合家庭使用 |

## 🌟 方法一：GitHub Pages（推薦）

### 步驟 1：建立 GitHub 帳號
1. 前往 [github.com](https://github.com) 註冊
2. 驗證您的 Email 地址

### 步驟 2：建立新的 Repository
1. 點擊右上角的 "+" 號
2. 選擇 "New repository"
3. Repository 名稱：`simple-calendar`
4. 選擇 "Public"
5. 不要勾選 "Add a README file"
6. 點擊 "Create repository"

### 步驟 3：上傳您的程式碼
在您的專案目錄中執行以下命令：

```bash
# 添加遠端倉庫（請替換 YOUR_USERNAME 為您的 GitHub 用戶名）
git remote add origin https://github.com/YOUR_USERNAME/simple-calendar.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步驟 4：啟用 GitHub Pages
1. 在您的 repository 頁面，點擊 "Settings"
2. 左側選單選擇 "Pages"
3. Source 選擇 "Deploy from a branch"
4. Branch 選擇 "main"，資料夾選擇 "/ (root)"
5. 點擊 "Save"
6. 等待幾分鐘，您的網站就會有網址

### 步驟 5：分享給家人
您的行事曆網址會是：
`https://YOUR_USERNAME.github.io/simple-calendar`

## ⚡ 方法二：Netlify（超簡單）

### 步驟 1：註冊 Netlify
1. 前往 [netlify.com](https://netlify.com)
2. 用 GitHub 帳號登入

### 步驟 2：部署網站
1. 點擊 "New site from Git"
2. 選擇 "GitHub"
3. 選擇您的 `simple-calendar` repository
4. 點擊 "Deploy site"
5. 幾分鐘後完成部署

### 步驟 3：自訂網址
1. 在 Site settings > Domain management
2. 可以自訂網址，例如：`my-family-calendar.netlify.app`

## 🏠 方法三：本地網路共享

### 步驟 1：啟動本地伺服器
```bash
# 在您的專案目錄中執行
python3 -m http.server 8000
```

### 步驟 2：找到您的 IP 位址
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### 步驟 3：家人訪問
家人可以在瀏覽器中輸入：
`http://您的IP位址:8000`

## 📱 分享給家人的方法

### 1. 直接分享網址
- 複製您的行事曆網址
- 透過 LINE、WhatsApp、Email 發送給家人

### 2. 建立 QR Code
- 使用 [qr-code-generator.com](https://www.qr-code-generator.com/)
- 輸入您的行事曆網址
- 下載 QR Code 圖片
- 家人掃描即可開啟

### 3. 設定為瀏覽器首頁
- 家人可以將您的行事曆設為瀏覽器首頁
- 每次開啟瀏覽器都會看到行事曆

## 🔧 常見問題

### Q: 家人看不到我新增的事件？
A: 每個人的瀏覽器都是獨立的，事件只會顯示在新增者的瀏覽器中。

### Q: 如何讓家人也能編輯事件？
A: 需要升級為多人協作版本，這需要後端資料庫支援。

### Q: 網址太長不好記？
A: 可以使用 Netlify 或 Vercel 自訂短網址。

## 💡 進階功能建議

1. **自動備份**：定期將事件匯出為檔案
2. **多主題**：提供不同顏色主題選擇
3. **事件提醒**：瀏覽器通知功能
4. **匯入/匯出**：支援 CSV 或 JSON 格式

## 🎯 下一步

選擇您喜歡的部署方法，按照步驟操作。如果遇到任何問題，可以：
1. 查看 GitHub 或 Netlify 的官方文件
2. 在網路上搜尋相關教學
3. 詢問有經驗的朋友

祝您部署成功！🎉
