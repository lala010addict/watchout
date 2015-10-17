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
// create enemies
var mouse = board.select('svg')
  .append("circle")
  .attr('cx', 150)
  .attr('cy', 100)
  .attr('r', 10)
  .attr('fill', 'black');

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

//create

// var mouse = board.selectAll('.mouse')
// .append("svg:mouse")
//  .attr('x', 150)
//   .attr('y', 100)
//  .attr('r',10)
// .attr('fill', 'pink');

// var getNewEnemyData = function() {
//   // Refactor to use _.range:
//   [0,1,2,3,4,5].map(function(i) {
//     return {
//       id: i,
//       x: Math.random() * gameOptions.width,
//       y: Math.random() * gameOptions.height
//     };
//   });
// };
// render


// move enemies

// create player
  // make draggable

// detect enemy touch

// track score
// _.range(0, gameOptions.nEnemies) => [0, 1, 2, 3, 4, 5...29]


//   _.range(0,gameOptions.nEnemies).map (i) ->
//     {
//       id: i
//       x: Math.random()*100
//       y: Math.random()*100
//     }