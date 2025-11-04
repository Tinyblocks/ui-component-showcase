// Uiverse Interactive Components Script

// Prevent automatic scroll to hash on page load
(function() {
    // Save the hash before any scrolling happens
    const hash = window.location.hash;
    
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Prevent hash from causing scroll
    if (hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }
    
    // After page loads, restore hash if it existed but don't scroll
    window.addEventListener('load', function() {
        if (hash) {
            window.history.replaceState(null, null, hash);
        }
        // Ensure we're at the top
        window.scrollTo(0, 0);
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    // Ensure we start at the top
    window.scrollTo(0, 0);
    
    initBurgerMenu();
    initTabs();
    initAccordion();
    initSwitches();
    initTooltips();
    initButtons();
    initSmoothScroll();
    initTableInteractivity();
    initProjectItems();
    initBadges();
    initTestimonials();
    initPricingCards();
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

// Tab Switching Functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.uiverse-tab[data-tab]');
    const tabPanels = document.querySelectorAll('.tab-panel[data-panel]');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const tabContainer = this.closest('.uiverse-card');
            
            // Remove active class from all tabs in this container
            tabContainer.querySelectorAll('.uiverse-tab').forEach(tab => {
                tab.classList.remove('uiverse-tab-active');
            });
            
            // Add active class to clicked tab
            this.classList.add('uiverse-tab-active');
            
            // Hide all panels in this container
            tabContainer.querySelectorAll('.tab-panel').forEach(panel => {
                panel.style.display = 'none';
                panel.classList.remove('active');
            });
            
            // Show target panel
            const targetPanel = tabContainer.querySelector(`.tab-panel[data-panel="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                targetPanel.classList.add('active');
            }
        });
    });
}

// Accordion Expand/Collapse Functionality
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.uiverse-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.uiverse-accordion-item');
            const content = accordionItem.querySelector('.uiverse-accordion-content');
            const icon = this.querySelector('.uiverse-accordion-icon');
            const isActive = accordionItem.classList.contains('active');

            // Close all accordion items in the same accordion
            const accordion = accordionItem.closest('.uiverse-accordion');
            accordion.querySelectorAll('.uiverse-accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    const itemContent = item.querySelector('.uiverse-accordion-content');
                    const itemIcon = item.querySelector('.uiverse-accordion-icon');
                    if (itemContent) {
                        itemContent.style.display = 'none';
                    }
                    if (itemIcon) {
                        itemIcon.textContent = '▶';
                    }
                }
            });

            // Toggle current item
            if (isActive) {
                accordionItem.classList.remove('active');
                if (content) {
                    content.style.display = 'none';
                }
                if (icon) {
                    icon.textContent = '▶';
                }
            } else {
                accordionItem.classList.add('active');
                if (content) {
                    content.style.display = 'block';
                }
                if (icon) {
                    icon.textContent = '▼';
                }
            }
        });
    });

    // Initialize accordion state
    document.querySelectorAll('.uiverse-accordion-item').forEach(item => {
        const content = item.querySelector('.uiverse-accordion-content');
        const icon = item.querySelector('.uiverse-accordion-icon');
        if (content && content.style.display === 'block') {
            item.classList.add('active');
            if (icon) {
                icon.textContent = '▼';
            }
        } else {
            if (icon) {
                icon.textContent = '▶';
            }
        }
    });
}

// Toggle Switches Functionality
function initSwitches() {
    const switches = document.querySelectorAll('.uiverse-switch');

    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            // You can add custom logic here based on switch state
            const label = this.closest('.uiverse-switch-label');
            const labelText = label.querySelector('span:first-child').textContent;
            
            // Optional: Add visual feedback or logging
            console.log(`${labelText}: ${this.checked ? 'ON' : 'OFF'}`);
        });
    });
}

// Tooltip Functionality (enhanced)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        // Add mouseenter/mouseleave for better control
        element.addEventListener('mouseenter', function() {
            // Tooltip is handled via CSS, but we can add additional functionality here
        });

        element.addEventListener('mouseleave', function() {
            // Additional cleanup if needed
        });
    });
}

// Interactive Buttons with Feedback
function initButtons() {
    // Dashboard action buttons
    const dashboardButtons = document.querySelectorAll('.dashboard-icon-btn');
    dashboardButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Optional: Show action feedback
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                console.log(`Clicked: ${tooltip}`);
            }
        });
    });

    // Pricing card buttons
    const pricingButtons = document.querySelectorAll('.pricing-card button');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('.uiverse-h3').textContent;
            
            // Add click feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Optional: Show modal or redirect
            console.log(`Selected plan: ${planName}`);
        });
    });

    // Component demo buttons
    const componentButtons = document.querySelectorAll('.uiverse-buttons-demo button');
    componentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    // Enable smooth scrolling only when clicking links
    document.documentElement.classList.add('smooth-scroll');
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.uiverse-nav').offsetHeight;
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

// Interactive Table Rows
function initTableInteractivity() {
    const tableRows = document.querySelectorAll('.uiverse-table tbody tr');
    tableRows.forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', function() {
            // Remove selection from all rows
            tableRows.forEach(r => r.classList.remove('selected'));
            // Add selection to clicked row
            this.classList.add('selected');
            
            // Optional: Show details or perform action
            const projectName = this.querySelector('td:first-child').textContent;
            console.log(`Selected project: ${projectName}`);
        });
    });
}

// Interactive Project Items
function initProjectItems() {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const projectName = this.querySelector('.project-name').textContent;
            console.log(`Clicked project: ${projectName}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Badge Click Interactions
function initBadges() {
    const badges = document.querySelectorAll('.uiverse-badge');
    badges.forEach(badge => {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            const badgeText = this.textContent;
            console.log(`Clicked badge: ${badgeText}`);
            
            // Add pulse animation
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

// Testimonial Card Interactions
function initTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.style.transition = 'transform 0.2s, box-shadow 0.2s';
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Pricing Card Interactions
function initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.style.transition = 'transform 0.2s';
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-8px)';
            }
        });
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = '';
            }
        });
    });
}

// Add ripple animation to CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    .uiverse-table tbody tr.selected {
        background: #eef2ff !important;
        border-left: 3px solid #6366f1;
    }
`;
document.head.appendChild(style);


