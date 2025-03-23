// 监听密码提交按钮
document.getElementById('submit-password').addEventListener('click', function() {
    const password = document.getElementById('password-input').value;
    if (password === '32cl47') {
        // 密码正确，显示主界面
        document.getElementById('password-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
        loadMessages(); // 加载留言
    } else {
        // 密码错误，显示错误信息
        document.getElementById('error-message').textContent = 'Incorrect password!';
    }
});

// 监听留言提交表单
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    const message = document.getElementById('message-input').value;

    // 发送 POST 请求到后端 API
    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // 将留言内容转换为 JSON 格式
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // 解析响应为 JSON
    })
    .then(data => {
        // 清空输入框并重新加载留言
        document.getElementById('message-input').value = '';
        loadMessages();
    })
    .catch(error => {
        console.error('Error:', error); // 打印错误信息
    });
});

// 加载留言
function loadMessages() {
    fetch('/api/messages')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // 解析响应为 JSON
    })
    .then(messages => {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = ''; // 清空留言容器
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = message.message; // 显示留言内容
            messagesContainer.appendChild(messageElement);
        });
    })
    .catch(error => {
        console.error('Error:', error); // 打印错误信息
    });
}
