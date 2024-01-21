// Function to initialize the Google Map
function initMap() {
    var location = { lat: -34.397, lng: 150.644 }; // Replace with your actual location coordinates
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Dynamic header behavior
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener("scroll", function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop) {
            header.style.top = "-100px";
        } else {
            header.style.top = "0";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Navigation menu interactions
    const navLinks = document.getElementById("navLinks");
    const showMenuButton = document.querySelector('.fa-bars');
    const hideMenuButton = document.querySelector('.fa-xmark');

    showMenuButton.addEventListener('click', function() {
        navLinks.style.right = "0";
    });

    hideMenuButton.addEventListener('click', function() {
        navLinks.style.right = "-200px";
    });

    // Google Sheets form submission
    const form = document.forms['submit-to-google-sheet'];
    if (form) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwuVSjq3ATHs7DzkImrphE3DvB2tgkCHpE2Tx4rlbe6Kv1I2Kdhv_3WPXusnOGxsvB-/exec';
        const msg = document.getElementById('msg');

        form.addEventListener('submit', e => {
            e.preventDefault();
            msg.innerHTML = "Submitting...";

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                if (response.ok) {
                    msg.innerHTML = "tēnā rawa atu koe (thank you very much)";
                    setTimeout(() => { msg.innerHTML = ''; }, 5000);
                    form.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                msg.innerHTML = "Error: Submission failed.";
                setTimeout(() => { msg.innerHTML = ''; }, 5000);
            });
        });
    }
});