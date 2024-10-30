let functions = require(".");

beforeEach(() => {
  // we need this to reset state of any additional vars and functions, that can be created in index.js
  jest.resetModules();
  jest.restoreAllMocks();
  functions = require("./index.js");
});

describe("Базові тести", () => {
  it("Опитувальник повертає результат у правильному форматі", () => {
    const result = functions.testQuestioner();

    expect(result).toContainEqual([
      { "What is your marital status?": "Single" },
      { "Are you planning on getting married next year?": "Yes/No" },
    ]);

    expect(result).toContainEqual([
      { "What is your marital status?": "Married" },
      { "How long have you been married?": "Less than a year" },
    ]);

    expect(result).toContainEqual([
      { "What is your marital status?": "Married" },
      { "How long have you been married?": "More than a year" },
      { "Have you celebrated your one year anniversary?": "Yes/No" },
    ]);
  });
});
