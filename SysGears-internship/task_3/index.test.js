let functions = require("./index.js");

beforeEach(() => {
  // we need this to reset state of any additional vars and functions, that can be created in index.js
  jest.resetModules();
  jest.restoreAllMocks();
  functions = require("./index.js");
});

describe("Базові тести", () => {
  it("Генерує випадкове число від min до max", () => {
    const result = functions.getRandomNumber(5, 7);

    expect(result).toBeGreaterThanOrEqual(5);
    expect(result).toBeLessThanOrEqual(7);
  });

  it("Генерує точку з випадковими координатами", () => {
    const { x, y, z } = functions.getRandomCoordinates();

    expect(x).toBeDefined();
    expect(y).toBeDefined();
    expect(z).toBeDefined();
  });

  it("Повертає дистанцію між двома точками", () => {
    const result = functions.getDistanceBetweenPoints(
      { x: 1, y: 6, z: 0 },
      { x: 10, y: 6, z: 0 }
    );

    expect(result).toBe(9);
  });

  it("Повертає правильний формат результату", () => {
    const result = functions.findAsteroidLocation();

    expect(result).toHaveProperty("location");
    expect(result).toHaveProperty("probes");
  });
});
