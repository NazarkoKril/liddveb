let scene, camera, renderer, model;
const container = document.getElementById('scene-container');

function init() {
    // Створюємо сцену
    scene = new THREE.Scene();

    // Камера
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Рендерер
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Вмикаємо тіні
    container.appendChild(renderer.domElement);

    // **Освітлення**
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.2, 100);
    pointLight.position.set(3, 5, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(-3, -5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // **Завантажуємо текстуру**
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./model/Image_0.jpg', () => {
    });

    // **Завантаження моделі**
    const loader = new THREE.GLTFLoader();
    loader.load('./model/LiddWeb.gltf', function (gltf) {
        model = gltf.scene;
        
        // ✅ Зменшуємо розмір (вибери значення, яке виглядає добре)
        model.scale.set(0.1, 0.1, 0.1);
        model.position.set(0, 0, 0);
        model.rotation.set(0.8, 0, 0);

        model.traverse((child) => {
            if (child.isMesh) {

                child.material = new THREE.MeshStandardMaterial({
                    map: texture, 
                    metalness: 0.5, 
                    roughness: 0.3, 
                    flatShading: false,
                });

                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        scene.add(model);
    });

    // Слухаємо рух курсора
    document.addEventListener('mousemove', onMouseMove, false);
    animate();
}

function onMouseMove(event) {
    if (model) {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        model.rotation.y = x * 0.3;
        model.rotation.x = y * 0.3;
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Запускаємо сцену
init();

// Адаптація до зміни розміру вікна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
