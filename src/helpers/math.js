export function equilateral(sideLength, centerPosition) {
  var points,
      pi = 3.141592653589793238462643383, // more accuracy
      cen = centerPosition,
      halfSide = sideLength / 2,

      // Inner innerHypotenuse angle = 120, hyp = half side. Cos 120 * adjacent
      innerHypotenuse = halfSide * (1 / Math.cos(30 * pi / 180));

  // SqRt(Hyp^2 - Adj^2) pythagoras
  const innerOpposite = halfSide * (1 / Math.tan(60 * pi / 180));

  const leftVertex = [];
  const rightVertex = [];
  const topVertex = [];

  leftVertex[0] = cen[0] - halfSide;
  leftVertex[1] = cen[1] + innerOpposite;

  rightVertex[0] = cen[0] + halfSide;
  rightVertex[1] = cen[1] + innerOpposite;

  topVertex[0] = cen[0];
  topVertex[1] = cen[1] - innerHypotenuse;

  points = topVertex[0] + ',' + topVertex[1] +
      ' ' + rightVertex[0] + ',' + rightVertex[1] +
      ' ' + leftVertex[0] + ',' + leftVertex[1];

      return points;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
