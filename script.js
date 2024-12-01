
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();


renderer.setSize(window.innerWidth, window.innerHeight);  
document.body.appendChild(renderer.domElement);


const starGeometry = new THREE.BufferGeometry();
const starCount = 10000;
const starPositions = new Float32Array(starCount * 3);


for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 2000;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));


const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5, // rozmiar gwiazd
    transparent: true
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);


camera.position.z = 800;


function animateStars() {
    requestAnimationFrame(animateStars);

    stars.rotation.y += 0.0005; 
    stars.rotation.x += 0.0002; 

   
    const positions = stars.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.05; 

      
        if (positions[i + 1] < -1000) {
            positions[i + 1] = 1000;
        }
    }
    stars.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animateStars();

window.addEventListener('DOMContentLoaded', function () {
   
    const currentPath = window.location.pathname;


    console.log('Current path:', currentPath);

    const navItems = document.querySelectorAll('.navbar .square');

    navItems.forEach(function (item) {
        
        const itemHref = item.getAttribute('data-href');

        
        if (currentPath.includes(itemHref)) {
            item.classList.add('active');  
        } else {
            item.classList.remove('active'); 
        }
    });
});


document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

   
    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
    }

    const submitButton = this.querySelector('button');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    emailjs.init('NLF34XR2lgl9pDHpq'); 

    emailjs
        .sendForm('service_8ognh17', 'template_1vt0p65', this)
        .then(
            function () {
                alert("Message sent successfully!");
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                document.getElementById("contact-form").reset(); 
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
