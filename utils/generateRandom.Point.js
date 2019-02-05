const d3 = require('d3-random');
const fs = require('fs');

const rand = d3.randomNormal(0, 0.2);
const sqrt3 = Math.sqrt(3);

function range(n) {
  return Array(n).fill(1);
}

function genPointsRange(n, [offsetX, offsetY]) {
  return range(n).map(() => {
    return [rand() + offsetX, rand() + offsetY];
  });
}

function genPoints(count = 300) {
  return [
    ...genPointsRange(count, [sqrt3, 1, 0]),
    ...genPointsRange(count, [-sqrt3, 1, 1]),
    ...genPointsRange(count, [0, -1, 2]) 
  ];
}

const arraryOfPoints = Array.from({ length: 20 }, (i, d) => genPoints(100).filter((d, i) => i < 100));

fs.writeFile('./utils/clusterDots.js', `const arr = ${JSON.stringify(arraryOfPoints)}`, function (err) {
  if (err) throw err;
  console.log('Saved!');
});