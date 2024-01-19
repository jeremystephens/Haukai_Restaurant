document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.getElementById("navLinks");

    const showMenuButton = document.querySelector('.fa-bars');
    const hideMenuButton = document.querySelector('.fa-xmark');

    showMenuButton.addEventListener('click', function() {
        navLinks.style.right = "0";
    });

    hideMenuButton.addEventListener('click', function() {
        navLinks.style.right = "-200px";
    });
});
