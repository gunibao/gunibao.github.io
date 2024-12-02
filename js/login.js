// 存储用户数据的键名
const USERS_KEY = 'chatUsers';

// 初始化默认用户
function initDefaultUser() {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (!users['root']) {
        users['root'] = 'admin';
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
}

// 切换登录/注册标签
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

// 注册功能
function register() {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (!username || !password) {
        alert('用户名和密码不能为空！');
        return;
    }

    if (password !== confirmPassword) {
        alert('两次输入的密码不一致！');
        return;
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    
    if (users[username]) {
        alert('用户名已存在！');
        return;
    }

    users[username] = password;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    alert('注册成功！请登录');
    switchTab('login');
}

// 登录功能
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');

    if (users[username] === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'chat.html';
    } else {
        alert('用户名或密码错误！');
    }
}

// 检查登录状态
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn && window.location.pathname.includes('login.html')) {
        window.location.href = 'chat.html';
    }
    if (!isLoggedIn && window.location.pathname.includes('chat.html')) {
        window.location.href = 'login.html';
    }
}

// 页面加载时初始化
window.onload = function() {
    initDefaultUser();
    checkLogin();
}; 
window.onload = checkLogin; 