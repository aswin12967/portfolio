// Inicjalizacja sceny, kamery i renderera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Ustawienia renderera
renderer.setSize(window.innerWidth, window.innerHeight);  
document.body.appendChild(renderer.domElement);

// Tworzenie geometrii gwiazd
const starGeometry = new THREE.BufferGeometry();
const starCount = 10000;
const starPositions = new Float32Array(starCount * 3);

// Losowe pozycje gwiazd
for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 2000; // rozstawienie gwiazd
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

// Materiał gwiazd
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5, // rozmiar gwiazd
    transparent: true
});

// Tworzenie punktów gwiazd
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Ustawienie pozycji kamery
camera.position.z = 800;

// Animacja
function animateStars() {
    requestAnimationFrame(animateStars);

    // Ruch gwiazd
    stars.rotation.y += 0.0005; // obracanie gwiazd w lewo/prawo
    stars.rotation.x += 0.0002; // lekkie przesunięcie w dół

    // Aktualizacja pozycji gwiazd (dla ruchu w stronę użytkownika)
    const positions = stars.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.05; // ruch gwiazd w dół

        // Jeśli gwiazda wychodzi poza ekran, resetuj jej pozycję
        if (positions[i + 1] < -1000) {
            positions[i + 1] = 1000;
        }
    }
    stars.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Dopasowanie do zmiany rozmiaru okna
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animateStars();

window.addEventListener('DOMContentLoaded', function () {
    // Get the current page path
    const currentPath = window.location.pathname;

    // Log the current path for debugging
    console.log('Current path:', currentPath);

    // Identify the nav items
    const navItems = document.querySelectorAll('.navbar .square');

    // Loop through nav items and add the 'active' class to the correct one
    navItems.forEach(function (item) {
        // Get the data-href attribute of each item
        const itemHref = item.getAttribute('data-href');

        // Compare the current path with the item's data-href
        if (currentPath.includes(itemHref)) {
            item.classList.add('active');  // Add the 'active' class if paths match
        } else {
            item.classList.remove('active');  // Remove the 'active' class otherwise
        }
    });
});


document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    // Validate the inputs
    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
    }

    const submitButton = this.querySelector('button');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Initialize EmailJS
    emailjs.init('NLF34XR2lgl9pDHpq'); // Replace with your EmailJS User ID

    // Send the form data
    emailjs
        .sendForm('service_8ognh17', 'template_1vt0p65', this)
        .then(
            function () {
                alert("Message sent successfully!");
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                document.getElementById("contact-form").reset(); // Clear the form
            },
            function (error) {
                alert("Failed to send message. Please try again later.");
                console.error("EmailJS Error:", error);
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }
        )
        .catch((err) => {
            alert("An unexpected error occurred.");
            console.error("Unexpected Error:", err);
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        });
});
