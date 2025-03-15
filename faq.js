// Dedicated FAQ script
document.addEventListener('DOMContentLoaded', function() {
    console.log('FAQ script loaded');
    
    // Wait a brief moment to ensure DOM is fully processed
    setTimeout(function() {
        initializeFAQ();
    }, 100);
    
    function initializeFAQ() {
        // Get all FAQ questions
        const faqQuestions = document.querySelectorAll('.faq-question');
        console.log('Found FAQ questions:', faqQuestions.length);
        
        if (faqQuestions.length === 0) {
            console.error('No FAQ questions found. DOM might not be fully loaded.');
            return;
        }
        
        // Remove any existing event listeners (to prevent duplicates)
        faqQuestions.forEach(function(question) {
            const newQuestion = question.cloneNode(true);
            question.parentNode.replaceChild(newQuestion, question);
        });
        
        // Get the fresh elements
        const freshQuestions = document.querySelectorAll('.faq-question');
        
        // Add click event to each question
        freshQuestions.forEach(function(question) {
            question.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                console.log('Question clicked:', this.querySelector('h3').textContent);
                
                // Get parent item
                const item = this.parentElement;
                
                // Toggle active state
                item.classList.toggle('active');
                
                // Change icon
                const icon = this.querySelector('i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
                
                console.log('FAQ item toggled:', item.classList.contains('active'));
            });
        });
        
        console.log('FAQ initialization complete');
    }
}); 