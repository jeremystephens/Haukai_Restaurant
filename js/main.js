// Initializes the Google Map
function initMap() {
    var location = { lat: -35.21799936266406, lng: 173.96239149713313 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: location,
        disableDefaultUI: true,
        // Map style settings
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#686868"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "-22"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "saturation": "11"
                    },
                    {
                        "lightness": "-51"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "saturation": "3"
                    },
                    {
                        "lightness": "-56"
                    },
                    {
                        "weight": "2.20"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": "-52"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "weight": "6.13"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "lightness": "-10"
                    },
                    {
                        "gamma": "0.94"
                    },
                    {
                        "weight": "1.24"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": "-16"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "-41"
                    },
                    {
                        "lightness": "-41"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "weight": "5.46"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "0.72"
                    },
                    {
                        "lightness": "-16"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": "-37"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#b7e4f4"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    });

    // Placing a marker on the map
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

// Listener for DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function() {
    // Dynamic behavior for the header on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener("scroll", function() {
        let currentScroll = window.scrollY || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop) {
            header.style.top = "-100px";
        } else {
            header.style.top = "0";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Handling navigation menu interactions
    const navLinks = document.getElementById("navLinks");
    const showMenuButton = document.querySelector('.fa-bars');
    const hideMenuButton = document.querySelector('.fa-xmark');

    showMenuButton.addEventListener('click', function() {
        navLinks.style.right = "0";
    });

    hideMenuButton.addEventListener('click', function() {
        navLinks.style.right = "-200px";
    });

    // Handling Google Sheets form submission
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

    // Carousel functionality for the image gallery
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-image');
    const totalImages = images.length;

    function showImage(index) {
        images.forEach(image => image.style.display = 'none');
        images[index].style.display = 'block';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextImage);
        prevButton.addEventListener('click', prevImage);
    }

    // Initialize carousel with the first image
    showImage(currentIndex);
    
});
