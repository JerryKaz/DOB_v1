class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate).getTime();
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        
        this.update();
        this.start();
    }
    
    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            this.daysElement.textContent = '00';
            this.hoursElement.textContent = '00';
            this.minutesElement.textContent = '00';
            this.secondsElement.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        this.daysElement.textContent = days.toString().padStart(2, '0');
        this.hoursElement.textContent = hours.toString().padStart(2, '0');
        this.minutesElement.textContent = minutes.toString().padStart(2, '0');
        this.secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    start() {
        this.interval = setInterval(() => this.update(), 1000);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Initialize countdown for December 31 of current year
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const birthday = new Date(currentYear, 11, 31); // December 31
    
    // If birthday has passed this year, use next year's birthday
    if (birthday < new Date()) {
        birthday.setFullYear(currentYear + 1);
    }
    
    const timer = new CountdownTimer(birthday);
});