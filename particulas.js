var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var cw = (canvas.width = window.innerWidth); //cw es el width del canvas
var ch = (canvas.height = window.innerHeight); //ch es el height del canvas


var numCirculos = prompt('Escribe el numero de circulo que quieres');
var maxDist = 300;

var colorArray = [
	'##F26D85',
	'#BF214B',
	'#C1D0D9',
	'#0E6973',
	'#0E7373',
	'#547C8C',
	'#6FB7BF',
	'#D96704',
	'#D9A679',
	'#8C4C46'
];

ctx.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
ctx.strokeStyle = colorArray[Math.floor(Math.random() * colorArray.length)];

var circulos = [];

function randomIntFromInterval(minim, maxim) {
	return ~~(Math.random() * (maxim - minim + 1) + minim);
	// ~~ la doble tilde (~~) es un operador equivalente a Math.floor()
}

class Circulo {
	constructor() {
		this.r = 10;
		this.x = randomIntFromInterval(this.r, cw - this.r);
		this.y = randomIntFromInterval(this.r, ch - this.r);
		this.vx = Math.random() * 9 - 3; // un número aleatorio entre -3 y 3
		this.vy = Math.random() * 9 - 3; // un número aleatorio entre -3 y 3
	}

	dibujar = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.fill();
	};
}

for (let i = 0; i < numCirculos; i++) {
	circulos.push(new Circulo());
}

function conectar(c1, c2) {
	var dx = c2.x - c1.x;
	var dy = c2.y - c1.y;
	var dist = Math.abs(Math.sqrt(dx * dx + dy * dy));
	if (dist < maxDist) {
		ctx.beginPath();
		ctx.moveTo(c1.x, c1.y);
		ctx.lineWidth = 3;
		ctx.lineTo(c2.x, c2.y);
		ctx.stroke();
		ctx.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
	}
}

function mover(c, i) {
	c.x += c.vx;
	c.y += c.vy;

	// si tocan los bordes del canvas rebotan
	if (c.x > cw - c.r) {
		c.vx *= -1;
		ctx.strokeStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
	} else if (c.x < c.r) {
		c.vx *= -1;
	}
	if (c.y > ch - c.r) {
		c.vy *= -1;
	} else if (c.y < c.r) {
		c.vy *= -1;
	}

	for (var j = i + 1; j < circulos.length; j++) {
		conectar(c, circulos[j]);
	}
}

function Animar() {
	elId = window.requestAnimationFrame(Animar);
	ctx.clearRect(0, 0, cw, ch);
	for (var i = 0; i < circulos.length; i++) {
		mover(circulos[i], i);
		circulos[i].dibujar();
	}
}
elId = window.requestAnimationFrame(Animar);
