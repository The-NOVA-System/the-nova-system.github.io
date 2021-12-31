import "./style.css";
import * as THREE from "three";
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup
let contact = 0;
let home = 0;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Window Resize
window.addEventListener('resize', reportWindowSize);
function reportWindowSize() {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width  = canvas.clientWidth  * pixelRatio | 0;
  const height = canvas.clientHeight * pixelRatio | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Transition Function
function doTransition(homePage, contactPage, back) {
  let times = 0;
  let times2 = 0;
  window.scrollBy(0, -10000);
  homePage.addEventListener("animationend", () => {
    if (times === 0) {
      homePage.classList.remove('fade-out');
      if (back === false) {
        contactPage.style.cssText = 'padding-top: 125px;';
      } else {
        contactPage.style.cssText = 'padding-top: 250px;';
      }
      contactPage.classList.add('fade-in');

      if (back === false) {
        homePage.style.cssText = "padding-top: 250px; display: none;"
      } else {
        homePage.style.cssText = "padding-top: 125px; display: none;"
      }

      contactPage.addEventListener("animationend", () => {
        if (times2 === 0) {
          contactPage.classList.remove('fade-in');
          times2 += 1;
        }
      }, true);

      document.getElementById('body').appendChild(contactPage);
      times += 1;
    }

  }, true);

  homePage.classList.add('fade-out');
}

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("https://the-nova-system.github.io/extra-assets/space.webp");
scene.background = spaceTexture;

// Avatar

const logoTexture = new THREE.TextureLoader().load("https://the-nova-system.github.io/extra-assets/logo.webp");

const logo = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: logoTexture })
);

logo.rotation.x += 20;
logo.rotation.y -= 20;
logo.rotation.z += 20;

scene.add(logo);

// Moon

const moonTexture = new THREE.TextureLoader().load("https://the-nova-system.github.io/extra-assets/moon.webp");
const normalTexture = new THREE.TextureLoader().load("https://the-nova-system.github.io/extra-assets/normal.webp");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

logo.position.z = -5;
logo.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  logo.rotation.y += 0.01;
  logo.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Page Load Function
window.onload = function() {
  if (location.hash === '#contact') {
    contactForm();
  }

  const a = document.getElementById("contact-form");
  const b = document.getElementById("home");
  const c = document.getElementById("home-named");

  a.onclick = function() {
    if (location.hash !== '#contact') {
      contactForm();
    }
    location.hash = "#contact";
    return false;
  }

  b.onclick = function() {
    if (location.hash !== '#home') {
      animateHome();
    }
    location.hash = "#home";
    return false;
  }

  c.onclick = function() {
    if (location.hash !== '#home') {
      animateHome();
    }
    location.hash = "#home";
    return false;
  }
}

// Animate to Contact Form

function contactForm() {
  if (contact === -1) {
    contact = 0;
  } else {
    requestAnimationFrame(contactForm);

    if (contact === 0) {
      doTransition(document.getElementById('home-page'), document.getElementById('contact-page'), false);

      let position = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
      let target = {x: 20, y: 25, z: -15};
      const tween = new TWEEN.Tween(position).to(target, 2000);
      tween.easing(TWEEN.Easing.Quadratic.InOut)
      tween.onUpdate(function () {
        camera.position.x = position.x;
        camera.position.y = position.y;
        camera.position.z = position.z;
      });


      let startRotation = new THREE.Euler().copy(camera.rotation);
      camera.lookAt(new THREE.Vector3(target.x, target.y, target.z));
      let endRotation = new THREE.Euler().copy(camera.rotation);
      camera.rotation.copy(startRotation);
      const rotationTween = new TWEEN.Tween(startRotation).to({
        x: endRotation.x,
        y: endRotation.y,
        z: endRotation.z
      }, 2000);
      rotationTween.easing(TWEEN.Easing.Quadratic.InOut);
      rotationTween.onUpdate(function () {
        camera.rotation.x = startRotation.x;
        camera.rotation.y = startRotation.y;
        camera.rotation.z = startRotation.z;
      });

      tween.onComplete(function () {
        contact = -1;
      });

      tween.start();
      rotationTween.start();
    }

    contact += 1;
    TWEEN.update();

    renderer.render(scene, camera);
  }
}

// Animate to Home
function animateHome() {
  if (home === -1) {
    home = 0;
  } else {
    requestAnimationFrame(animateHome);

    if (home === 0) {
      doTransition(document.getElementById('contact-page'), document.getElementById('home-page'), true);

      let position = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
      let target = {x: 0, y: 0, z: 0};
      const tween = new TWEEN.Tween(position).to(target, 2000);
      tween.easing(TWEEN.Easing.Quadratic.InOut)
      tween.onUpdate(function () {
        camera.position.x = position.x;
        camera.position.y = position.y;
        camera.position.z = position.z;
      });


      let startRotation = new THREE.Euler().copy(camera.rotation);
      let endRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      const rotationTween = new TWEEN.Tween(startRotation).to({
        x: endRotation.x,
        y: endRotation.y,
        z: endRotation.z
      }, 2000);
      rotationTween.easing(TWEEN.Easing.Quadratic.InOut);
      rotationTween.onUpdate(function () {
        camera.rotation.x = startRotation.x;
        camera.rotation.y = startRotation.y;
        camera.rotation.z = startRotation.z;
      });

      tween.onComplete(function () {
        home = -1;
      });

      tween.start();
      rotationTween.start();
    }

    home += 1;
    TWEEN.update();

    renderer.render(scene, camera);
  }
}

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  // controls.update();

  renderer.render(scene, camera);
}

animate();
