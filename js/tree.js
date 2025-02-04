let scene, camera, renderer, model;
const container = document.getElementById("scene-container");

let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
const lerpSpeed = 0.03;

function getCameraPosition() {
    const width = window.innerWidth;
    if (width > 1440) return 5;
    if (width > 1100) return 6;
    if (width > 900) return 7;
    if (width > 600) return 8;
    return 12;
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, getCameraPosition());


    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const pointLight = new THREE.PointLight(0xffffff, 1.8, 30);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const texture = new THREE.TextureLoader().load("./model/Image_0.jpg");

    new THREE.GLTFLoader().load("./model/LiddWeb.gltf", function (gltf) {
        model = gltf.scene;
        model.scale.set(0.1, 0.1, 0.1);
        model.position.set(0, 0.5, 0);
        model.rotation.set(0, 0, 0);

        model.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    metalness: 0.4,
                    roughness: 0.3,
                });
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        scene.add(model);
    });

    document.addEventListener("mousemove", (event) => {
        targetRotation.x = -(event.clientY / window.innerHeight - 0.5) * 0.6;
        targetRotation.y = (event.clientX / window.innerWidth - 0.5) * 0.6;
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        currentRotation.x += (targetRotation.x - currentRotation.x) * lerpSpeed;
        currentRotation.y += (targetRotation.y - currentRotation.y) * lerpSpeed;
        model.rotation.set(currentRotation.x, currentRotation.y, 0);
    }

    renderer.render(scene, camera);
}

init();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
