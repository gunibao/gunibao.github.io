let messages = [];
const ADMIN_USERNAME = 'root'; // 修改管理员用户名为 root

function checkAdmin() {
    const currentUser = localStorage.getItem('username');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const currentUserSpan = document.getElementById('currentUser');
    
    // 显示当前用户名
    currentUserSpan.textContent = `当前用户：${currentUser}`;
    
    // 如果是管理员，显示清空按钮
    if (currentUser === ADMIN_USERNAME) {
        clearChatBtn.classList.remove('hidden');
    }
}

function clearChat() {
    const currentUser = localStorage.getItem('username');
    
    if (currentUser !== ADMIN_USERNAME) {
        alert('只有管理员才能清空聊天记录！');
        return;
    }
    
    if (confirm('确定要清空所有聊天记录吗？此操作不可恢复！')) {
        messages = [];
        localStorage.removeItem('chatMessages');
        displayMessages();
        alert('聊天记录已清空！');
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
        const username = localStorage.getItem('username');
        const newMessage = {
            username: username,
            content: message,
            time: new Date().toLocaleTimeString(),
            isAdmin: username === ADMIN_USERNAME
        };
        
        messages.push(newMessage);
        displayMessages();
        messageInput.value = '';
        
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
}

function displayMessages() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = messages.map(msg => `
        <div class="message ${msg.isAdmin ? 'admin-message' : ''}">
            <span class="username">${msg.username}</span>
            <span class="time">${msg.time}</span>
            <p class="content">${msg.content}</p>
        </div>
    `).join('');
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

// 页面加载时检查登录状态并加载消息
window.onload = function() {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }
    
    // 检查管理员权限
    checkAdmin();
    
    // 加载已存在的消息
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
        displayMessages();
    }
} 