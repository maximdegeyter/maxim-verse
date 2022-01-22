import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(75);

const pointLight = new THREE.PointLight(0xffff00);
pointLight.position.set(0,0,0);

//lights up sky
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//shows where point light is
const lightHelper = new THREE.PointLightHelper(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);

const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(600).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('./assets/background.jpg');
scene.background = spaceTexture;

const sunTexture = new THREE.TextureLoader().load('./assets/sunTexture.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(16, 30, 30),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);

scene.add(sun);

let planet0;
let planet1;
let planet2;
let planet3;
let planet4;

const planets = [planet0,planet1,planet2,planet3,planet4];

for(let i=0; i<5; i++) {
  const texture = new THREE.TextureLoader().load(`./assets/texture${i}.jpg`);
  planets[i] = new THREE.Mesh( 
    new THREE.SphereGeometry((Math.random() * 5) + 1.5, 20, 20),
    new THREE.MeshStandardMaterial({
      map: texture
    }) 
  );
  planets[i].position.set((i*20) + 25, 0, 0);
  scene.add(planets[i]);
}

const animateScene = () => {
  requestAnimationFrame( animateScene );

  sun.rotation.y += 0.003;
  for(let i=0; i<5; i++) {
    planets[i].rotation.y += 0.002
  }

  controls.update();
  renderer.render(scene, camera);
}

animateScene();

