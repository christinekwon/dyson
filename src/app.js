/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

// import { GUI } from 'lil-gui';
import * as THREE from 'three';
import { WebGLRenderer, PerspectiveCamera, Vector3, PMREMGenerator } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Scene } from 'scenes';
// import { RoomEnvironment } from 'objects';

// Initialize core ThreeJS components
const scene = new Scene();
const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new WebGLRenderer({ antialias: true });

// const pmremGenerator = new PMREMGenerator(renderer);
// scene.environment = pmremGenerator.fromScene(new RoomEnvironment(scene), 0.04).texture;


// Set up camera
camera.position.set(0, 0, 300);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
// transform the final color value of each fragment to the sRGB color space
renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 0.85;

const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
// controls.minDistance = 4;
// controls.maxDistance = 16;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

const barrelColorInput = document.getElementById('barrel');
barrelColorInput.addEventListener('input', function() {
    scene.change_material_color(this.id, this.value);
});

const accentColorInput = document.getElementById('accent');
accentColorInput.addEventListener('input', function() {

    scene.change_material_color(this.id, this.value);

});

const handleColorInput = document.getElementById('handle');
handleColorInput.addEventListener('input', function() {

    scene.change_material_color(this.id, this.value);

});

const filterColorInput = document.getElementById('filter');
filterColorInput.addEventListener('input', function() {
    scene.change_material_color(this.id, this.value);

});