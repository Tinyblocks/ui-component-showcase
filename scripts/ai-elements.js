// AI Elements Interactive Components Script

// Prevent automatic scroll to hash on page load
(function() {
    const hash = window.location.hash;
    window.scrollTo(0, 0);
    
    if (hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }
    
    window.addEventListener('load', function() {
        if (hash) {
            window.history.replaceState(null, null, hash);
        }
        window.scrollTo(0, 0);
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    
    initBurgerMenu();
    initChatbot();
    initSuggestionButtons();
    initSmoothScroll();
    initCodeActions();
});

// Burger Menu Functionality
function initBurgerMenu() {
    const burgerBtn = document.querySelector('.burger-menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    const body = document.body;

    if (!burgerBtn || !menuOverlay) return;

    burgerBtn.addEventListener('click', function() {
        const isOpen = menuOverlay.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    const closeBtn = document.querySelector('.menu-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });
    }

    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            closeMenu();
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    function openMenu() {
        menuOverlay.classList.add('active');
        burgerBtn.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuOverlay.classList.remove('active');
        burgerBtn.classList.remove('active');
        body.style.overflow = '';
    }
}

// Chatbot Functionality
function initChatbot() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const input = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSendBtn');

    if (!messagesContainer || !input || !sendBtn) return;

    // Fake AI responses based on keywords
    const responses = {
        'hello': ['Hello! How can I help you today?', 'Hi there! What would you like to know?', 'Hello! I\'m here to assist you.'],
        'help': ['I can help you with text analysis, code generation, data analysis, and more. What would you like to do?', 'I\'m here to help! Try asking me to analyze text, generate code, or analyze data.', 'I can assist with various tasks. What do you need help with?'],
        'analyze': ['I\'d be happy to analyze that for you. Could you provide more details about what you\'d like me to analyze?', 'I can help analyze text, data, or code. What specifically would you like analyzed?', 'Sure! Please share the content you\'d like me to analyze.'],
        'code': ['I can help generate code examples. What programming language or framework are you working with?', 'I\'d be glad to help with code. What kind of code do you need?', 'Sure! What code would you like me to generate?'],
        'data': ['I can help analyze data. Could you share the data you\'d like me to analyze?', 'I\'m ready to analyze your data. Please provide the dataset or details.', 'I can assist with data analysis. What data would you like me to examine?'],
        'text': ['I can analyze text for sentiment, extract key information, or summarize content. What would you like me to do?', 'Text analysis is one of my specialties! What kind of analysis do you need?', 'I can help with text analysis. What text would you like me to analyze?'],
        'thanks': ['You\'re welcome! Is there anything else I can help you with?', 'Happy to help! Feel free to ask if you need anything else.', 'You\'re welcome! Let me know if you have more questions.'],
        'default': ['That\'s interesting! Can you tell me more about what you\'d like help with?', 'I see. How can I assist you with that?', 'I understand. What would you like me to do?']
    };

    function getResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        for (const [keyword, responseArray] of Object.entries(responses)) {
            if (keyword !== 'default' && lowerMessage.includes(keyword)) {
                return responseArray[Math.floor(Math.random() * responseArray.length)];
            }
        }
        
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return messageDiv;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    function removeTypingIndicator(typingDiv) {
        if (typingDiv && typingDiv.parentNode) {
            typingDiv.parentNode.removeChild(typingDiv);
        }
    }

    function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        input.value = '';
        sendBtn.disabled = true;

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        // Simulate AI thinking time
        setTimeout(() => {
            removeTypingIndicator(typingIndicator);
            
            // Get AI response
            const response = getResponse(message);
            addMessage(response, false);
            
            sendBtn.disabled = false;
            input.focus();
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    sendBtn.addEventListener('click', sendMessage);

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    input.addEventListener('input', function() {
        sendBtn.disabled = !input.value.trim();
    });
}

// Suggestion Buttons
function initSuggestionButtons() {
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    const input = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSendBtn');

    suggestionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const suggestion = this.getAttribute('data-suggestion');
            if (input && suggestion) {
                input.value = suggestion;
                input.focus();
                if (sendBtn) {
                    sendBtn.disabled = false;
                }
                // Trigger send after a brief delay
                setTimeout(() => {
                    if (sendBtn) {
                        sendBtn.click();
                    }
                }, 100);
            }
        });
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.documentElement.classList.add('smooth-scroll');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.ai-nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Code Action Buttons
function initCodeActions() {
    const codeActionButtons = document.querySelectorAll('.code-action-btn');
    
    codeActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            const card = this.closest('.conversation-card');
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            if (action === 'Copy') {
                const codeBlock = card.querySelector('.code-block code');
                if (codeBlock) {
                    const text = codeBlock.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        const originalText = this.textContent;
                        this.textContent = 'Copied!';
                        setTimeout(() => {
                            this.textContent = originalText;
                        }, 2000);
                    }).catch(() => {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = codeBlock.textContent;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        
                        const originalText = this.textContent;
                        this.textContent = 'Copied!';
                        setTimeout(() => {
                            this.textContent = originalText;
                        }, 2000);
                    });
                }
            } else if (action === 'Run') {
                // Visual feedback for run action
                const originalText = this.textContent;
                this.textContent = 'Running...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Executed';
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.disabled = false;
                    }, 1500);
                }, 1000);
            }
        });
    });
}

// Add ripple animation to CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .message {
        animation: messageSlideIn 0.3s ease;
    }
    
    .typing-message {
        animation: none;
    }
`;
document.head.appendChild(style);

