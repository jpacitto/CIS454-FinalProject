var xwing, tiefigher, asteroid, shrek;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 20;
camera.position.y = 6;
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x818080);
renderer.setSize(window.innerWidth, window.innerHeight);

var canvas = document.getElementById("canvas");
canvas.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

var controls = new THREE.OrbitControls(camera, renderer.domElemet);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

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

var objLoader = new THREE.ObjectLoader();
objLoader.load('res/x-wing/star-wars-x-wing.json', function(object)
{
	xwing = object;
	xwing.rotation.y = 3.15;
	scene.add(xwing);
	console.log(xwing);
});