function init() {
	scene = new THREE.Scene(); // scene - глобальна змінна: сцена - для розташування освітлення, об'єктів, камер
	// перспективна камера с кутом огляду 75 градусів, співвідношенням сторін об'єктиву, [0.1; 1000]
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight ); // розтягування холсту до розміру вікна
	renderer.setClearColor (0x999999); // колір фону 
	renderer.clear(); // залити фоновим кольором
	document.body.appendChild( renderer.domElement ); // додавання холсту до тіла документа

	window.addEventListener(// обробник події
		'resize', // при зміні розміру вікна
		function() {
			renderer.setSize( window.innerWidth, window.innerHeight ); // розтягування холсту до розміру вікна
			camera.aspect = window.innerWidth/window.innerHeight; // встановити нове співвідношення сторін об'єктиву
			camera.updateProjectMatrix();
			//requestAnimationFrame( animate );
		}
	);

	var loader = new THREE.TextureLoader(); // створити об’єкт класу TextureLoader :

	const geometry = new THREE.BoxGeometry();
	//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: false } );
//	const material = new THREE.MeshBasicMaterial( { map: loader.load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/2294472375_24a3b8ef46_o.jpg") } );
	const material = new THREE.MeshBasicMaterial( { map: loader.load("Screenshot from 2022-04-15 15-06-01.png") } );
	const cube = new THREE.Mesh( geometry, material );

	scene.add( cube );

	cube.position.set(-3, 0, -3);
	camera.position.z=3;

	//var phi=0;

	//1) скористаємось конструктором класу CylinderGeometry:
	var pyramidgeometry=new THREE.CylinderGeometry(0.8, 0.8, 2, 16);
	//2) визначимо матеріал, що відбиває промені:
//	var pyramidmaterial=new THREE.MeshLambertMaterial(/*{color: 0xF3FFE2}*/ {map: loader.load("https://i.imgur.com/ThloWfz.jpeg")});
	var pyramidmaterial=new THREE.MeshBasicMaterial(/*{color: 0xF3FFE2}*/ {map: loader.load("https://i.imgur.com/7i6ducJ.png")});
	//3) комбінуємо геометрію та матеріал:
	var pyramidmesh=new THREE.Mesh(pyramidgeometry, pyramidmaterial);
	scene.add(pyramidmesh);

	pyramidmesh.position.set(3, 0, -3);


	const sgeometry = new THREE.SphereGeometry( 1.5, 32, 16 );
	const smaterial = new THREE.MeshBasicMaterial( { map: loader.load("https://i.imgur.com/t1PiF2q.jpeg") } );
	const sphere = new THREE.Mesh( sgeometry, smaterial );
	scene.add( sphere );
	
	sphere.position.set(0, 1, -3);

//pyramidmesh.position.x=2;

	//– розсіяне
	var lightOne=new THREE.AmbientLight(0xffff, 0.5);
	scene.add(lightOne);
	//– точкове:
	var lightTwo=new THREE.PointLight(0xffff, 0.5);
	scene.add(lightTwo);

	controls = new THREE.OrbitControls(camera,renderer.domElement);

	//controls.autoRotate=true;
	//controls.enableKeys=true;
}


function animate() {
	controls.update();
	requestAnimationFrame( animate );
/*
	camera.position.x = 5*Math.cos(phi);
	camera.position.y = 5*Math.sin(phi);
	phi+=Math.PI/180;
	//cube.position.z-=0.1;
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
*/
	renderer.render(scene, camera); // відображення сцени за допомогою камери: 3D -> 2D
}



