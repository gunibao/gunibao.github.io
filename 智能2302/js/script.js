function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const secretSection = document.getElementById('secretSection');
    const passwordSection = document.getElementById('passwordSection');
    
    if (passwordInput.value === '2302') {
        secretSection.classList.remove('hidden');
        passwordSection.classList.add('hidden');
    } else {
        alert('智能2班密码错误，请重试！');
    }
}

function checkSecret() {
    const secretInput = document.getElementById('secretInput');
    const accountInfo = document.getElementById('accountInfo');
    
    if (secretInput.value === '余文涛是大帅哥') {
        accountInfo.innerHTML = `
            <p>账号：596352@nubz.top</p>
            <p>密码：asd2024</p>
            <p style="color: red; margin-top: 10px; font-size: 0.9em;">
                请注意保密，不要分享给他人！进入后请选3号位！
            </p>
        `;
        accountInfo.classList.remove('hidden');
    } else {
        alert('暗号错误，请重试！');
        accountInfo.classList.add('hidden');
    }
} 