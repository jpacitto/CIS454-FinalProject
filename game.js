//Listen for key inputs
document.addEventListener('keydown', function(event){
	if(event.keyCode == 87 && xwing.position.y < 9.5){
		xwing.position.y += 0.7;
		cube1.position.y += 0.7;
	}else if(event.keyCode == 65 && xwing.position.x > -17){
		xwing.position.x -= 0.7;
		cube1.position.x -= 0.7;
	}else if(event.keyCode == 83 && xwing.position.y > -8){
		xwing.position.y -= 0.7;
		cube1.position.y -= 0.7;
	}else if(event.keyCode == 68 && xwing.position.x < 17){
		xwing.position.x += 0.7;
		cube1.position.x += 0.7;
	}else if(event.keyCode == 72){
		if(mat.transparent == true){
			mat.transparent = false;
			mat.opacity = 1;
		}else{
			mat.transparent = true;
			mat.opacity = 0;
		}
	}

});

//variables for game difficulty
var cameraRotate = 0.005;
var score = document.getElementById("score");
var spawnRate = 5000;
var objSpeed = 0.5;

var fileLoc = [
	'res/tiefighter/starwars-tie-fighter.json',
	'res/shrek/backdoor.json'
]

var oldTime = 0;
var lastObject = 0;

var obstacles = new Array();
var spin = new Array();
var collidableMeshList = [];

//game loop
var id;
var animate = function()
{
	var date = new Date();
	var time = date.getTime();

	id = requestAnimationFrame(animate);

	//loading objects at specific rate
	if(time - lastObject > spawnRate)
	{
		var num = Math.floor(Math.random() * 4);
		lastObject = time;

		var spinning = -1;
		var obj;
		var hitbox;
		if(num == 0){
			obj = tiefigher.clone();
			hitbox = tieCube.clone();
		}else if(num == 1){
			obj = shrek.clone();
			hitbox = shrekCube.clone();
			spinning = 1;
		}else if(num == 2){
			obj = vader.clone();
			hitbox = vaderCube.clone();
		}else if(num == 3){
			spinning = 1;
			obj = asteroid.clone();
			hitbox = astroCube.clone();
		}

		var y = Math.floor(Math.random() * Math.floor(21)) - 10;
		var x = Math.floor(Math.random() * Math.floor(28)) - 17;

		obj.position.x = x;
		obj.position.y = y;
		obj.position.z = -100;

		hitbox.position.x = x;
		hitbox.position.y = y;
		hitbox.position.z = -100;
		
		var p = -1;
		if(spinning == 1)
		{
			p = Math.floor(Math.random() * Math.floor(3));
		}

		scene.add(obj);
		scene.add(hitbox)
		collidableMeshList.push(hitbox);
		obstacles.push(obj);
		spin.push(p);


	}

	//remove object from list
	if(lastObject != 0)
	{
		for(var i = 0; i < obstacles.length; i++)
		{
			obstacles[i].position.z += objSpeed;
			collidableMeshList[i].position.z += objSpeed;

			if(spin[i] == 0)
			{
				obstacles[i].rotation.z += 0.01;
				obstacles[i].rotation.x += 0.01;
				collidableMeshList[i].rotation.z += 0.01;
				collidableMeshList[i].rotation.x += 0.01;
			}else if(spin[i] == 1){
				obstacles[i].rotation.z += 0.01;
				obstacles[i].rotation.y += 0.01;
				collidableMeshList[i].rotation.z += 0.01;
				collidableMeshList[i].rotation.y += 0.01;
			}else if(spin[i] == 2){
				obstacles[i].rotation.x += 0.01;
				obstacles[i].rotation.y += 0.01;
				collidableMeshList[i].rotation.x += 0.01;
				collidableMeshList[i].rotation.y += 0.01;
			}

			if(obstacles[i].position.z > 30){
				scene.remove(obstacles[i]);
				scene.remove(collidableMeshList[i]);
				obstacles.splice(i, 1);
				spin.splice(i, 1);
				collidableMeshList.splice(i, 1);
			}
		}
	}



	///////////////////////////////////
	///////////////////////////////////
	//////////////Dont' touch/////////
	cube.rotation.x += 0.0005;
	if(time - oldTime > 50)
	{
		num = score.textContent;
		if(parseInt(num) % 200 == 0 && num != 0 && spawnRate > 1000){
			spawnRate -= 1000;
			objSpeed += 0.05;
		}

		if(parseInt(num) == 1000)
		{
			spawnRate = 600;
		}
		num = parseInt(num) + 1;
		score.innerHTML = num;
		oldTime = time;
	}


	////////
	////////Collision Detection
	var finalScore = score.textContent;
	var originPoint = cube1.position.clone()
	for (var vertexIndex = 0; vertexIndex < cube1.geometry.vertices.length; vertexIndex++)
	{       
		var localVertex = cube1.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4(cube1.matrix);
		var directionVector = globalVertex.sub( cube1.position );

		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
		{
			cancelAnimationFrame(id);
			score.innerHTML = "GAME OVER! Score: " + finalScore;
		}
	}

	camera.lookAt(scene.position);
	renderer.render(scene, camera);
}

animate();