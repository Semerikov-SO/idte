var renderer, scene, camera;

var ar_source, ar_context;

function on_resize()
{
	ar_source.onResizeElement();
	ar_source.copyElementSizeTo(renderer.domElement);
	
	if(ar_context.arController !== null)
		ar_source.copyElementSizeTo(ar_context.arController.canvas);
}


function init()
{
	scene = new THREE.Scene();
	camera = new THREE.Camera();
	const light = new THREE.AmbientLight( 0xcccccc ); // soft white light
	scene.add( light );

	renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement);

	ar_source = new THREEx.ArToolkitSource({sourceType: 'webcam', sourceWidth: 1280, sourceHeight: 720});
	ar_source.init(on_resize);
	console.log(ar_source);

	window.addEventListener("resize", on_resize);

	ar_context = new THREEx.ArToolkitContext({
		detectionMode: 'mono', 
		cameraParam: "https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/camera_para.dat"
	});

	ar_context.init(function on_complete(){
		camera.projectionMatrix.copy(ar_context.getProjectionMatrix());
	});
	console.log(ar_context);

	var group1 = new THREE.Group();
	scene.add(group1);
	
	var marker1=new THREEx.ArMarkerControls(ar_context, group1, {
		type: "pattern",
		patternUrl: "https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/patt.hiro"
	});

	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshNormalMaterial( {transparent: true, opacity: 0.5} );
	const cube = new THREE.Mesh( geometry, material );
	cube.position.y=0.5;
	group1.add( cube );

	group2 = new THREE.Group();
	scene.add(group2);
	
	var marker2=new THREEx.ArMarkerControls(ar_context, group2, {
		type: "pattern",
		patternUrl: "https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/patt.kanji"
	});

	const geometry1 = new THREE.SphereGeometry(0.5, 32, 16 );
	const material1 = new THREE.MeshNormalMaterial( {transparent: true, opacity: 0.5} );
	const sphere = new THREE.Mesh( geometry1, material1 );
	sphere.position.y=0.5;
	group2.add(sphere );

	const geometry2 = new THREE.TorusGeometry(1, 0.2, 16, 100 );
	const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
	torus = new THREE.Mesh( geometry2, material2 );
	torus.position.x=1.5;
	torus.position.y=0.5;

	group2.add( torus );
}


function animate()
{
	requestAnimationFrame(animate);
	if(ar_source.ready !== false)
		ar_context.update(ar_source.domElement);

	torus.rotation.x+=0.1;
	renderer.render(scene, camera);
}



