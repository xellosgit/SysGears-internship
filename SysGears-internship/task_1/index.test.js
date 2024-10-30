let functions = require("./index.js");

beforeEach(() => {
  // we need this to reset state of any additional vars and functions, that can be created in index.js
  jest.resetModules();
  jest.restoreAllMocks();
  functions = require("./index.js");

  functions.addNewUnit("km", "m", 1000);
  functions.addNewUnit("yd", "km", 0.0009144);
  functions.addNewUnit("yd", "ft", 3);
});

describe("Базові тести", () => {
  it("Конвертує кілометри в фути", () => {
    const result = functions.convertDistanceUnits("km", 1, "ft");

    expect(result).toBe(3280.84);
  });

  it("Конвертує ярди в метри з округленням до сотих", () => {
    const result = functions.convertDistanceUnits("yd", 1, "m");

    expect(result).toBe(0.91);
  });

  it("Видає помилку для недоданих одиниць виміру", () => {
    expect(() => functions.convertDistanceUnits("ft", 1, "dm")).toThrow(Error);
  });

  it("Видає помилку для неповʼязаних з іншими одиниць виміру", () => {
    functions.addNewUnit("mm", "inch", 0.0393700787);

    expect(() => functions.convertDistanceUnits("mm", 100000, "ft")).toThrow(
      Error
    );
  });
});
