import * as THREE from "three";

// setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

scene.background = 0x000000;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// geom
const torus1 = new THREE.TorusGeometry(10, 1.5, 6, 50);
const torus2 = new THREE.TorusGeometry(20, 1.5, 6, 50);
const torus3 = new THREE.TorusGeometry(30, 1.5, 6, 50);
const torus4 = new THREE.TorusGeometry(40, 1.5, 6, 50);
const torus5 = new THREE.TorusGeometry(50, 1.5, 6, 50);
const torus6 = new THREE.TorusGeometry(60, 1.5, 6, 50);
const material = new THREE.MeshStandardMaterial({
  color: 0xd388e2,
  wireframe: true,
});
const ring1 = new THREE.Mesh(torus1, material);
const ring2 = new THREE.Mesh(torus2, material);
const ring3 = new THREE.Mesh(torus3, material);
const ring4 = new THREE.Mesh(torus4, material);
const ring5 = new THREE.Mesh(torus5, material);
const ring6 = new THREE.Mesh(torus6, material);
scene.add(ring1);
scene.add(ring2);
scene.add(ring3);
scene.add(ring4);
scene.add(ring5);
scene.add(ring6);
// stars

function addSStar() {
  const sSmall = new THREE.SphereGeometry(0.25, 12, 12);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(sSmall, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function addMStar() {
  const sMed = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xd388e2 });
  const star = new THREE.Mesh(sMed, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function addLStar() {
  const sLarge = new THREE.SphereGeometry(0.25, 48, 48);
  const material = new THREE.MeshStandardMaterial({ color: 0x063970 });
  const star = new THREE.Mesh(sLarge, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addSStar);
Array(100).fill().forEach(addMStar);
Array(40).fill().forEach(addLStar);

// avatar

const avatarTexture = new THREE.TextureLoader().load("resources/favicon.svg");

const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
);

scene.add(avatar);

avatar.position.z = -5;
avatar.position.x = 2;

//lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

camera.position.setZ(5);
camera.position.setY(0);
camera.position.setX(-3);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;

  camera.position.z = t * -0.02;
  camera.position.x = t * -0.0004;
  camera.rotation.y = t * -0.00002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  ring1.rotation.x += 0.01;
  ring1.rotation.y += 0.005;
  ring1.rotation.z += 0.01;

  ring2.rotation.x += 0.02;
  ring2.rotation.y += 0.006;
  ring2.rotation.z += 0.02;

  ring3.rotation.x += 0.03;
  ring3.rotation.y += 0.008;
  ring3.rotation.z += 0.002;

  ring4.rotation.x += 0.01;
  ring4.rotation.y += 0.0009;
  ring4.rotation.z += 0.005;

  ring5.rotation.x += 0.005;
  ring5.rotation.y += 0.005;
  ring5.rotation.z += 0.0015;

  ring6.rotation.x += 0.006;
  ring6.rotation.y += 0.003;
  ring6.rotation.z += 0.001;

  renderer.render(scene, camera);
}

animate();
