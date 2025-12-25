class BirthdayQuiz {
    constructor() {
        this.questions = [
            {
                question: "What's my favorite type of cuisine?",
                options: ["Italian", "Mexican", "Japanese", "Indian"],
                answer: 2 // Japanese
            },
            {
                question: "Which hobby did I start this year?",
                options: ["Painting", "Gardening", "Playing guitar", "Photography"],
                answer: 2 // Playing guitar
            },
            {
                question: "What's my go-to coffee order?",
                options: ["Black coffee", "Cappuccino", "Latte", "I don't drink coffee"],
                answer: 1 // Cappuccino
            },
            {
                question: "What was my favorite book I read this year?",
                options: ["Atomic Habits", "Project Hail Mary", "The Midnight Library", "I didn't read any books"],
                answer: 2 // The Midnight Library
            },
            {
                question: "Which destination did I visit this year?",
                options: ["Beach resort", "Mountain retreat", "Big city", "Historical site"],
                answer: 1 // Mountain retreat
            },
            {
                question: "What's my favorite way to spend a weekend?",
                options: ["Binge-watching shows", "Outdoor adventures", "Trying new restaurants", "Catching up on sleep"],
                answer: 1 // Outdoor adventures
            },
            {
                question: "What's one skill I want to learn next year?",
                options: ["Cooking", "A new language", "Surfing", "Digital drawing"],
                answer: 3 // Digital drawing
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswers = new Array(this.questions.length).fill(null);
        
        this.init();
    }
    
    init() {
        this.questionElement = document.getElementById('quizQuestion');
        this.optionsElement = document.getElementById('quizOptions');
        this.scoreElement = document.getElementById('score');
        this.currentQuestionElement = document.getElementById('currentQuestion');
        this.finalScoreElement = document.getElementById('finalScore');
        this.resultMessageElement = document.getElementById('resultMessage');
        
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.restartBtn = document.getElementById('restartQuiz');
        this.quizContent = document.querySelector('.quiz-content');
        this.quizResult = document.getElementById('quizResult');
        
        this.prevBtn.addEventListener('click', () => this.prevQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.submitBtn.addEventListener('click', () => this.submitQuiz());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        
        this.loadQuestion();
    }
    
    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        
        this.questionElement.textContent = question.question;
        this.optionsElement.innerHTML = '';
        this.currentQuestionElement.textContent = this.currentQuestion + 1;
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            if (this.selectedAnswers[this.currentQuestion] === index) {
                optionElement.classList.add('selected');
            }
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectAnswer(index));
            this.optionsElement.appendChild(optionElement);
        });
        
        // Update button states
        this.prevBtn.disabled = this.currentQuestion === 0;
        
        if (this.currentQuestion === this.questions.length - 1) {
            this.nextBtn.style.display = 'none';
            this.submitBtn.style.display = 'block';
        } else {
            this.nextBtn.style.display = 'block';
            this.submitBtn.style.display = 'none';
        }
        
        this.updateScore();
    }
    
    selectAnswer(index) {
        this.selectedAnswers[this.currentQuestion] = index;
        this.loadQuestion();
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
        }
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.loadQuestion();
        }
    }
    
    updateScore() {
        this.score = this.selectedAnswers.reduce((total, answer, index) => {
            if (answer === this.questions[index].answer) {
                return total + 1;
            }
            return total;
        }, 0);
        
        this.scoreElement.textContent = this.score;
    }
    
    submitQuiz() {
        this.updateScore();
        this.finalScoreElement.textContent = this.score;
        
        // Add result message
        if (this.score === this.questions.length) {
            this.resultMessageElement.textContent = "Perfect score! You know me incredibly well! 🎯";
        } else if (this.score >= this.questions.length * 0.7) {
            this.resultMessageElement.textContent = "Great job! You know me pretty well! 👍";
        } else if (this.score >= this.questions.length * 0.5) {
            this.resultMessageElement.textContent = "Not bad! You know me fairly well. 🤔";
        } else {
            this.resultMessageElement.textContent = "We should hang out more! 😄";
        }
        
        this.quizContent.style.display = 'none';
        this.quizResult.style.display = 'block';
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswers.fill(null);
        
        this.quizContent.style.display = 'block';
        this.quizResult.style.display = 'none';
        
        this.loadQuestion();
        this.updateScore();
    }
}

// Initialize quiz
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayQuiz();
});