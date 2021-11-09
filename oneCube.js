/* SCENE SET UP, CAMERA, LIGHTS, SHADOWS, PAGE SET UP *///////////////////////////////
// Creating the scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0x1E2020 );

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// White directional light at half intensity shining from the top.
const light = new THREE.DirectionalLight();
light.position.set( 0.5, 0.5, 1 );
light.castShadow = true;
light.shadow.camera.zoom = 2; // tighter shadow map
scene.add( light );

// Render page size
const renderer = new THREE.WebGLRenderer();

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



/* OBJECTS IN PAGE *///////////////////////////////////////////
/* Creating the TextGeometry Title
const loader = new THREE.FontLoader();
loader.load( 'fonts/gentilis_bold.typeface.json', function ( font ) {

	const title = new THREE.TextGeometry( 'The Cube', {
		font: font,
		size: 0.3,
        height: 0.1,
        curveSegments: 1,
		bevelEnabled: true,
		bevelThickness: 0.09,
		bevelSize: 0.04,
		bevelOffset: 0,
		bevelSegments: 2
	} );

    const textMaterial = new THREE.MeshNormalMaterial({
        color: 0xC392FF,
        curveSegments: 12,
    });

    const cubeTitleText = new THREE.Mesh(title, textMaterial);
    cubeTitleText.position.set(-0.8, 1, 1);
    cubeTitleText.castShadow = true;
    cubeTitleText.receiveShadow = false; //default
    scene.add(cubeTitleText);
} );
*/

// Creating the Cube
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshNormalMaterial({
    color: 0xC392FF
});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.castShadow = true;
cube.receiveShadow = false; //default
scene.add(cube);


/* CREATE THE PLANE *//////////////////////////////////
const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x1E2020 } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.position.z = -1;
scene.add( plane );


/* RENDER AND ANIMATE SCENE *///////////////////////////////////
const animate = function () {
    requestAnimationFrame(animate);
    // Animating the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();





const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;