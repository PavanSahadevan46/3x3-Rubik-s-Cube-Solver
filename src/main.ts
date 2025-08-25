import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Wireframe } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

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

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
let cube;

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(cube, true);
  if (intersects.length > 0) {
    const clicked = intersects[0].object;
    console.log("clicked: ", clicked.name);
    // clicked.position.set(3,0,0)
    let name = clicked.name;
    var toMove = cube.getObjectByName(name);
    toMove.parent.position.set(5, 0, 0);
  }
}

loader.load("rubik3x3.glb", (gltf) => {
  cube = gltf.scene;
  cube.position.set(0, 0, 0);
  scene.add(cube);

  cube.traverse((obj) => {
    if (obj.isMesh) {
      // console.log(obj.name + obj.position.toArray());
    }
  });
  window.addEventListener("click", onMouseClick, false);
});

// function onMouseMove(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  controls.update;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
