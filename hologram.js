// 1. Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Create the 3D shape (a tetrahedron for a pyramid/hologram look)
const geometry = new THREE.TetrahedronGeometry(2, 0); // Radius 2

// 3. Create the material (what the shape looks like)
// We'll use a wireframe material to give it a cool, digital, hologram feel
const material = new THREE.MeshBasicMaterial({
    color: 0x00ffdd, // A nice cyan/teal color
    wireframe: true
});

// 4. Create the mesh (the shape + its material) and add it to the scene
const hologram = new THREE.Mesh(geometry, material);
scene.add(hologram);

// 5. Position the camera so we can see the shape
camera.position.z = 5;

// 6. Create the animation loop
function animate() {
    requestAnimationFrame(animate); // This creates a smooth loop

    // Rotate the hologram on the X and Y axes
    hologram.rotation.x += 0.01;
    hologram.rotation.y += 0.01;

    // Render the scene from the camera's point of view
    renderer.render(scene, camera);
}

// 7. Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Read the URL from the query parameter and display it
const urlParams = new URLSearchParams(window.location.search);
const targetUrl = urlParams.get('url');
const urlDisplay = document.getElementById('urlDisplay');

if (targetUrl) {
    urlDisplay.textContent = `URL: ${decodeURIComponent(targetUrl)}`;
}

// Start the animation!
animate();