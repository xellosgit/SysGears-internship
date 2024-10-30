const unitMap = {};

/**
 * Валідує наявність переданих одиниць виміру
 * @param {string} unit Назва одиниці виміру
 */
const validateUnitExists = (unit) => {
  if (!unitMap[unit]) {
    throw new Error(`Unit ${unit} is not defined in the converter`);
  }
};

/**
 * Додає нові одиниці виміру і їх коефіцієнти до структури даних
 * @param {string} firstUnit
 * @param {string} secondUnit
 * @param {number} coefficient Коефіцієнт, який визначає відношення першої одиниці виміру до другої
 */
const addNewUnit = (firstUnit, secondUnit, coefficient) => {
  if (coefficient <= 0) {
    throw new Error("Coefficient must be a positive number");
  }

  if (!unitMap[firstUnit]) unitMap[firstUnit] = {};
  if (!unitMap[secondUnit]) unitMap[secondUnit] = {};

  unitMap[firstUnit][secondUnit] = coefficient;
  unitMap[secondUnit][firstUnit] = 1 / coefficient;
};

/**
 * Конвертує значення однієї одиниці виміру в іншу
 * @param {string} convertFrom Назва одиниці виміру, з якої треба конвертувати
 * @param {number} value Числове значення одиниці виміру з першого параметру
 * @param {string} convertTo Назва одиниці виміру до якої треба конвертувати
 * @returns {number}
 */
const convertDistanceUnits = (convertFrom, value, convertTo) => {
  if (!convertFrom || !convertTo) {
    throw new Error("Both units must be provided");
  }

  if (typeof value !== "number" || value < 0) {
    throw new Error("Value must be a positive number");
  }

  if (convertFrom === convertTo) return value;

  validateUnitExists(convertFrom);
  validateUnitExists(convertTo);

  const visited = new Set();
  const queue = [[convertFrom, 1]];

  while (queue.length > 0) {
    const [currentUnit, currentCoefficient] = queue.shift();

    if (currentUnit === convertTo) {
      return parseFloat((value * currentCoefficient).toFixed(2)); // Округлюємо результат до 2 знаків
    }

    visited.add(currentUnit);

    for (const [nextUnit, nextCoefficient] of Object.entries(
      unitMap[currentUnit] || {}
    )) {
      if (!visited.has(nextUnit)) {
        queue.push([nextUnit, currentCoefficient * nextCoefficient]);
      }
    }
  }

  throw new Error(`Cannot convert from ${convertFrom} to ${convertTo}`);
};

/**
 * Округлює передане значення до потрібної кількості знаків після коми
 * @param {number} value Значення, яке треба округлити
 * @param {number} decimalPointsNumber Кількість знаків після коми
 * @returns {number}
 */
const roundDistanceValue = (value, decimalPointsNumber) => {
  if (typeof value !== "number" || typeof decimalPointsNumber !== "number") {
    throw new Error("Both value and decimal points number must be numbers");
  }

  return parseFloat(value.toFixed(decimalPointsNumber));
};

module.exports = {
  addNewUnit,
  convertDistanceUnits,
  roundDistanceValue,
};
