import "./style.css";
import * as THREE from "three";
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min'
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let pages = {
    blog: {name: 'blog-page', buttons: ['blog-button'], target: {x: -10, y: -30, z: 18}},
    contact: {name: 'contact-page', buttons: ['contact-button'], target: {x: 20, y: 25, z: -15}},
    team: {name: 'team-page', buttons: ['team-button'], target: {x: 10, y: 30, z: -18}},
    home: {
        name: 'home-page',
        buttons: ['home-button', 'home-named'],
        target: {x: 0, y: 0, z: 0},
        endRotation: new THREE.Euler(0, 0, 0, 'XYZ')
    },
}

let pageCounter = {};

// this script loads atom/rss feed to the "block-content" div

function makeBlogPost() {
    let postElem = document.createElement("div");
    let CSS_attribute = document.createAttribute("class");
    CSS_attribute.value = "clean-blog-post"
    postElem.setAttributeNode(CSS_attribute)
    return postElem;
}

//fetches the posts from the rss feed
function fetchPosts() {
    const request = new XMLHttpRequest();
    //const getUrl = window.location;
    //const baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    const ATOM_FEED_URL = "https://the-nova-system.github.io/blog/feed.xml";
    const ERROR_MSG = "Uh Oh: Cannot load posts at the moment :("
    request.open("GET", ATOM_FEED_URL, true);

    request.send();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            loadPosts(this.responseXML);
        } else if (this.readyState === 4) {
            let textbox = makeBlogPost();
            textbox.innerHTML = ERROR_MSG;
            document.querySelector("#page > main > section > div > div.block-content").appendChild(textbox)
        }
    };
}


function loadPosts(feedXml) {
    const listPosts = feedXml.getElementsByTagName("feed")[0].getElementsByTagName("entry");

    for (let i = 0; i < listPosts.length; i++) {
        let post = listPosts.item(i); //gets the post from the list

        //extracts the information needed from the post
        const link = post.getElementsByTagName("link")[0].attributes.getNamedItem("href").value;
        const excerpt = post.getElementsByTagName("summary")[0].textContent;
        const title = post.getElementsByTagName("title")[0].textContent;
        let published = post.getElementsByTagName("published")[0].textContent;
        published = published.substring(0, 10).replaceAll("-", "/") //cleans to YYYY-MM-DD
        const author = post.getElementsByTagName("author")[0].textContent;

        let postElem = makeBlogPost(); //creates an empty textbox from the function above

        //this code just creates the html for our textbox using the variables defined above, and then pushes it the inner HTML of the post element
        postElem.innerHTML = `
    <h3>${title}</h3>
    <div class=\"info\">
        <span style="color: #ffffff">By ${author} - ${published}</span>
    </div>
    <p>${excerpt}</p>
    <a class="btn btn-outline-primary btn-sm" role="button" href="${link}" style="color: #ffffff; border-color: #cad4e0;">
        Read More
    </a>
    <div style="padding-bottom: 60px"></div>
    `

        //finally, here we push the final post element into the block-content div
        document.querySelector("#blog-page > section > div > section > div > div.row.people.about").appendChild(postElem)
    }
}

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
    const width = canvas.clientWidth * pixelRatio | 0;
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
const material = new THREE.MeshStandardMaterial({color: 0xff6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function addGeometry() {
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({color: 0xff6347, wireframe: true});
    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(-10, -30, 18)

    scene.add(torus);
}

addGeometry();

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
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill(undefined, undefined, undefined)
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill(undefined, undefined, undefined).forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("https://the-nova-system.github.io/extra-assets/space.jpg");
scene.background = spaceTexture;

// Avatar

const logoTexture = new THREE.TextureLoader().load("https://the-nova-system.github.io/extra-assets/logo.png");

const logo = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({map: logoTexture})
);

logo.rotation.x += 20;
logo.rotation.y -= 20;
logo.rotation.z += 20;

scene.add(logo);

// Moon

const moonTexture = new THREE.TextureLoader().load("https://the-nova-system.github.io/extra-assets/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("https://the-nova-system.github.io/extra-assets/normal.jpg");

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
    })
);

scene.add(moon);

moon.position.z = 20;
moon.position.setX(-10);

logo.position.z = -5;
logo.position.x = 2;

// Scroll Animation

function getDocHeight() {
    const D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function onMouseWheel(ev) {
    ev.preventDefault();
    const top = document.body.getBoundingClientRect().top;

    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    logo.rotation.y += 0.01;
    logo.rotation.z += 0.01;

    if (top < 0 && $(window).scrollTop() + $(window).height() < getDocHeight()) {
        if (location.hash.split('#')[1] === 'blog') {
            camera.position.x += ev.deltaY / 500;
            camera.rotation.y += ev.deltaY / -2000;
            camera.position.z += ev.deltaY / -100;
        } else {
            camera.position.x += ev.deltaY / 500;
            camera.rotation.y += ev.deltaY / 2000;
            camera.position.z += ev.deltaY / 100;
        }
    }
}

window.addEventListener('wheel', onMouseWheel, false);

// Page Load Function
window.onload = function () {
    for (const key in pages) {
        if (pages.hasOwnProperty(key)) {
            if (location.hash === '#' + key && location.hash !== '#home') {
                animateToPage(pages['home']['name'], pages[key]['name'], pages[key]['target'], key);
            }

            const buttonElements = pages[key]['buttons'];

            for (let i = 0; i < buttonElements.length; i++) {
                const buttonElement = document.getElementById(buttonElements[i]);

                buttonElement.onclick = function () {
                    let initialPage;
                    if (location.hash === '') {
                        initialPage = pages['home']['name'];
                    } else {
                        initialPage = location.hash.substring(1) + '-page';
                    }
                    if (location.hash !== '#' + key) {
                        if (!(location.hash === '' && pages[key]['name'] === pages['home']['name'])) {
                            animateToPage(initialPage, pages[key]['name'], pages[key]['target'], key, pages[key]['endRotation']);
                        }
                    }
                    location.hash = '#' + key;
                    return false;
                }
            }
        }
    }
}

// Animate to page

function animateToPage(input, output, target, name, finalRotation) { //'home-page', 'contact-page'
    if (pageCounter[name] === undefined) {
        pageCounter[name] = 0;
    }

    if (pageCounter[name] === -1) {
        pageCounter[name] = 0;
    } else {
        requestAnimationFrame(animateToPage.bind(this, input, output, target, name));

        if (pageCounter[name] === 0) {
            let back;
            back = name === 'home';
            doTransition(document.getElementById(input), document.getElementById(output), back);

            let position = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
            const tween = new TWEEN.Tween(position).to(target, 2000);
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            tween.onUpdate(function () {
                camera.position.x = position.x;
                camera.position.y = position.y;
                camera.position.z = position.z;
            });


            let startRotation = new THREE.Euler().copy(camera.rotation);
            camera.lookAt(new THREE.Vector3(target.x, target.y, target.z));
            let endRotation;
            if (finalRotation === undefined) {
                endRotation = new THREE.Euler().copy(camera.rotation);
            } else {
                endRotation = finalRotation;
            }
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
                pageCounter[name] = -1;
                if (name === 'blog') {
                    fetchPosts();
                }
            });

            tween.start();
            rotationTween.start();
        }

        pageCounter[name] += 1;
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
