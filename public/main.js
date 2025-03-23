document.getElementById('submit-password').addEventListener('click', function() {
    const password = document.getElementById('password-input').value;
    if (password === '32cl47') {
        document.getElementById('password-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
        loadMessages();
    } else {
        document.getElementById('error-message').textContent = 'Incorrect password!';
    }
});

document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const message = document.getElementById('message-input').value;
    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message-input').value = '';
        loadMessages();
    });
});

function loadMessages() {
    fetch('/api/messages')
    .then(response => response.json())
    .then(messages => {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = message.message;
            messagesContainer.appendChild(messageElement);
        });
    });
}