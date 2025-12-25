class BirthdayMessages {
    constructor() {
        this.messages = JSON.parse(localStorage.getItem('birthdayMessages')) || [];
        this.messagesList = document.getElementById('messagesList');
        this.messageForm = document.getElementById('messageForm');
        
        this.init();
    }
    
    init() {
        this.messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addMessage();
        });
        
        this.displayMessages();
    }
    
    addMessage() {
        const messageInput = document.getElementById('message');
        const senderInput = document.getElementById('sender');
        
        const message = {
            text: messageInput.value.trim(),
            sender: senderInput.value.trim() || 'Anonymous',
            date: new Date().toLocaleDateString(),
            id: Date.now()
        };
        
        if (!message.text) {
            alert('Please enter a message!');
            return;
        }
        
        this.messages.unshift(message); // Add to beginning
        this.saveMessages();
        this.displayMessages();
        
        // Clear form
        messageInput.value = '';
        senderInput.value = '';
        
        // Show confirmation
        this.showConfirmation();
    }
    
    showConfirmation() {
        const submitBtn = this.messageForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Message Sent! 🎉';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
        }, 2000);
    }
    
    displayMessages() {
        if (this.messages.length === 0) {
            this.messagesList.innerHTML = '<p class="empty-state">No messages yet. Be the first to wish happy birthday!</p>';
            return;
        }
        
        this.messagesList.innerHTML = this.messages.map(message => `
            <div class="message-card" data-id="${message.id}">
                <p class="message-text">"${message.text}"</p>
                <div class="message-meta">
                    <span class="message-sender">— ${message.sender}</span>
                    <span class="message-date">${message.date}</span>
                </div>
            </div>
        `).join('');
    }
    
    saveMessages() {
        localStorage.setItem('birthdayMessages', JSON.stringify(this.messages));
    }
    
    clearMessages() {
        if (confirm('Are you sure you want to clear all messages?')) {
            this.messages = [];
            this.saveMessages();
            this.displayMessages();
        }
    }
}

// Initialize messages
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayMessages();
});