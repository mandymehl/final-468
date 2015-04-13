
var output;
var pacman;

var loopTimer;
var numLoops = 0;

var upArrowDown = false;
var downArrowDown = false;
var leftArrowDown = false;
var rightArrowDown = false;

var direction = 'right';

var walls = new Array();
var dots = new Array();

var PACMAN_SPEED = 10;
var GHOST_SPEED = 5;

function loadComplete(){
	output = document.getElementById('output');
	pacman = document.getElementById('pacman');
	pacman.style.left = '280px';
	pacman.style.top = '240px';
	pacman.style.width = '40px';
	pacman.style.height = '40px';

	redGhost = document.getElementById('redGhost');
	redGhost.style.left = '260px';
	redGhost.style.top = '40px';
	redGhost.style.width = '40px';
	redGhost.style.height = '40px';

	blueGhost = document.getElementById('blueGhost');
	blueGhost.style.left = '300px';
	blueGhost.style.top = '40px';
	blueGhost.style.width = '40px';
	blueGhost.style.height = '40px';

	greenGhost = document.getElementById('greenGhost');
	greenGhost.style.left = '220px';
	greenGhost.style.top = '40px';
	greenGhost.style.width = '40px';
	greenGhost.style.height = '40px';

	pinkGhost = document.getElementById('pinkGhost');
	pinkGhost.style.left = '340px';
	pinkGhost.style.top = '40px';
	pinkGhost.style.width = '40px';
	pinkGhost.style.height = '40px';

	loopTimer = setInterval(loop, 50);

	// inside walls
	createWall(240, 200, 120, 40);
	createWall(240, 280, 120, 40);
	createWall(80, 160, 40, 160);
	createWall(480, 160, 40, 160);
	createWall(160, 240, 40, 160);
	createWall(160, 0, 40, 120);
	createWall(400, 240, 40, 160);
	createWall(400, 0, 40, 120);
	createWall(80, 80, 40, 40);
	createWall(480, 80, 40, 40);
	createWall(160, 160, 40, 40);
	createWall(400, 160, 40, 40);
	createWall(240, 80, 40, 80);
	createWall(320, 80, 40, 80);

	// top wall
	createWall(-20, 0, 640, 40);
	// left side walls
	createWall(0, 0, 40, 160);
	createWall(0, 200, 40, 200);
	// right side walls
	createWall(560, 0, 40, 160);
	createWall(560, 200, 40, 200);
	// top wall
	createWall(-20, 360, 640, 40);
	
	for(var row=0; row<10; row++){
		for(var col=0; col<15; col++){
			var dot = document.createElement('div');
			dot.className = 'dot';
			dot.style.left = col*40+10 + 'px';
			dot.style.top = row*40+10 + 'px';
			dot.style.width = '18px';
			dot.style.height = '18px';
			
			if( ! hitWall(dot) ){
				gameWindow.appendChild(dot);
				dots.push(dot);
			}
		}
	}
	
	output.innerHTML = 'Dots left' + dots.length;
}				

			
function createWall(left, top, width, height){
	var wall = document.createElement('div');
	wall.className = 'wall';
	wall.style.left = left + 'px';
	wall.style.top = top + 'px';
	wall.style.width = width + 'px';
	wall.style.height = height + 'px';
	gameWindow.appendChild(wall);

	walls.push(wall);	
}

function loop(){
	numLoops++;
	tryToChangeDirection();

	var originalLeft = pacman.style.left;
	var originalTop = pacman.style.top;

	if(direction=='up'){
		var pacmanY = parseInt(pacman.style.top) - PACMAN_SPEED;
		if(pacmanY < -30) pacmanY = 390;
		pacman.style.top = pacmanY + 'px';
	}
	if(direction=='down'){
		var pacmanY = parseInt(pacman.style.top) + PACMAN_SPEED;
		if(pacmanY > 390) pacmanY = -30;
		pacman.style.top = pacmanY + 'px';
	}
	if(direction=='left'){
		var pacmanX = parseInt(pacman.style.left) - PACMAN_SPEED;
		if(pacmanX < -30) pacmanX = 590;
		pacman.style.left = pacmanX + 'px';
	}
	if(direction=='right'){
		var pacmanX = parseInt(pacman.style.left) + PACMAN_SPEED;
		if(pacmanX > 590) pacmanX = -30;
		pacman.style.left = pacmanX + 'px';
	}

	if( hitWall(pacman) ){
		pacman.style.left = originalLeft;
		pacman.style.top = originalTop;
	}
	
	for(var i=0; i<dots.length; i++){
		if( hittest(dots[i], pacman) ) {
			dots[i].style.display = 'none';
		}
	}				

}

function hitWall(element){
	var hit = false;
	for(var i=0; i<walls.length; i++){
		if( hittest(walls[i], element) ) hit = true;
	}
	return hit;
}

document.addEventListener('keydown', function(event){
	if(event.keyCode==37) leftArrowDown = true;
	if(event.keyCode==38) upArrowDown = true;
	if(event.keyCode==39) rightArrowDown = true;
	if(event.keyCode==40) downArrowDown = true;
});

document.addEventListener('keyup', function(event){
	if(event.keyCode==37) leftArrowDown = false;
	if(event.keyCode==38) upArrowDown = false;
	if(event.keyCode==39) rightArrowDown = false;
	if(event.keyCode==40) downArrowDown = false;
});

function tryToChangeDirection(){
	var originalLeft = pacman.style.left;
	var originalTop = pacman.style.top;

	if(leftArrowDown){
		pacman.style.left = parseInt(pacman.style.left) - PACMAN_SPEED + 'px';
		if( ! hitWall(pacman) ){
			direction = 'left';
			pacman.className = "flip-horizontal";
		}
	}
	if(upArrowDown){
		pacman.style.top = parseInt(pacman.style.top) - PACMAN_SPEED + 'px';
		if( ! hitWall(pacman) ){
			direction = 'up';
			pacman.className = "rotate270";
		}
	}
	if(rightArrowDown){
		pacman.style.left = parseInt(pacman.style.left) + PACMAN_SPEED + 'px';
		if( ! hitWall(pacman) ){
			direction = 'right';
			pacman.className = "";
		}
	}
	if(downArrowDown){
		pacman.style.top = parseInt(pacman.style.top) + PACMAN_SPEED + 'px';
		if( ! hitWall(pacman) ){
			direction = 'down';
			pacman.className = "rotate90";
		}
	}

	pacman.style.left = originalLeft;
	pacman.style.top = originalTop;
}

