import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshPhongMaterial({color: 0xff0000})
);
cube1.position.set(3,0,0)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshPhongMaterial({color: 0x0000ff})
);
cube2.position.set(-3,0,0)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshPhongMaterial({color: 0x00ff00})
);
cube3.position.set(0,0,0)




camera.position.z = 5;

scene.add(cube1,cube2,cube3,);

const AmbientLight = new THREE.AmbientLight(0xffffff);

AmbientLight.position.set(50,50,50);

scene.add(AmbientLight);

// const gridHelper = new THREE.GridHelper(200, 500);
// // scene.add(gridHelper);


const cubeGroup =  new THREE.Group();

cubeGroup.add(cube1,cube2,cube3)



const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  controls.update;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
