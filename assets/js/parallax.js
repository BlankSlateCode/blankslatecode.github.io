function goParallax() {
	window.addEventListener("scroll", function(event){
		var top = this.pageYOffset;
		var shift = function(layer) {
			var speed = layer.getAttribute('data-speed');
			var yPos = function() {return -(top * speed / 100);};
			var coords = function(x,y,z) {
				return [x,y,z].map(function(x) {return x+'px';}).join(',');
			};
			var style = function() {
				return'transform: translate3d('+coords(0,yPos(),0)+')';
			};
			layer.setAttribute('style', style());
		};
		// document.getElementsByClassName is 'array like' not an actual array
		Array.prototype.forEach.call(document.getElementsByClassName('parallax'), shift);

	});
}

function init() {
	goParallax();
}

document.body.onload = init();