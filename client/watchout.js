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
                             .style('background-color', 'blue')


// ENEMY STUFF
// create enemies
var enemies = board.selectAll('.enemies')
                    .data(d3.range(30))
                    .enter()
                    .append('svg:circle')
                    .attr('cx', function(){
                    return(Math.random() * gameOptions.width)
                    })
                    .attr('cy', function(){
                    return(Math.random() * gameOptions.width)
                    })
                    .attr('r',10)
                    .attr('fill', 'red');

// move fn
var moveEnemies = function() {
  enemies.transition()
       .duration(500)
       .attr('cx', function(){
         return(Math.random() * gameOptions.width)
       })
       .attr('cy', function(){
         return(Math.random() * gameOptions.width)
       })
};

setInterval(moveEnemies, 2000);


// PLAYER STUFF
var player = board.append("circle")
  .attr('cx', 150)
  .attr('cy', 100)
  .attr('r', 10)
  .attr('fill', 'black');
