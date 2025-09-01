class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.events = JSON.parse(localStorage.getItem('calendarEvents')) || {};
        this.init();
    }

    init() {
        this.renderCalendar();
        this.bindEvents();
        this.updateTodayEvents();
        this.setCurrentDate();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getFullYear();
        
        // 更新月份顯示
        document.getElementById('currentMonth').textContent = 
            `${year}年${this.currentDate.getMonth() + 1}月`;
        
        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';
        
        const firstDay = new Date(year, this.currentDate.getMonth(), 1);
        const lastDay = new Date(year, this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = date.getDate();
            
            // 檢查是否為其他月份的日期
            if (date.getMonth() !== this.currentDate.getMonth()) {
                dayElement.classList.add('other-month');
            }
            
            // 檢查是否為今天
            if (this.isToday(date)) {
                dayElement.classList.add('today');
            }
            
            // 檢查是否有事件
            const dateString = this.formatDate(date);
            if (this.events[dateString] && this.events[dateString].length > 0) {
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
    }

    addEvent() {
        const date = document.getElementById('eventDate').value;
        const title = document.getElementById('eventTitle').value.trim();
        const description = document.getElementById('eventDescription').value.trim();
        
        if (!date || !title) {
            alert('請填寫日期和事件標題！');
            return;
        }
        
        if (!this.events[date]) {
            this.events[date] = [];
        }
        
        const event = {
            id: Date.now(),
            title: title,
            description: description,
            date: date
        };
        
        this.events[date].push(event);
        this.saveEvents();
        this.renderCalendar();
        this.updateTodayEvents();
        
        // 清空表單
        document.getElementById('eventTitle').value = '';
        document.getElementById('eventDescription').value = '';
        
        alert('事件新增成功！');
    }

    showDateEvents(date) {
        const dateString = this.formatDate(date);
        const events = this.events[dateString] || [];
        
        if (events.length === 0) {
            alert(`${dateString} 沒有事件`);
            return;
        }
        
        let message = `${dateString} 的事件：\n\n`;
        events.forEach((event, index) => {
            message += `${index + 1}. ${event.title}`;
            if (event.description) {
                message += `\n   描述：${event.description}`;
            }
            message += '\n\n';
        });
        
        alert(message);
    }

    updateTodayEvents() {
        const today = this.formatDate(new Date());
        const todayEvents = this.events[today] || [];
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
                ${event.description ? `<p>${event.description}</p>` : ''}
                <div class="event-date">${event.date}</div>
                <button onclick="calendar.deleteEvent('${event.date}', ${event.id})" 
                        style="background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                    刪除
                </button>
            `;
            todayEventsDiv.appendChild(eventElement);
        });
    }

    deleteEvent(date, eventId) {
        if (confirm('確定要刪除這個事件嗎？')) {
            this.events[date] = this.events[date].filter(event => event.id !== eventId);
            if (this.events[date].length === 0) {
                delete this.events[date];
            }
            this.saveEvents();
            this.renderCalendar();
            this.updateTodayEvents();
        }
    }

    saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(this.events));
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
        const today = new Date();
        this.currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }
}

// 初始化行事曆
const calendar = new Calendar();

// 頁面載入完成後更新今日事件
document.addEventListener('DOMContentLoaded', () => {
    calendar.updateTodayEvents();
});
