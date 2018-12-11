var xwing, tiefigher, vader, shrek, asteroid;

var objLoader = new THREE.ObjectLoader();

//shrek loader
objLoader.load('res/shrek/backdoor.json', function(object)
{
	shrek = object;
	shrek.scale.set(0.05, 0.05, 0.05);
});

//tiefighter loader
objLoader.load('res/tiefighter/starwars-tie-fighter.json', function(object)
{
	tiefigher = object;
	tiefigher.scale.set(0.5, 0.5, 0.5);
});

objLoader.load('res/vaderfighter/star-wars-vader-tie-fighter.json', function(object){
	vader = object;
	vader.scale.set(0.3,0.3,0.3);
});

objLoader.load('res/asteroid/asteroid.json', function(object){
	asteroid = object;
	asteroid.scale.set(0.3 ,0.3, 0.3);
});

//create the scene
var scene = new THREE.Scene();

//var mat = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var mat = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0} );

var shrekGeo = new THREE.BoxGeometry( 7, 6, 0.5);
var shrekCube = new THREE.Mesh( shrekGeo, mat );

var tieGeo = new THREE.BoxGeometry( 3, 4, 4);
var tieCube = new THREE.Mesh( tieGeo, mat );

var vaderGeo = new THREE.BoxGeometry(7,6,10);
var vaderCube = new THREE.Mesh(vaderGeo, mat);

var astroGeo = new THREE.BoxGeometry(10,6,7);
var astroCube = new THREE.Mesh(astroGeo, mat);

var geometry = new THREE.BoxGeometry( 7, 1, 9);
var cube1 = new THREE.Mesh( geometry, mat );
scene.add( cube1 );

objLoader.load('res/x-wing/star-wars-x-wing.json', function(object)
{
	xwing = object;
	xwing.rotation.y = 3.15;
	xwing.scale.set(0.75, 0.75, 0.75);
	scene.add(xwing);
});


var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 20;
camera.position.y = 6;
camera.lookAt(scene.position);

//display scene on screen
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x818080);
renderer.setSize(window.innerWidth, window.innerHeight);
var canvas = document.getElementById("canvas");
canvas.appendChild(renderer.domElement);


//create skybox
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

//add orbit controls
var controls = new THREE.OrbitControls(camera, renderer.domElemet);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;


//lighting
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100,0,100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
ambientLight.position.y = 100;

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

//load skybox textures
var skyBoxGeo = new THREE.CubeGeometry(1000, 1000, 1000);
var cubeMaterials = 
[
	new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("res/sor_cwd/memes.jpg"), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("res/sor_cwd/cwd_bk.jpg"), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("res/sor_cwd/cwd_dn.jpg"), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("res/sor_cwd/cwd_lf.jpg"), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("res/sor_cwd/cwd_rt.jpg"), side: THREE.DoubleSide}),
	new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("res/sor_cwd/cwd_up.jpg"), side: THREE.DoubleSide})
];

var cube = new THREE.Mesh(skyBoxGeo, cubeMaterials);
scene.add(cube);
