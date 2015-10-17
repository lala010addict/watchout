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
                    .data(d3.range(gameOptions.nEnemies))
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
    // update high schore if needed
    console.log("MUAHAHAA!!!");
    // reset score to 0
    // REFACTOR
    if (gameStats.score > gameStats.bestScore) {
      gameStats.bestScore = gameStats.score;
      d3.select('.high span').text(gameStats.bestScore);
    }
    gameStats.score = 0;
    renderScore();
  }
};

var tweenWithCollisionDetection = function(endData) {
  var enemy = d3.select(this);

  return function (t) {
    checkCollision(enemy);
  };
};

// MAKE THE PLAYER DRAGGABLE
var mover = function () {
  var minX = 0;
  var maxX = gameOptions.width - parseInt(d3.select('image').attr('width'));
  var minY = 0;
  var maxY = gameOptions.height - parseInt(d3.select('image').attr('height'));

  if (d3.event.x < minX) {
    var x = 0;
  } else if (d3.event.x > maxX) {
    var x = maxX;
  } else {
    var x = d3.event.x;
  }

  if (d3.event.y < minY) {
    var y = 0;
  } else if (d3.event.y > maxY) {
    var y = maxY;
  } else {
    var y = d3.event.y;
  }

  d3.select('image')
    .attr("x", x)
    .attr("y", y);
};

var drag = d3.behavior.drag().on("drag", mover);

d3.select("image").call(drag);


// SCORE STUFF
var increaseScore = function() {
  gameStats.score++;
  renderScore();
};

var renderScore = function() {
  d3.select('.current span').text(gameStats.score);
};

// MAKE STUFF MOVE!! :D
setInterval(moveEnemies, 2000);
setInterval(increaseScore, 1000);
