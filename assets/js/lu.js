/**
 * http://bl.ocks.org/mbostock/5385402
 */

var δτ = 0.003,
    ρ = 20,
    σ = 36,
    β = 3,
    x = 0.5,
    y = 0.5,
    z = 10,
    n = 60;

var width = 360,
    height = 240;

var canvas = d3.select("body").select("div").append("canvas")
    .attr("width", width)
    .attr("height", height);

var color = d3.scale.linear()
    .domain([0, 20, 30, 50])
    // .range(["yellow", "orange", "brown", "purple"])
    // .range(["orange", "grey", "black", "green"])
    .range(["#ffffcc", "#a1dab4", "#41b6c4", "#225ea8"])
    .interpolate(d3.interpolateHcl);

var context = canvas.node().getContext("2d");

context.lineWidth = 0.2;
context.fillStyle = "rgba(235, 243, 246, .03)";

var doit = function() {
  context.save();
  context.globalCompositeOperation = "lighter";
  context.translate(width / 2, height / 2);
  context.scale(6, 7);
  context.rotate(30);
  for (var i = 0; i < n; ++i) {
    context.strokeStyle = color(z);
    context.beginPath();
    context.moveTo(x, y);
    x += δτ * σ * (y - x);
    y += δτ * (- (x * z) + ρ * y);
    z += δτ * (x * y - β * z);
    context.lineTo(x, y);
    context.stroke();
  }
  context.restore();
};

window.addEventListener('scroll', function(){
    if (this.pageYOffset > 500) {
      // doit();
      doit();
    }
});
