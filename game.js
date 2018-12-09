var cameraRotate = 0.005;
var score = document.getElementById("score");

var animate = function()
{
	requestAnimationFrame(animate);
	cube.rotation.x += 0.0005;


	updateScore();


    camera.lookAt(scene.position);
	renderer.render(scene, camera);
}

animate();

var oldTime = 0;
function updateScore()
{
	var date = new Date();
	var time = date.getTime();

	if(time - oldTime > 100)
	{
		num = score.textContent;
		num = parseInt(num) + 1;
		score.innerHTML = num;
		oldTime = time;
	}
}

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