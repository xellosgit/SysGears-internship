[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=16391063&assignment_repo_type=AssignmentRepo)
# Тестове завдання

## Загальна інформація

Ви отримали репозиторій з файлами-шаблонами для кожного завдання. Ознайомтеся з умовами та правилами виконання завдань в цьому файлі. Після чого переходьте до виконання завдань, але звертайте увагу на файли з суфіксом .test, які дозволяють зрозуміти який результат очікуються для певних вхідних даних. Вам необов'язково розбиратися в коді тестів, тому можете просто скористатися відповідною командою, щоб побачити логи всіх тестів.

**ВАЖЛИВО**

Усі завдання повинні виконуватись лише у цьому репозиторії. Після кожного коміту автоматично запускаються базові перевірки які призначені для допомоги розуміння того чи проходять базові тести для кожного із завдань.
В рамках цього репозиторію автоматично створено пулл реквест Feedback, який і буде братись за основу при перевірці завдання. Кожен коміт у гілку main буде автоматично додаватись до цього пулл реквесту.

**Дозволено:**

- додавати нову логіку у заготовлені функції.
- створювати нові функції для розмежування логіки на свій розсуд.
- створювати нові змінні на свій розсуд.

**Заборонено:**

- викладати код тестових завдань або фінальну реалізацію у власний GitHub репозиторій (у такому випадку завдання перевірятись не буде).
- змінювати структуру папок чи файлів.
- змінювати **будь-що** окрім файлів `index.js` та `example.json` (але не забудьте повернути у початковий стан `example.json`, інакше це зламає тести).
- змінювати вміст файлів, який там є за замовчуванням.

### Початкові налаштування

Вам потрібно запустити команду `npm install` в цій папці, після чого ви зможете приступити до роботи над завданнями і використовувати всі потрібні вам команди з `package.json`

## Завдання 1

Мета - реалізувати конвертер будь-яких одиниць виміру відстані.

Для цього потрібно описати декілька функцій: `addNewUnits`, `convertDistanceUnits`, `roundDistanceValue`. Опис кожної з функцій ви можете знайти всередині `task_1/index.js`.

Співвідношення між одиницями вимірювання можуть задаватися лише за допомогою функції `addNewUnits` і не вказуватися напряму в коді. Модель додавання змінних передбачає, що не завжди буде можливо визначити коефіцієнт для необхідної пари одиниць виміру, але ви маєте зробити все можливе, щоб програма могла працювати з їх найбільшою кількістю на основі тих одиниць виміру, які були внесені за допомогою цієї функції. Окрім того, ви маєте переконатись, що нові одиниці виміру можуть бути додані використовуючи виключно існуючі в конверторі одиниці виміру (окрім першого виклику `addNewUnits`).

Також враховуйте, що співвідношення при тестування можуть не відповідати реальним, тобто в `1м` може бути не `100см`. При правильній реалізації логіки додавання, це ніяк не вплине на саму функцію конвертації.

## Завдання 2

Реалізувати функцію `runHandlers`, яка може сортувати, фільтрувати чи трансформувати дані за визначеними правилами. Вона повинна вміти працювати з **обʼєктами довільної структури**, відбирати ті, що містять ключі з відповідними значеннями, а також сортувати об'єкти за значенням, використовуючи природний порядок сортування.

Всередині файлу вам необхідно самостійно прописати логіку для правил `include`, `exclude` та `sortBy` відповідно до очікуваних результатів у файлі з тестами.

Плануючи підхід до дизайну коду, необхідно передбачити можливість розширення функціоналу шляхом додавання нових “модулів” з правилами. Важливо, щоб усі модулі мали між собою ідентичну структуру, були ізольовані один від одного та іншого коду, та взаємодіяли з основним кодом за єдиним принципом. Підключення нових обробників має здійснюватися за допомогою функції `addNewHandlers`.

## Завдання 3 <sup>\*</sup>

В деякій частині космосу є нерухомо розташований астероїд з унікальним мінералом. Для його точного знаходження був розроблений новий тип простих одноразових зондів, які під час активації один раз визначають точну відстань від себе до астероїда.

Необхідно написати функцію, яка задаватиме координати активації зондам і, отримуючи відстані від кожного з них до астероїда, знайде координати астероїда, витративши **найменшу кількість зондів**.

Для спрощення задачі припустимо, що частина космосу, в якій розташований рідкісний астероїд та можуть бути запущені зонди, обмежена ​​уявним кубом розміром **100x100x100**. А координати астероїда і зондів можуть бути лише цілими числами від 0 до 100.

## Завдання 4 <sup>\*</sup>

Необхідно реалізувати опитувальник, в якому порядок та список запитань залежить від переданої конфігурації у форматі JSON. Опитувальник повинен підтримувати лише запитання з варіантами відповідей (приклад можна знайти у файлі example.json).

Відповідей може бути будь-яка кількість, а наступні запитання в опитувальнику повинні визначатися динамічно на основі наданих відповідей - наступне запитання повинно залежати від відповіді на попереднє. Вам необхідно продумати, як буде працювати ця логіка, і розробити формат JSON конфігурації (**він буде відрізнятись від прикладу в example.json**), яка дозволить задавати правила, що пов'яжуть запитання з відповідями.

Алгорит має проходити по всім можливим шляхам опитувальника в автоматичному режимі. Результатом роботи функції має бути масив масивів, що містить всі можливі послідовності запитань з відповідями.

_\* - має бути виконанана хоча б одна з задач підмічених даним символом_

## Примітки до виконання завдань

### Як відбуватиметься перевірка

Для кожного завдання буде використано вхідні дані, **не наведені у прикладах**, тому ваше рішення повинно працювати з будь-якими даними, які відповідають формату, який очікують функції.

### Як перевірити своє рішення самостійно

В корні папки, де лежить цей файл, запустити команду відповідно до завдання. Наприклад, для першого завдання - це `npm run start:task:1` для запуску самої логіки і `npm run test:task:1` для перевірки чи проходить написаний вами код базові тести.

Під час виконання завдань, зверніть увагу на наступне:

- код необхідно розбити на логічні блоки, так щоб він був компактним, легко читався, та не містив повторень
- реалізація повинна коректно реагувати на широкий спектр можливих вхідних значень, та обробляти виняткові ситуації
- у випадках непроходження переданими даними реалізованої вами валідації, або у будь-яких випадках, які вважаються некоректними, ви маєте кидати помилку за допомогою `throw new Error;` (текст повідомлення в помилці не має значення).
- всі завдання повинні бути вирішені оптимальним чином, з найменшим використанням ресурсів пам'яті та процесора

Після закінчення виконання, надішліть, будь ласка, посилання на репозиторій з рішеннями на пошту __hr@sysgears.com__, як тему листа вкажіть: “Виконані завдання. [Прізвище Ім'я]”, (наприклад [Tarasenko_Taras]).

Додатково, до листа необхідно прикріпити резюме в \*.pdf форматі, також назване за шаблоном `<surname>_<name>` (наприклад Tarasenko_Taras.pdf).