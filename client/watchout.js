// GENERAL STUFF
// define gameOptions
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

// create board
var board = d3.select('body').append('svg')
                             .attr('height', gameOptions.height)
                             .attr('width', gameOptions.width)
                             .style('background-color', 'blue');


// ENEMY STUFF
// create enemies
var enemies = board.selectAll('.enemies')
                    .data(d3.range(30))
                    .enter()
                    .append('circle')
                    .attr('cx', function() {
                      return (Math.random() * gameOptions.width);
                    })
                    .attr('cy', function() {
                      return (Math.random() * gameOptions.width);
                    })
                    .attr('r', 10)
                    .attr('fill', 'red');

var moveEnemies = function() {
  enemies.transition()
         .duration(2000)
         .attr('cx', function(){
           return (Math.random() * gameOptions.width);
         })
         .attr('cy', function(){
           return(Math.random() * gameOptions.width);
         })
         .tween('custom', tweenWithCollisionDetection);
};


// PLAYER STUFF
var player = board.append("image")
                  .attr("x", 150)
                  .attr("y", 100)
                  .attr("height", "30px")
                  .attr("width", "30px")
                  .attr("xlink:href", "asteroid.png");

var checkCollision = function(enemy) {
  var enemyCx = parseFloat(enemy.attr('cx'));
  var enemyCy = parseFloat(enemy.attr('cy'));
  var playerCx = parseFloat(player.attr('x'));
  var playerCy = parseFloat(player.attr('y'));

  if (Math.hypot(enemyCx - playerCx, enemyCy - playerCy ) <= 25) {
    console.log("UHOH!!");
  }
};

var tweenWithCollisionDetection = function(endData) {
  var enemy = d3.select(this);

  return function (t) {
    checkCollision(enemy);
  };
};

// MAKE THE PLAYER DRAGGABLE
function mover() {
  d3.select('image')
    .attr("x", d3.event.x - parseInt(d3.select('image').attr("width")) / 2)
    .attr("y", d3.event.y - parseInt(d3.select('image').attr("height")) / 2);
};

var drag = d3.behavior.drag().on("drag", mover);

d3.select("image").call(drag);

// MAKE STUFF MOVE!! :D
setInterval(moveEnemies, 2000);
