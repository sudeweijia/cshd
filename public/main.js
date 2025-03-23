// 监听密码提交按钮
document.getElementById('submit-password').addEventListener('click', function() {
    const password = document.getElementById('password-input').value;
    if (password === '32cl47') {
        // 密码正确，显示主界面
        document.getElementById('password-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
        loadMessages();
    } else {
        document.getElementById('error-message').textContent = 'Incorrect password!';
    }
});

// 监听留言提交表单
document.getElementById('message-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const message = document.getElementById('message-input').value;

    try {
        // 发送 POST 请求到后端 API
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        // 检查响应状态码
        if (!response.ok) {
            const errorData = await response.text(); // 尝试读取响应内容
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorData}`);
        }

        const data = await response.json(); // 解析 JSON 数据
        document.getElementById('message-input').value = '';
        loadMessages();
    } catch (error) {
        console.error('提交留言失败:', error);
        alert('提交留言失败，请检查控制台日志！');
    }
});

// 加载留言
async function loadMessages() {
    try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const messages = await response.json();
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = message.message;
            messagesContainer.appendChild(messageElement);
        });
    } catch (error) {
        console.error('加载留言失败:', error);
        alert('加载留言失败，请检查控制台日志！');
    }
}
