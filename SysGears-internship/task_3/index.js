/**
 * @typedef Point
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * @typedef Result
 * @type {object}
 * @property {Point[]} probes
 * @property {Point} location
 */

/**
 * Генерує випадкове число в заданому діапазоні
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const getRandomNumber = (min, max) => {
  if (typeof min !== "number" || typeof max !== "number" || min > max) {
    throw new Error("Invalid range for random number generation");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Генерує випадкові координати
 * @returns {Point}
 */
const getRandomCoordinates = () => ({
  x: getRandomNumber(0, 100),
  y: getRandomNumber(0, 100),
  z: getRandomNumber(0, 100),
});

/**
 * Створює астероїд з випадковими координатами
 * @returns {Point}
 */
const createAsteroid = () => {
  return getRandomCoordinates();
};

/**
 * Обчислює відстань між двома точками в просторі
 * @param {Point} point1
 * @param {Point} point2
 * @returns {number}
 */
const getDistanceBetweenPoints = (point1, point2) => {
  if (!isValidPoint(point1) || !isValidPoint(point2)) {
    throw new Error("Invalid points for distance calculation");
  }
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) +
      Math.pow(point1.y - point2.y, 2) +
      Math.pow(point1.z - point2.z, 2)
  );
};

/**
 * Валідує, чи є точка коректною
 * @param {Point} point
 * @returns {boolean}
 */
const isValidPoint = (point) => {
  return (
    point &&
    typeof point.x === "number" &&
    typeof point.y === "number" &&
    typeof point.z === "number" &&
    point.x >= 0 &&
    point.x <= 100 &&
    point.y >= 0 &&
    point.y <= 100 &&
    point.z >= 0 &&
    point.z <= 100
  );
};

/**
 * Обчислює координати астероїда за допомогою трилатерації
 *
 * @param {Point} p1
 * @param {Point} p2
 * @param {Point} p3
 * @param {number} d1
 * @param {number} d2
 * @param {number} d3
 * @returns {Point}
 */
const trilateration = (p1, p2, p3, d1, d2, d3) => {
  if (
    !isValidPoint(p1) ||
    !isValidPoint(p2) ||
    !isValidPoint(p3) ||
    typeof d1 !== "number" ||
    typeof d2 !== "number" ||
    typeof d3 !== "number"
  ) {
    throw new Error("Invalid input for trilateration");
  }

  const x1 = p1.x,
    y1 = p1.y,
    z1 = p1.z;
  const x2 = p2.x,
    y2 = p2.y,
    z2 = p2.z;
  const x3 = p3.x,
    y3 = p3.y,
    z3 = p3.z;

  const A = 2 * (x2 - x1);
  const B = 2 * (y2 - y1);
  const C = 2 * (z2 - z1);
  const D = 2 * (x3 - x1);
  const E = 2 * (z3 - z1);

  const G =
    Math.pow(d1, 2) -
    Math.pow(d2, 2) -
    Math.pow(x1, 2) +
    Math.pow(x2, 2) -
    Math.pow(y1, 2) +
    Math.pow(y2, 2) -
    Math.pow(z1, 2) +
    Math.pow(z2, 2);
  const H =
    Math.pow(d1, 2) -
    Math.pow(d3, 2) -
    Math.pow(x1, 2) +
    Math.pow(x3, 2) -
    Math.pow(y1, 2) +
    Math.pow(y3, 2) -
    Math.pow(z1, 2) +
    Math.pow(z3, 2);

  const x = (G * E - H * C) / (A * E - D * C);
  const y = (G - A * x) / B;
  const zSquared = Math.pow(d1, 2) - Math.pow(x - x1, 2) - Math.pow(y - y1, 2);

  const z = zSquared >= 0 ? Math.sqrt(zSquared) : 0;

  return {
    x: Math.max(0, Math.min(Math.round(x), 100)),
    y: Math.max(0, Math.min(Math.round(y), 100)),
    z: Math.max(0, Math.min(Math.round(z), 100)),
  };
};

/**
 * Пошук місцезнаходження астероїда
 * @returns {Result}
 */
const findAsteroidLocation = () => {
  const asteroid = createAsteroid();

  // Використовуємо мінімум 3 зонди, відповідно до завдання
  const probes = [
    getRandomCoordinates(),
    getRandomCoordinates(),
    getRandomCoordinates(),
  ];

  // Отримуємо відстані від кожного зонда до астероїда
  const distances = probes.map((probe) =>
    getDistanceBetweenPoints(probe, asteroid)
  );

  // Обчислюємо координати астероїда
  const location = trilateration(
    probes[0],
    probes[1],
    probes[2],
    distances[0],
    distances[1],
    distances[2]
  );

  return {
    location,
    probes,
  };
};

module.exports = {
  getRandomNumber,
  getRandomCoordinates,
  createAsteroid, 
  getDistanceBetweenPoints,
  findAsteroidLocation,
};

console.log(findAsteroidLocation());
