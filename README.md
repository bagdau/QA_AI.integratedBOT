# QA_AI.integratedBOT
This bot can find a many issues and bugs from your project with using a website or link.


## EN
# 🤖 QA_AI.integratedBOT

**QA_AI.integratedBOT** is an automated testing tool built for conducting end-to-end (E2E) tests and accessibility audits (a11y) of web applications using Playwright and axe-core. It helps identify bugs, UI/UX issues, and accessibility violations across multiple pages, including secured areas that require authentication.

---

## 🚀 Features

- 🔍 **E2E Testing**: Automated user flow validation with Playwright.
- ♿ **Accessibility Audit**: Integration with axe-core for WCAG compliance checking.
- 🔐 **Authentication Support**: Supports login with phone number and password to access protected routes.
- 📄 **Report Generation**: Detailed logs and summaries of violations and findings.
- 🛠️ **Configurable**: Customize the list of pages and test parameters easily.

---

## 📁 Project Structure

```bash
QA_AI.integratedBOT/
├── e2e/
│   └── full-audit.spec.ts    # Main test logic
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation
└── LICENSE                   # MIT License
```

---

## ⚙️ Setup & Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bagdau/QA_AI.integratedBOT.git
   cd QA_AI.integratedBOT
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the tests:**

   ```bash
   npx playwright test
   ```

   To run with a visible browser:

   ```bash
   npx playwright test --headed
   ```

---

## 🔧 Configuration

Before running, set your login credentials in `full-audit.spec.ts`:

```ts
const PHONE = 'YOUR_PHONE_NUMBER';
const PASSWORD = 'YOUR_PASSWORD';
```

You can also customize the `protectedPages` array to include URLs you want to test.

---

## 📊 Reports

After test execution, results and accessibility reports will be saved in the `test-results/` directory, including `.json` and `.md` files with all issues found.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contribution

Contributions, bug fixes, and improvements are welcome! Please open an [Issue](https://github.com/bagdau/QA_AI.integratedBOT/issues) or submit a Pull Request.

---

Let me know if you'd like a version in another language, PDF format, or GitHub wiki setup.  


## RU

# 🤖 QA_AI.integratedBOT

**QA_AI.integratedBOT** — это инструмент автоматизированного тестирования, предназначенный для проведения end-to-end (E2E) тестов и аудита доступности (a11y) веб-приложений с использованием Playwright и библиотеки axe-core. Он помогает выявлять ошибки, проблемы UI/UX и нарушения стандартов доступности на различных страницах, включая защищённые области, требующие авторизации.

---

## 🚀 Возможности

- 🔍 **E2E тестирование**: автоматическая проверка пользовательских сценариев с помощью Playwright.
- ♿ **Аудит доступности**: интеграция с axe-core для проверки соответствия стандарту WCAG.
- 🔐 **Поддержка авторизации**: возможность входа в систему с номером телефона и паролем для анализа защищённых маршрутов.
- 📄 **Генерация отчётов**: подробные логи и сводки нарушений.
- 🛠️ **Гибкая настройка**: простой способ изменить список тестируемых страниц и параметры сканирования.

---

## 📁 Структура проекта

```bash
QA_AI.integratedBOT/
├── e2e/
│   └── full-audit.spec.ts    # Основная логика тестирования
├── package.json              # Зависимости и команды
├── README.md                 # Документация проекта
└── LICENSE                   # Лицензия MIT
```

---

## ⚙️ Установка и запуск

1. **Клонировать репозиторий:**

   ```bash
   git clone https://github.com/bagdau/QA_AI.integratedBOT.git
   cd QA_AI.integratedBOT
   ```

2. **Установить зависимости:**

   ```bash
   npm install
   ```

3. **Запустить тесты:**

   ```bash
   npx playwright test
   ```

   Для запуска с открытием браузера:

   ```bash
   npx playwright test --headed
   ```

---

## 🔧 Настройка

Перед запуском укажи свои учётные данные для входа в файле `full-audit.spec.ts`:

```ts
const PHONE = 'ВАШ_НОМЕР_ТЕЛЕФОНА';
const PASSWORD = 'ВАШ_ПАРОЛЬ';
```

Также можешь изменить массив `protectedPages`, чтобы указать URL-адреса для анализа.

---

## 📊 Отчёты

После завершения тестов результаты и отчёты об аудитах доступности сохраняются в папке `test-results/`, включая `.json` и `.md` файлы с выявленными проблемами.

---

## 📜 Лицензия

Проект распространяется под лицензией [MIT](LICENSE).

---

## 🤝 Вклад

Приветствуются любые предложения, улучшения и исправления! Открывайте [Issue](https://github.com/bagdau/QA_AI.integratedBOT/issues) или создавайте Pull Request.

---

Если нужно, могу подготовить PDF-версию, GitHub Wiki или английскую версию README. 
