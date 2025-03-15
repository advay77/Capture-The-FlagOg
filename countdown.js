// Dedicated countdown timer script
document.addEventListener('DOMContentLoaded', () => {
    console.log('Countdown script loaded');
    
    // Check if elements exist
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error('Countdown elements not found');
        return;
    }
    
    console.log('Countdown elements found');
    
    // Track previous values to animate only when changes occur
    let previousValues = {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    };
    
    function updateCountdown() {
        // Set to April 2, 2025 at 9:00 AM
        const eventDate = new Date('2025-04-02T09:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = eventDate - now;
        
        // Calculate all time values
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Format values with leading zeros
        const formatted = {
            days: String(days).padStart(2, '0'),
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0')
        };
        
        // Update elements with animation if values have changed
        if (previousValues.days !== formatted.days) {
            animateValueChange(daysElement, formatted.days);
            previousValues.days = formatted.days;
        }
        
        if (previousValues.hours !== formatted.hours) {
            animateValueChange(hoursElement, formatted.hours);
            previousValues.hours = formatted.hours;
        }
        
        if (previousValues.minutes !== formatted.minutes) {
            animateValueChange(minutesElement, formatted.minutes);
            previousValues.minutes = formatted.minutes;
        }
        
        if (previousValues.seconds !== formatted.seconds) {
            animateValueChange(secondsElement, formatted.seconds);
            previousValues.seconds = formatted.seconds;
        }
    }
    
    function animateValueChange(element, newValue) {
        // Add the changing class to trigger CSS animation
        element.classList.add('changing');
        
        // Update the value after a small delay
        setTimeout(() => {
            element.textContent = newValue;
            
            // Remove the class after animation completes
            setTimeout(() => {
                element.classList.remove('changing');
            }, 200);
        }, 200);
    }
    
    // Initialize countdown
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    console.log('Countdown timer started');
}); 