/*/ Source code
 * 
 *  The javascript that is run, is loaded from app.json
 *
/*/ 

const MAX_RECURSION = 5;

var sphere = scene.getObjectByName('Sphere');
sphere.material.emissiveMap.magFilter = THREE.NearestFilter;

var mother = sphere.clone();
scene.add(mother);

function generate(parent, level)
// Recursively generate the sphere systems
{
	if (0 == level)
		return;

	for (var i = 0; i < 2; i++) 
	{
		var child = sphere.clone();
		child.material = sphere.material.clone();
		child.position.x = -0.5 + i;
		child.position.y = -0.5 + i;
		child.position.z = -0.5 + i;
		
		child.position.normalize();
		child.position.multiplyScalar(parent.geometry.parameters.radius * 3);
		parent.add(child);

		generate(child, level - 1);
	}

}

generate(mother, MAX_RECURSION);

sphere.visible = false;

function recursiveUpdate(parent, time)
// Recursively update all children of parent
{
	for (var i = 0; i < parent.children.length; i++)
	{
		var child = parent.children[i];
		
		// Slowly rotate about y-axis
		child.rotation.y = time;
		// Control emission of red & blue light
		child.material.emissive.r = Math.max(0, Math.cos(child.parent.material.emissive.r * Math.PI )) * Math.abs(Math.sin(child.rotation.y));
		child.material.emissive.b = Math.max(0, Math.cos(child.rotation.y));
		// Recursively update all children of child
		recursiveUpdate(child, time);
	}
}

function updateCamera()
// Make camera travel in a 2:1 elliptical pattern around the mother sphere
{
	camera.position.x = Math.cos( mouseDelta ) * 16;
	camera.position.z = Math.sin( mouseDelta ) * 8;
	camera.lookAt(scene.position);
}

var mouseDelta = 0;
var controlCamera = false;

updateCamera();

function mousemove(event)
// Rotate camera
// Increase speed the further away from center
{
	if (!controlCamera)
		return;
	
	mouseDelta += (event.clientX / player.width - 0.5) / 10;
	updateCamera();
}

// Toggle manual camera control by clicking mouse
function mousedown(event) { controlCamera = !controlCamera; }
	
function update(event) 
// Update function: Called continously
{
	// Move camera in elliptical pattern
	mouseDelta += event.time * 1e-9;
	updateCamera();
	
	// Slowly rotate about y-axis
	mother.rotation.y = event.time * 0.0001;
	// Master control for red/blue light emission
	mother.material.emissive.r = Math.max(0, Math.sin(event.time * 0.0004)) * Math.abs(Math.sin(mother.rotation.y)) ; 
	mother.material.emissive.b = Math.max(0, Math.cos(mother.rotation.y) * 0.5);
	
	// Recursively update systems in 1:2 time ratio
	recursiveUpdate(mother, event.time * 0.0002);

}
