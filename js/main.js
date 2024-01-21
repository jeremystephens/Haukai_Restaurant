document.addEventListener("DOMContentLoaded", function() {
    // Initialize and configure navigation menu interactions
    const navLinks = document.getElementById("navLinks");
    const showMenuButton = document.querySelector('.fa-bars');
    const hideMenuButton = document.querySelector('.fa-xmark');

    // Event listener to open the navigation menu
    showMenuButton.addEventListener('click', function() {
        navLinks.style.right = "0";
    });

    // Event listener to close the navigation menu
    hideMenuButton.addEventListener('click', function() {
        navLinks.style.right = "-200px";
    });

    const form = document.forms['submit-to-google-sheet'];
    if (form) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwuVSjq3ATHs7DzkImrphE3DvB2tgkCHpE2Tx4rlbe6Kv1I2Kdhv_3WPXusnOGxsvB-/exec';
        const msg = document.getElementById('msg'); // Element to display messages

        form.addEventListener('submit', e => {
            e.preventDefault();
            msg.innerHTML = "Submitting..."; // Show loading message

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                if (response.ok) {
                    msg.innerHTML = "tēnā rawa atu koe (thank you very much)"; // Success message
                    setTimeout(() => { msg.innerHTML = ''; }, 5000); // Clear message after 5 seconds
                    form.reset(); // Reset the form fields
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                msg.innerHTML = "Error: Submission failed."; // Error message
                setTimeout(() => { msg.innerHTML = ''; }, 5000); // Clear message after 5 seconds
            });
        });
    }
});