// GENERAL STUFF
// define gameOptions
var gameOptions = {
  height: 550,
  width: 900,
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
  .style('background-color', 'teal')
   .style('display', 'block')
    .style('margin', 'auto');


// ENEMY STUFF
// create enemies
var enemies = board.selectAll('.enemies')
  .data(d3.range(gameOptions.nEnemies))
  .enter()
  .append('ellipse')
  .attr('rx', 5)
  .attr('ry', 14)
  .attr('cx', function() {
    return (Math.random() * gameOptions.width);
  })
  .attr('cy', function() {
    return (Math.random() * gameOptions.width);
  })
  .attr('fill', 'deepPink');


var moveEnemies = function() {
  enemies.transition()
    .duration(2000)
    .attr('cx', function() {
      return (Math.random() * gameOptions.width);
    })
    .attr('cy', function() {
      return (Math.random() * gameOptions.width);
    })
    .tween('custom', tweenWithCollisionDetection);
};

var boxes = document.querySelectorAll('ellipse');
var twween = TweenLite.to({}, 1, {});

function transformOriginRotation() {
  twween.seek(0).kill(); //reset
  twween = TweenLite.to(boxes, 1, {
    rotation: 360,
    transformOrigin: "50% 50%"
  });
  tweenCode.innerHTML = 'TweenLite.to(".enemies", 1, {rotation:360, transformOrigin:"50% 50%"});'
};



// PLAYER STUFF
var player = board.append("image")
  .attr("x", 180)
  .attr("y", 130)
  .attr("height", "50px")
  .attr("width", "50px")
  .attr("xlink:href", "http://i.giphy.com/JF98Z2md85OFi.gif");

var checkCollision = function(enemy) {
  var enemyCx = parseFloat(enemy.attr('cx'));
  var enemyCy = parseFloat(enemy.attr('cy'));
  var playerCx = parseFloat(player.attr('x'));
  var playerCy = parseFloat(player.attr('y'));

  if (Math.hypot(enemyCx - playerCx, enemyCy - playerCy) <= 25) {
    resetScore();
    renderScore();
  }
};

var tweenWithCollisionDetection = function(endData) {
  var enemy = d3.select(this);

  return function(t) {
    checkCollision(enemy);
  };
};

// MAKE THE PLAYER DRAGGABLE
var _checkInBounds = function(eventNum, isX) {
  var min = 0;
  var max;

  if (isX) {
    max = gameOptions.width - parseInt(d3.select('image').attr('width'));
  } else {
    max = gameOptions.height - parseInt(d3.select('image').attr('height'));
  }

  if (eventNum < min) {
    return 0;
  } else if (eventNum > max) {
    return max;
  } else {
    return eventNum;
  }
};

var mover = function() {
  d3.select('image')
    .attr("x", _checkInBounds(d3.event.x, true))
    .attr("y", _checkInBounds(d3.event.y, false));
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

var resetScore = function() {
  if (gameStats.score > gameStats.bestScore) {
    gameStats.bestScore = gameStats.score;
    d3.select('.high span').text(gameStats.bestScore);
  }
  gameStats.score = 0;
};

// MAKE STUFF MOVE!! :D
setInterval(transformOriginRotation, 2000);
setInterval(moveEnemies, 2000);
setInterval(increaseScore, 1000);