document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Typed.js for animated typing effect

    // Navbar active state and color change on scroll
    const navbarLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        // Navbar color change on scroll
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navbarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.navbar-collapse').classList.remove('show');
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1s ease-in-out';
            }, 100);
        });
    };
    animateProgressBars();

    // Chatbot functionality
    const toggleChatbot = document.getElementById('toggleChatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');

    toggleChatbot.addEventListener('click', function() {
        chatbotContainer.classList.add('active');
    });

    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });

    sendMessage.addEventListener('click', function() {
        sendUserMessage();
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        addMessage('user', message);
        userInput.value = '';
        processMessage(message);
    }

    function addMessage(sender, message) {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerHTML = `<div class="message-content">${message}</div><div class="message-time">${timeString}</div>`;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    async function processMessage(message) {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot');
        typingIndicator.innerHTML = `<div class="message-content"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            chatbotMessages.removeChild(typingIndicator);
            const response = getBotResponse(message.toLowerCase());
            addMessage('bot', response);
        } catch (error) {
            console.error('Error processing message:', error);
            chatbotMessages.removeChild(typingIndicator);
            addMessage('bot', 'Sorry, I encountered an error. Please try again later.');
        }
    }

    function getBotResponse(message) {
        const msg = message.toLowerCase();
        const responsePatterns = [
            {
                patterns: ['hii', 'hi', 'hello', 'hola', 'hey','hlo'],
                response: "Hello! I'm your virtual assistant. How can I help you today?"
            },
            {
                patterns: ['education', 'cgpa', 'college'],
                response: "I'm pursuing B.Tech in Civil Engineering at IIT Ropar (2022–2026) with a CGPA of 6.78. I scored 77.2% in 12th and 83.6% in 10th from CBSE."
            },
            {
                patterns: ['skills', 'technical skills', 'technologies'],
                response: "I'm skilled in C/C++, Python, SQL, Pandas, NumPy, Seaborn, Scikit-learn, Power BI, Arduino, AutoCAD, and more."
            },
            {
                patterns: ['phishing', 'detection project'],
                response: "I developed a phishing domain detection system using Python and Scikit-learn with 97.05% accuracy. It was deployed using Flask on AWS EC2."
            },
            {
                patterns: ['google play', 'data analysis'],
                response: "I analyzed 16,353 records from the Google Play Store using Python, Seaborn, and Power BI, uncovering operational insights and improving performance metrics."
            },
            {
                patterns: ['rfid', 'arduino'],
                response: "I created an RFID-based secure access system with Arduino, integrating hardware and troubleshooting for reliability."
            },
            {
                patterns: ['contact', 'email', 'linkedin'],
                response: "You can email me at 2022CEB1008@iitrpr.ac.in, or find me on LinkedIn: linkedin.com/in/dheeraj-thalour and GitHub: github.com/Dheeraj23-08."
            }
        ];

        for (const patternObj of responsePatterns) {
            for (const pattern of patternObj.patterns) {
                if (msg.includes(pattern)) {
                    return patternObj.response;
                }
            }
        }

        return "I'm sorry, I didn't quite understand that. You can ask me about my education, skills, projects, or contact info.";
    }
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', event => {
        console.log('Button clicked:', event.target.href); // Debugging purposes
    });
});