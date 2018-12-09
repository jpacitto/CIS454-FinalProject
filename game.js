document.addEventListener('keydown', function(event){
	if(event.keyCode == 87 && xwing.position.y < 9.5){
		xwing.position.y += 0.5;
	}else if(event.keyCode == 65 && xwing.position.x > -11){
		xwing.position.x -= 0.5;
	}else if(event.keyCode == 83 && xwing.position.y > -8){
		xwing.position.y -= 0.5;
	}else if(event.keyCode == 68 && xwing.position.x < 10.5){
		xwing.position.x += 0.5;
	}
});

var cameraRotate = 0.005;
var score = document.getElementById("score");
var spawnRate = 5000;

var fileLoc = [
	'res/tiefighter/starwars-tie-fighter.json',
	'res/shrek/backdoor.json'
]

var oldTime = 0;
var lastObject = 0;

var obstacles = new Array();

var animate = function()
{
	var date = new Date();
	var time = date.getTime();

	requestAnimationFrame(animate);

	if(time - lastObject > spawnRate)
	{
		var num = Math.floor(Math.random() * 2);
		lastObject = time;

		objLoader.load(fileLoc[num], function(object){

			if(num == 0){
				scaleFactor = 0.5;
			}else if(num == 1){
				scaleFactor = 0.05;
			}

			var y = Math.floor(Math.random() * 10)

			object.position.z = -50;
			object.scale.set(scaleFactor, scaleFactor, scaleFactor);
			scene.add(object);
			obstacles.push(object);
		});
	}

	if(lastObject != 0)
	{
		for(var i = 0; i < obstacles.length; i++)
		{
			obstacles[i].position.z += 0.5;
			if(obstacles[i].position.z > 30){
				scene.remove(obstacles[i]);
				obstacles.splice(i, 1);
			}
		}
	}



	///////////////////////////////////
	///////////////////////////////////
	//////////////Dont' touch/////////
	cube.rotation.x += 0.0005;
	if(time - oldTime > 100)
	{
		num = score.textContent;
		if(parseInt(num) % 200 == 0 && num != 0){
			spawnRate -= 500;
		}
		num = parseInt(num) + 1;
		score.innerHTML = num;
		oldTime = time;
	}

    camera.lookAt(scene.position);
	renderer.render(scene, camera);
}

animate();