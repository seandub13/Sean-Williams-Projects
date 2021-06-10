const colour = ["blue", "red", "green", "orange", "purple", "gray"];
var counter = 0;
var complete = 0;
var i = 0;
function size() {
	var button = document.getElementById('Button');
	button.innerHTML="Restart Game";
	var container = document.getElementById('container');
	container.innerHTML = '';
	for ( i = 0; i < 36; i++) {
		var box = document.createElement('div');
		box.className = 'box';
		box.id = counter;
		counter = counter + 1;
		container.appendChild(box);
		box.style.backgroundColor = colour[Math.floor(Math.random() * colour.length)];
		box.onclick = function () {
			if (document.getElementById("demo").style.color == this.style.backgroundColor && this.style.backgroundColor != "black"  ) {
				this.style.backgroundColor = "black";
				complete = complete + 1;
				console.log(complete);
				if (complete == 36) {
					document.getElementById("demo").innerHTML = ("Game Over - " + seconds + " seconds");
					document.getElementById("demo").style.color = "black";
					clearTimeout(cancel);}
			}
			else if (this.style.backgroundColor == "black") {

            }
			else {
				document.getElementById("demo").innerHTML = this.style.backgroundColor.toUpperCase();
				document.getElementById("demo").style.color = this.style.backgroundColor;}
		};
		
	}
}


var seconds = 0;
var cancel;
function incrementSeconds() {
	cancel = setTimeout(incrementSeconds, 1000);
	var el = document.getElementById('seconds-counter');
	el.style.display = "block";
	do {
		seconds = seconds + 1;
		el.innerText = "Game Time : " + seconds + " seconds.";
	}
	while (seconds < 1);
}
function resetTime() {
	seconds = 0;
	clearTimeout(cancel);
	i = 0;
	counter = 0;
	complete = 0;
	document.getElementById("demo").innerHTML = "";
}