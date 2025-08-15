import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Wireframe } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("cubeCanvas") as HTMLCanvasElement,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;
camera.position.y = 10;
camera.position.x = 12;
const AmbientLight = new THREE.AmbientLight(0xffffff);

AmbientLight.position.set(50, 50, 50);

scene.add(AmbientLight);
const loader = new GLTFLoader().setPath("/models/");

loader.load("rubik3x3.glb", (gltf) => {
  const cube = gltf.scene;
  cube.position.set(0, 0, 0);
  cube.traverse(e=>console.log(e.name));
  // var cube1 = cube.getObjectByName("Cube001");
  // cube1.position.set(5, 0, 0);

  scene.add(cube);
});

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  controls.update;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
