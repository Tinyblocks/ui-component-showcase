// Framework Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const libraryCards = document.querySelectorAll('.library-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedFramework = this.getAttribute('data-framework');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter library cards
            libraryCards.forEach(card => {
                const cardFrameworks = card.getAttribute('data-frameworks');
                
                if (selectedFramework === 'all') {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else if (cardFrameworks && cardFrameworks.includes(selectedFramework)) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
});

