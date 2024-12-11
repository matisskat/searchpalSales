document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('submitToolModal');
    const submitButtons = document.querySelectorAll('.submit-tool, .cta-button');
    const closeBtn = document.querySelector('.close');
    const toolSubmissionForm = document.getElementById('toolSubmissionForm');

    // Open modal when clicking submit buttons
    submitButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    // Close modal when clicking (X)
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    toolSubmissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            toolName: document.getElementById('toolName').value,
            toolLink: document.getElementById('toolLink').value,
            description: document.getElementById('description').value,
            email: document.getElementById('email').value
        };

        // Here you would typically send this data to your backend
        console.log('Form submitted:', formData);

        // Show success message
        modal.style.display = 'none';
        alert('Your tool listing is being generated! Check your email to verify your account and access your dashboard.');

        // Reset form
        toolSubmissionForm.reset();
    });
}); 