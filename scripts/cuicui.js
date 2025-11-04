// CuiCui Interactive Components Script

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

function initTabs() {
    const tabButtons = document.querySelectorAll('.cuicui-tab[data-tab]');
    const tabPanels = document.querySelectorAll('.tab-panel[data-panel]');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const tabContainer = this.closest('.cuicui-card');
            
            tabContainer.querySelectorAll('.cuicui-tab').forEach(tab => {
                tab.classList.remove('cuicui-tab-active');
            });
            
            this.classList.add('cuicui-tab-active');
            
            tabContainer.querySelectorAll('.tab-panel').forEach(panel => {
                panel.style.display = 'none';
                panel.classList.remove('active');
            });
            
            const targetPanel = tabContainer.querySelector(`.tab-panel[data-panel="${targetTab}"]`);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                targetPanel.classList.add('active');
            }
        });
    });
}

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.cuicui-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.cuicui-accordion-item');
            const content = accordionItem.querySelector('.cuicui-accordion-content');
            const icon = this.querySelector('.cuicui-accordion-icon');
            const isActive = accordionItem.classList.contains('active');

            const accordion = accordionItem.closest('.cuicui-accordion');
            accordion.querySelectorAll('.cuicui-accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    const itemContent = item.querySelector('.cuicui-accordion-content');
                    const itemIcon = item.querySelector('.cuicui-accordion-icon');
                    if (itemContent) {
                        itemContent.style.display = 'none';
                    }
                    if (itemIcon) {
                        itemIcon.textContent = '▶';
                    }
                }
            });

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

    document.querySelectorAll('.cuicui-accordion-item').forEach(item => {
        const content = item.querySelector('.cuicui-accordion-content');
        const icon = item.querySelector('.cuicui-accordion-icon');
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

function initSwitches() {
    const switches = document.querySelectorAll('.cuicui-switch');
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const label = this.closest('.cuicui-switch-label');
            const labelText = label.querySelector('span:first-child').textContent;
            console.log(`${labelText}: ${this.checked ? 'ON' : 'OFF'}`);
        });
    });
}

function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {});
        element.addEventListener('mouseleave', function() {});
    });
}

function initButtons() {
    const dashboardButtons = document.querySelectorAll('.dashboard-icon-btn');
    dashboardButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                console.log(`Clicked: ${tooltip}`);
            }
        });
    });

    const pricingButtons = document.querySelectorAll('.pricing-card button');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('.cuicui-h3').textContent;
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            console.log(`Selected plan: ${planName}`);
        });
    });
}

function initSmoothScroll() {
    document.documentElement.classList.add('smooth-scroll');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.cuicui-nav').offsetHeight;
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

function initTableInteractivity() {
    const tableRows = document.querySelectorAll('.cuicui-table tbody tr');
    tableRows.forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', function() {
            tableRows.forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');
            const projectName = this.querySelector('td:first-child').textContent;
            console.log(`Selected project: ${projectName}`);
        });
    });
}

function initProjectItems() {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const projectName = this.querySelector('.project-name').textContent;
            console.log(`Clicked project: ${projectName}`);
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function initBadges() {
    const badges = document.querySelectorAll('.cuicui-badge');
    badges.forEach(badge => {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            const badgeText = this.textContent;
            console.log(`Clicked badge: ${badgeText}`);
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

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

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    .cuicui-table tbody tr.selected {
        background: #ecfdf5 !important;
        border-left: 3px solid #059669;
    }
`;
document.head.appendChild(style);
