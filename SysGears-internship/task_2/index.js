// Об'єкт для зберігання зареєстрованих обробників
const handlers = {};

/**
 * Додає новий обробник, який буде взаємодіяти з даними
 * @param {string} name Назва обробника
 * @param {(data:unknown[], params:unknown)=>unknown[]} handler Функція, яка буде оброблювати дані
 */
const addNewHandler = (name, handler) => {
  handlers[name] = handler;
};

/**
 * Запускає всі додані обробники на переданих даних і повертає відповідний результат
 * @param {unknown[]} data
 * @param {Object.<string, unknown[]>} conditions
 *
 * @return {unknown[]}
 */
const runHandlers = (data, conditions) => {
  if (!Array.isArray(data)) {
    throw new Error("Expected data to be an array");
  }

  // Перевіряємо, чи є умови. Якщо умов немає, повертаємо початкові дані
  if (!conditions || Object.keys(conditions).length === 0) {
    return data;
  }

  let result = [...data];

  // Проходимо по всім умовам (conditions)
  for (const [condition, params] of Object.entries(conditions)) {
    // Перевіряємо, чи зареєстрований обробник для цієї умови
    if (!handlers[condition]) {
      throw new Error(`Handler for condition ${condition} is not defined`);
    }

    // Виконуємо відповідний обробник
    result = handlers[condition](result, params);
  }

  return result;
};

// Перевірка відповідності об'єкта include та exclude
const matchCondition = (item, condition) =>
  Object.keys(condition).every((key) => item[key] === condition[key]);

// Реєструємо обробники
addNewHandler("include", (data, conditions) =>
  data.filter((item) =>
    conditions.some((condition) => matchCondition(item, condition))
  )
);

addNewHandler("exclude", (data, conditions) => {
  const excludeLogic = conditions.type === "AND" ? "every" : "some";
  return data.filter(
    (item) =>
      !conditions[excludeLogic]((condition) => matchCondition(item, condition))
  );
});

addNewHandler("sortBy", (data, keys) => {
  return [...data].sort((a, b) => {
    for (const key of keys) {
      const aValue = a[key];
      const bValue = b[key];
      let comparison = 0;

      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      if (comparison !== 0) return comparison;
    }
    return 0;
  });
});

// Додаємо обробник для трансформації даних
addNewHandler("transform", (data) => {
  return data.map((item) => ({ ...item, transformed: true }));
});

// Експортуємо функції
module.exports = {
  addNewHandler,
  runHandlers,
};
