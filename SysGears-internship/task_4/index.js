const data = require("./example.json");

/**
 * Перевіряє валідність даних опитувальника
 * @param {number} questionId - ID питання
 */
const validateQuestion = (questionId) => {
  if (!data.questions[questionId - 1]) {
    throw new Error(`Question with ID ${questionId} not found.`);
  }
};

/**
 * Проходить по всіх можливих шляхах опитувальника і будує шляхи запитань з відповідями
 * @returns {Object.<string,string>[][]}
 */
const testQuestioner = () => {
  const allPaths = [];

  /**
   * Рекурсивно проходить опитувальник, формуючи шляхи
   * @param {number} questionId - ID поточного питання
   * @param {Array} path - поточний шлях відповідей
   */
  const traverse = (questionId, path) => {
    validateQuestion(questionId);

    const question = data.questions[questionId - 1];
    const answers = question.answers;

    const shouldCombineAnswers =
      answers.length === 2 && answers.every((ans) => !ans.nextQuestionId);

    if (shouldCombineAnswers) {
      const combinedAnswerText = answers.map((a) => a.text).join("/");
      allPaths.push([...path, { [question.question]: combinedAnswerText }]);
    } else {
      for (const answer of answers) {
        const newPath = [...path, { [question.question]: answer.text }];

        if (answer.nextQuestionId) {
          traverse(answer.nextQuestionId, newPath);
        } else {
          allPaths.push(newPath);
        }
      }
    }
  };

  traverse(1, []);

  return allPaths;
};

module.exports = { testQuestioner };

console.log(testQuestioner());
