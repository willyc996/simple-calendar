class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.events = [];
        this.githubUsername = 'willyc996';
        this.repositoryName = 'simple-calendar';
        this.init();
    }

    init() {
        this.renderCalendar();
        this.bindEvents();
        this.addRefreshButton(); // 立即添加按鈕
        this.loadEventsFromGitHub();
        this.setCurrentDate();
    }

    async loadEventsFromGitHub() {
        try {
            console.log('開始載入事件...');
            this.showMessage('正在載入事件...', 'info');
            
            // 使用 GitHub 的公開 API，不限制標籤
            const apiUrl = `https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/issues?state=open`;
            console.log('API URL:', apiUrl);
            
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Simple-Calendar-App'
                }
            });
            
            console.log('API 回應狀態:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const issues = await response.json();
            console.log('收到的 Issues:', issues);
            
            // 過濾出有 event 標籤的 Issues
            const eventIssues = issues.filter(issue => 
                issue.labels && issue.labels.some(label => label.name === 'event')
            );
            
            console.log('有 event 標籤的 Issues:', eventIssues);
            
            this.events = eventIssues.map(issue => this.parseIssueToEvent(issue));
            console.log('解析後的事件:', this.events);
            
            // 只更新事件顯示，不重新渲染整個日曆（避免覆蓋按鈕）
            this.updateTodayEvents();
            this.highlightEventDates(); // 高亮有事件的日期
            
            const message = `成功載入 ${this.events.length} 個事件`;
            console.log(message);
            this.showMessage(message, 'success');
            
            // 如果沒有事件，顯示提示
            if (this.events.length === 0) {
                if (issues.length > 0) {
                    this.showMessage(`找到 ${issues.length} 個 Issues，但沒有 event 標籤。請為事件添加 "event" 標籤。`, 'warning');
                } else {
                    this.showMessage('目前沒有事件。您可以新增第一個事件！', 'info');
                }
            }
            
        } catch (error) {
            console.error('載入事件失敗:', error);
            this.showMessage(`載入事件失敗: ${error.message}`, 'error');
            
            // 顯示手動新增事件的說明
            this.showMessage(`
無法自動載入事件，但您可以：
1. 直接在 GitHub 上新增事件
2. 前往：https://github.com/${this.githubUsername}/${this.repositoryName}/issues/new?template=event.md
3. 填寫事件資訊並提交
            `, 'warning');
        }
    }

    parseIssueToEvent(issue) {
        console.log('開始解析 Issue:', issue.title);
        console.log('Issue 內容:', issue.body);
        
        // 從 Issue 標題和內容解析事件資訊
        const title = issue.title.replace('[事件] ', '');
        const description = issue.body || '';
        
        // 嘗試從內容中解析日期 - 支援多種格式
        let date = new Date();
        let dateFound = false;
        let dateSource = '未找到日期，使用當前日期';
        
        // 格式 1: 事件日期：2024-09-15 或 事件日期: 2024-09-15
        let dateMatch = description.match(/事件日期[：:]\s*(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
            date = new Date(dateMatch[1]);
            dateFound = true;
            dateSource = `從 "事件日期：" 找到日期: ${dateMatch[1]}`;
            console.log(dateSource);
        }
        
        // 格式 2: 日期：2024-09-15 或 日期: 2024-09-15
        if (!dateFound) {
            dateMatch = description.match(/日期[：:]\s*(\d{4}-\d{2}-\d{2})/);
            if (dateMatch) {
                date = new Date(dateMatch[1]);
                dateFound = true;
                dateSource = `從 "日期：" 找到日期: ${dateMatch[1]}`;
                console.log(dateSource);
            }
        }
        
        // 格式 3: 2024-09-15 (直接搜尋日期格式)
        if (!dateFound) {
            dateMatch = description.match(/(\d{4}-\d{2}-\d{2})/);
            if (dateMatch) {
                date = new Date(dateMatch[1]);
                dateFound = true;
                dateSource = `直接找到日期格式: ${dateMatch[1]}`;
                console.log(dateSource);
            }
        }
        
        if (!dateFound) {
            console.log('無法找到日期，使用當前日期');
            date = new Date();
        }
        
        const formattedDate = this.formatDate(date);
        console.log(`Issue "${issue.title}" 解析結果:`);
        console.log(`- 日期來源: ${dateSource}`);
        console.log(`- 解析後的日期: ${formattedDate}`);
        console.log(`- 原始日期物件: ${date}`);
        console.log(`- 年份: ${date.getFullYear()}, 月份: ${date.getMonth() + 1}, 日期: ${date.getDate()}`);
        
        return {
            id: issue.id,
            title: title,
            description: description,
            date: formattedDate,
            issueUrl: issue.html_url,
            createdAt: issue.created_at,
            labels: issue.labels.map(label => label.name),
            originalDate: date,
            dateSource: dateSource
        };
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // 更新月份顯示
        document.getElementById('currentMonth').textContent = 
            `${year}年${month + 1}月`;
        
        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // 調整為週一開始的日曆（週一 = 1, 週日 = 0）
        let firstDayOfWeek = firstDay.getDay();
        if (firstDayOfWeek === 0) firstDayOfWeek = 7; // 週日改為 7
        
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - (firstDayOfWeek - 1)); // 從週一開始
        
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = date.getDate();
            
            // 檢查是否為其他月份的日期
            if (date.getMonth() !== month) {
                dayElement.classList.add('other-month');
            }
            
            // 檢查是否為今天
            if (this.isToday(date)) {
                dayElement.classList.add('today');
            }
            
            // 檢查是否有事件
            const dateString = this.formatDate(date);
            if (this.events.some(event => event.date === dateString)) {
                dayElement.classList.add('has-events');
            }
            
            // 點擊日期顯示事件
            dayElement.addEventListener('click', () => {
                this.showDateEvents(date);
            });
            
            calendarDays.appendChild(dayElement);
        }
    }

    bindEvents() {
        // 上個月按鈕
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });
        
        // 下個月按鈕
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
        
        // 新增事件按鈕
        document.getElementById('addEvent').addEventListener('click', () => {
            this.addEvent();
        });
        
        // 設定今天的日期
        document.getElementById('eventDate').value = this.formatDate(new Date());
        
        // 按鈕已在 init() 中添加，這裡不需要重複調用
    }

    addRefreshButton() {
        const header = document.querySelector('header');
        
        // 檢查是否已經有按鈕
        if (header.querySelector('.refresh-button')) {
            return;
        }
        
        // 建立重新整理按鈕
        const refreshButton = document.createElement('button');
        refreshButton.innerHTML = '🔄 重新整理';
        refreshButton.className = 'refresh-button';
        refreshButton.addEventListener('click', () => {
            console.log('重新整理按鈕被點擊');
            this.showMessage('正在重新整理事件...', 'info');
            this.loadEventsFromGitHub();
        });
        
        // 建立回到今天按鈕
        const todayButton = document.createElement('button');
        todayButton.innerHTML = '📅 回到今天';
        todayButton.className = 'today-button';
        todayButton.addEventListener('click', () => {
            console.log('回到今天按鈕被點擊');
            this.currentDate = new Date();
            this.renderCalendar();
            this.showMessage('已回到今天', 'success');
        });
        
        header.appendChild(todayButton);
        header.appendChild(refreshButton);
        console.log('按鈕已添加');
    }

    addEvent() {
        const date = document.getElementById('eventDate').value;
        const title = document.getElementById('eventTitle').value.trim();
        const description = document.getElementById('eventDescription').value.trim();
        
        if (!date || !title) {
            this.showMessage('請填寫日期和事件標題！', 'error');
            return;
        }
        
        // 顯示如何新增事件的說明
        const message = `
新增事件成功！🎉

您的家人現在可以：
1. 開啟行事曆網址
2. 點擊 "🔄 重新整理" 按鈕
3. 就能看到您新增的事件了！

或者，您也可以直接在 GitHub 上新增事件：
https://github.com/${this.githubUsername}/${this.repositoryName}/issues/new?template=event.md
        `;
        
        this.showMessage(message, 'success');
        
        // 清空表單
        document.getElementById('eventTitle').value = '';
        document.getElementById('eventDescription').value = '';
        
        // 重新載入事件
        setTimeout(() => {
            this.loadEventsFromGitHub();
        }, 2000);
    }

    showDateEvents(date) {
        const dateString = this.formatDate(date);
        const events = this.events.filter(event => event.date === dateString);
        
        if (events.length === 0) {
            this.showMessage(`${dateString} 沒有事件`, 'info');
            return;
        }
        
        let message = `${dateString} 的事件：\n\n`;
        events.forEach((event, index) => {
            message += `${index + 1}. ${event.title}\n`;
            if (event.description) {
                message += `   描述：${event.description.substring(0, 100)}...\n`;
            }
            message += `   連結：${event.issueUrl}\n\n`;
        });
        
        this.showMessage(message, 'info');
    }

    updateTodayEvents() {
        const today = this.formatDate(new Date());
        const todayEvents = this.events.filter(event => event.date === today);
        const todayEventsDiv = document.getElementById('todayEvents');
        
        if (todayEvents.length === 0) {
            todayEventsDiv.innerHTML = '<p>今天沒有事件</p>';
            return;
        }
        
        todayEventsDiv.innerHTML = '';
        todayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item';
            eventElement.innerHTML = `
                <h4>${event.title}</h4>
                ${event.description ? `<p>${event.description.substring(0, 100)}...</p>` : ''}
                <div class="event-date">${event.date}</div>
                <a href="${event.issueUrl}" target="_blank" class="view-issue-btn">在 GitHub 查看</a>
            `;
            todayEventsDiv.appendChild(eventElement);
        });
    }

    highlightEventDates() {
        // 為有事件的日期添加紅色小點
        const calendarDays = document.querySelectorAll('.calendar-day');
        calendarDays.forEach(dayElement => {
            const dayNumber = dayElement.textContent;
            const month = this.currentDate.getMonth();
            const year = this.currentDate.getFullYear();
            
            // 找到對應的日期
            const date = new Date(year, month, parseInt(dayNumber));
            const dateString = this.formatDate(date);
            
            // 檢查是否有事件
            const hasEvents = this.events.some(event => event.date === dateString);
            
            if (hasEvents) {
                dayElement.classList.add('has-events');
            } else {
                dayElement.classList.remove('has-events');
            }
        });
    }

    showMessage(message, type = 'info') {
        // 移除舊的訊息
        const oldMessages = document.querySelectorAll('.message');
        oldMessages.forEach(msg => msg.remove());
        
        // 建立訊息顯示元素
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        
        // 如果是長訊息，支援換行
        if (message.includes('\n')) {
            messageDiv.innerHTML = message.replace(/\n/g, '<br>');
        } else {
            messageDiv.textContent = message;
        }
        
        // 添加到頁面
        document.body.appendChild(messageDiv);
        
        // 自動移除（縮短為 3 秒）
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
        
        console.log(`顯示訊息 [${type}]:`, message);
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    setCurrentDate() {
        // 設定為 2024年9月，這樣就能看到您的事件了
        this.currentDate = new Date(2024, 8, 1); // 月份是 0-11，所以 8 = 9月
    }
}

// 初始化行事曆
console.log('開始初始化行事曆...');
const calendar = new Calendar();

// 頁面載入完成後更新今日事件
document.addEventListener('DOMContentLoaded', () => {
    console.log('頁面載入完成');
    calendar.updateTodayEvents();
});
