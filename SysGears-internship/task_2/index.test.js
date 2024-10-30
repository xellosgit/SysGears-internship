import example from "./example.json";

let functions = require("./index.js");

beforeEach(() => {
  // we need this to reset state of any additional vars and functions, that can be created in index.js
  jest.resetModules();
  jest.restoreAllMocks();
  functions = require("./index.js");
});

const testTable = [
  {
    description: "Працює обробник include",
    conditions: { include: [{ name: "John" }] },
    expectedResult: [
      { name: "John", email: "john2@mail.com" },
      { name: "John", email: "john1@mail.com" },
    ],
  },
  {
    description: "Працює обробник sortBy",
    conditions: { sortBy: ["email"] },
    expectedResult: [
      { name: "Jane", email: "jane@mail.com" },
      { name: "John", email: "john1@mail.com" },
      { name: "John", email: "john2@mail.com" },
    ],
  },
  {
    description: "Працює декілька обробників одночасно: include та sortBy",
    conditions: { include: [{ name: "John" }], sortBy: ["email"] },
    expectedResult: [
      { name: "John", email: "john1@mail.com" },
      { name: "John", email: "john2@mail.com" },
    ],
  },
  {
    description: "Працює обробник exclude за принципом АБО",
    conditions: {
      exclude: [{ name: "John" }, { email: "john2@mail.com" }],
    },
    expectedResult: [{ name: "Jane", email: "jane@mail.com" }],
  },
  {
    description: "Працює обробник exclude за принципом ТА",
    conditions: {
      exclude: [{ name: "John", email: "john2@mail.com" }],
    },
    expectedResult: [
      { name: "John", email: "john1@mail.com" },
      { name: "Jane", email: "jane@mail.com" },
    ],
  },
];

describe("Базові тести", () => {
  testTable.map(({ description, conditions, expectedResult }) => {
    it(description, () => {
      const result = functions.runHandlers(example, conditions);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  it("Дозволяє додати і використати новий обробник", () => {
    functions.addNewHandler("extend", (data) => {
      // Ця реалізація не є показовою і використовується тільки для демонстрації роботи додавання нового обробника
      return data.map((item) => {
        if (item.name === "Jane") {
          return { extended: true, ...item };
        }

        return item;
      });
    });

    const conditions = { extend: [{ name: "Jane" }] };

    const result = functions.runHandlers(example, conditions);

    expect(result).toStrictEqual([
      { name: "John", email: "john2@mail.com" },
      { name: "John", email: "john1@mail.com" },
      { name: "Jane", email: "jane@mail.com", extended: true },
    ]);
  });
});
