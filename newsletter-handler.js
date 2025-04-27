// Newsletter subscription with email confirmation using EmailJS
function initNewsletterSubscription() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterConfirmation = document.getElementById('newsletterConfirmation');
    const unsubscribeLink = document.getElementById('unsubscribeLink');
    
    // Initialize EmailJS with your User ID (replace with your actual user ID)
    emailjs.init("service_g11jybn");
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newsletterEmail.value)) {
                newsletterConfirmation.textContent = 'Please enter a valid email address.';
                newsletterConfirmation.className = 'newsletter-confirmation error';
                return;
            }
            
            // Show loading state
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = "SENDING...";
            submitButton.disabled = true;
            
            // Store subscription in local storage
            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
            
            // Check if already subscribed
            if (subscribers.includes(newsletterEmail.value)) {
                newsletterConfirmation.textContent = 'You are already subscribed to our newsletter.';
                newsletterConfirmation.className = 'newsletter-confirmation error';
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                return;
            }
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                subscriber_email: newsletterEmail.value,
                website_name: "The Inspirational Boat",
                unsubscribe_link: window.location.origin + "/unsubscribe.html?email=" + encodeURIComponent(newsletterEmail.value)
            };
            
            // Send confirmation email using EmailJS
            emailjs.send(
                'service_g11jybn',  // Replace with your EmailJS service ID
                'template_2bwgorp', // Replace with your EmailJS template ID
                templateParams
            ).then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Add to subscribers
                subscribers.push(newsletterEmail.value);
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                
                // Show success message
                newsletterConfirmation.textContent = 'Thank you for subscribing to our cosmic newsletter! A confirmation has been sent to your email.';
                newsletterConfirmation.className = 'newsletter-confirmation success';
                
                // Reset form
                newsletterForm.reset();
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
            }).catch(function(error) {
                console.log('FAILED...', error);
                
                newsletterConfirmation.textContent = 'There was an error sending the confirmation email. Please try again later.';
                newsletterConfirmation.className = 'newsletter-confirmation error';
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
    
    if (unsubscribeLink) {
        unsubscribeLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple prompt for demo purposes - would be a dedicated page in production
            const emailToUnsubscribe = prompt('Enter your email to unsubscribe:');
            
            if (emailToUnsubscribe) {
                const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
                const updatedSubscribers = subscribers.filter(email => email !== emailToUnsubscribe);
                
                if (subscribers.length !== updatedSubscribers.length) {
                    // Send unsubscribe confirmation email
                    const templateParams = {
                        subscriber_email: emailToUnsubscribe,
                        website_name: "The Inspirational Boat"
                    };
                    
                    emailjs.send(
                        'service_g11jybn',  // Replace with your EmailJS service ID
                        'YOUR_UNSUBSCRIBE_TEMPLATE_ID', // Create a separate template for unsubscribe confirmations
                        templateParams
                    ).then(function() {
                        localStorage.setItem('newsletterSubscribers', JSON.stringify(updatedSubscribers));
                        alert('You have been successfully unsubscribed from our newsletter. A confirmation email has been sent.');
                    }).catch(function(error) {
                        console.log('FAILED...', error);
                        alert('You have been unsubscribed, but there was an error sending the confirmation email.');
                        localStorage.setItem('newsletterSubscribers', JSON.stringify(updatedSubscribers));
                    });
                } else {
                    alert('Email not found in our subscriber list.');
                }
            }
        });
    }
}