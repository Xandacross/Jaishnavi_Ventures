// Hamburger Menu Toggle Function
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
        // When closing the mobile menu, also close any open dropdowns
        const dropdown = document.querySelector('.dropdown');
        if (dropdown && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
        }
    }
}

// Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropdown .dropbtn');
    const topnav = document.getElementById("myTopnav");

    // Exit if elements are not found
    if (!dropdown || !dropbtn) return;

    // *** IMPORTANT: Ensure NO mouseenter/mouseleave listeners directly manipulate 'style.display' ***
    //    These lines are the primary cause of conflict and must be REMOVED from your file:
    // dropdown.addEventListener('mouseenter', function() {
    //     if (!topnav.classList.contains('responsive')) {
    //         dropdownContent.style.display = 'block';
    //     }
    // });
    // dropdown.addEventListener('mouseleave', function() {
    //     if (!topnav.classList.contains('responsive')) {
    //         dropdownContent.style.display = 'none';
    //     }
    // });

    // Mobile: Toggle 'active' class on dropdown when dropbtn is clicked
    dropbtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior if the button is a link
        e.stopPropagation(); // Stop event from bubbling up to document click listener

        // Only toggle dropdown if the topnav is in responsive (mobile) mode
        if (topnav.classList.contains('responsive')) {
            dropdown.classList.toggle('active'); // This is the core line for mobile click!
        }
        // On desktop, the CSS :hover will handle showing/hiding the dropdown.
    });

    // Close dropdown when clicking outside (applies to both mobile and desktop if active class is set)
    document.addEventListener('click', function(e) {
        // If the click is outside the dropdown element, close it
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active'); // Remove 'active' class to hide dropdown
        }
    });

    // Reset dropdown and mobile menu when switching between mobile/desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) { // Assuming 768px is your breakpoint for desktop
            // Ensure desktop hover styles take over and close any active mobile dropdowns
            dropdown.classList.remove('active'); // Remove active class on resize to desktop

            // Also ensure topnav is not in responsive mode
            topnav.className = 'topnav';
        }
    });
});

// Form Validation and Submission (no changes needed here)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        if (validateForm()) {
            // Show success message
            showMessage('Thank you! Your message has been sent successfully.', 'success');

            // Reset form
            form.reset();
        }
    });

    // Form validation function
    function validateForm() {
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else {
            showSuccess(nameInput);
        }

        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (phoneInput.value.trim() === '') {
            showError(phoneInput, 'Please enter your contact number');
            isValid = false;
        } else if (!phoneRegex.test(phoneInput.value.replace(/\s+/g, ''))) {
            showError(phoneInput, 'Please enter a valid contact number');
            isValid = false;
        } else {
            showSuccess(phoneInput);
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message should be at least 10 characters long');
            isValid = false;
        } else {
            showSuccess(messageInput);
        }

        return isValid;
    }

    // Show error message
    function showError(input, message) {
        input.style.borderColor = '#e74c3c';

        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '-15px';
        errorDiv.style.marginBottom = '15px';
        errorDiv.textContent = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }

    // Show success state
    function showSuccess(input) {
        input.style.borderColor = '#27ae60';

        // Remove error message if exists
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // Show general message
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.style.padding = '15px';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.marginBottom = '20px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontWeight = '600';

        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else {
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }

        messageDiv.textContent = message;
        form.insertBefore(messageDiv, form.firstChild);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            showSuccess(this);
        }
    });

    phoneInput.addEventListener('blur', function() {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (this.value.trim() !== '' && phoneRegex.test(this.value.replace(/\s+/g, ''))) {
            showSuccess(this);
        }
    });

    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() !== '' && emailRegex.test(this.value)) {
            showSuccess(this);
        }
    });

    messageInput.addEventListener('blur', function() {
        if (this.value.trim().length >= 10) {
            showSuccess(this);
        }
    });
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.topnav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Close mobile menu if open
                const topnav = document.getElementById("myTopnav");
                if (topnav.className.includes("responsive")) {
                    topnav.className = "topnav";
                }
                // Also close dropdown if it was open
                const dropdown = document.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
            }
        });
    });
});

// Close mobile menu AND dropdown when clicking outside
document.addEventListener('click', function(e) {
    const topnav = document.getElementById("myTopnav");
    const dropdown = document.querySelector('.dropdown');

    const isClickInsideNav = topnav.contains(e.target);
    const isClickInsideDropdown = dropdown ? dropdown.contains(e.target) : false;

    // If mobile menu is open AND the click is outside the nav and not inside the dropdown
    if (!isClickInsideNav && topnav.classList.contains("responsive")) {
        topnav.className = "topnav"; // Close mobile menu
        if (dropdown) {
            dropdown.classList.remove('active'); // Close dropdown if open
        }
    }
    // If desktop mode and dropdown is open and click is outside the dropdown itself
    else if (!topnav.classList.contains("responsive") && dropdown && dropdown.classList.contains('active') && !isClickInsideDropdown) {
        dropdown.classList.remove('active'); // Close dropdown
    }
});