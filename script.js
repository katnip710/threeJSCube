// SETTING THE CAMERA, SCENE, RENDERER, MESH, AND THE AMOUNT OF SUBSCENES ////////
let camera, scene, renderer;
let mesh;
const AMOUNT = 6;

function init() {

    const ASPECT_RATIO = window.innerWidth / window.innerHeight;

    const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio;
    const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio;

    const cameras = [];

    for ( let y = 0; y < AMOUNT; y ++ ) {

        for ( let x = 0; x < AMOUNT; x ++ ) {

            const subcamera = new THREE.PerspectiveCamera( 40, ASPECT_RATIO, 0.1, 10 );
            subcamera.viewport = new THREE.Vector4( Math.floor( x * WIDTH ), Math.floor( y * HEIGHT ), Math.ceil( WIDTH ), Math.ceil( HEIGHT ) );
            subcamera.position.x = ( x / AMOUNT ) - 0.5;
            subcamera.position.y = 0.5 - ( y / AMOUNT );
            subcamera.position.z = 1.5;
            subcamera.position.multiplyScalar( 2 );
            subcamera.lookAt( 0, 0, 0 );
            subcamera.updateMatrixWorld();
            cameras.push( subcamera );

        }

    }
    camera = new THREE.ArrayCamera( cameras );
    camera.position.z = 3;

    scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0x222244 ) );

    // LIGHT //////////////////////////////////////////////////////
    const light = new THREE.DirectionalLight();
    light.position.set( 0.5, 0.5, 1 );
    light.castShadow = true;
    light.shadow.camera.zoom = 4; // tighter shadow map
    scene.add( light );

    // BACKGROUND/BACKGROUND MATERIAL //////////////////////////////////
    const geometryBackground = new THREE.PlaneGeometry( 100, 100 );
    const materialBackground = new THREE.MeshPhongMaterial( { color: 0x1E2020 } );
    const background = new THREE.Mesh( geometryBackground, materialBackground );
    background.receiveShadow = true;
    background.position.set( 0, 0, - 1 );
    scene.add( background );

    // GEOMETERY OBJECT AND IT'S MATERIAL ////////////////////////////////
    const geometryCube = new THREE.BoxGeometry(1, 1, 1);
    const materialCube = new THREE.MeshNormalMaterial( { color: 0xC392FF } );
    mesh = new THREE.Mesh( geometryCube, materialCube );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );

    // RENDER WEBGL ///////////////////////////////////////
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );

    // RESIZE WINDOW EVENTLISTENER///////////////////////////////
    window.addEventListener( 'resize', onWindowResize );

}

// ON WINDOW RESIZE FUNCTION ///////////////////////////
function onWindowResize() {

    const ASPECT_RATIO = window.innerWidth / window.innerHeight;
    const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio;
    const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio;

    camera.aspect = ASPECT_RATIO;
    camera.updateProjectionMatrix();

    for ( let y = 0; y < AMOUNT; y ++ ) {

        for ( let x = 0; x < AMOUNT; x ++ ) {

            const subcamera = camera.cameras[ AMOUNT * y + x ];

            subcamera.viewport.set(
                Math.floor( x * WIDTH ),
                Math.floor( y * HEIGHT ),
                Math.ceil( WIDTH ),
                Math.ceil( HEIGHT ) );

            subcamera.aspect = ASPECT_RATIO;
            subcamera.updateProjectionMatrix();

        }

    }

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// ANIMATE SCENE ///////////////////////////
function animate() {

    mesh.rotation.x += 0.007;
    mesh.rotation.z += 0.005;

    renderer.render( scene, camera );

    requestAnimationFrame( animate );

}

// INITALIZE ALL THE FUNCTIONS //////////////////////////
init();
animate();