import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Wireframe } from "three/examples/jsm/Addons.js";

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

camera.position.z = 5;
const AmbientLight = new THREE.AmbientLight(0xffffff);

AmbientLight.position.set(50, 50, 50);

scene.add(AmbientLight);

const gridHelper = new THREE.GridHelper(200, 500);
scene.add(gridHelper);

let mat = (clr: string) => new THREE.MeshStandardMaterial({ color: clr });

let cubelet = new THREE.Mesh(new THREE.BoxGeometry(), [
  mat("blue"),
  mat("green"),
  mat("white"),
  mat("yellow"),
  mat("red"),
  mat("orange"),
]);

for (let x = -1; x <= 1; x++)
  for (let y = -1; y <= 1; y++)
    for (let z = -1; z <= 1; z++) {
      let c = cubelet.clone();
      scene.add(c);
      c.position.set(x, y, z).multiplyScalar(1.1);
    }

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  controls.update;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
