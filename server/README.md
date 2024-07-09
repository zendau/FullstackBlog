# Серверная часть

## Установка зависимостей
```sh
cd server
npm install
# или
yarn install
```

## Запуск в режиме разработки
```sh
cd server
npm run dev
# или
yarn dev

# Для запуска дебага
npm run debug
```
## Запуск в режиме тестирования
```sh
cd server
npm run test
# или
npm run test:e2e
```

## Переменные окружения

```env
PORT=8080
DB_URL=mongodb://localhost:27017/jwt

BCRYPT_SALT=3

JWT_ACCESS_SECRET=jwt-secret-key
JWT_ACCESS_EXPIRES=30m

JWT_REFRESH_SECRET=jwt-refresh-secret-key
JWT_REFRESH_EXPIRES=30d

CLIENT_URL=http://localhost:3000

MAILER_HOST=localhost
MAILER_PORT=1025
MAILER_USER=user1
MAILER_PASS=pass1
MAILER_FROM=ReactBlog@example.com

FILE_FOLDER=storage/files
```
**Описание переменных**:
  - PORT: Порт, на котором будет запущен сервер.
  - DB_URL: URL для подключения к базе данных MongoDB.
  - BCRYPT_SALT: Количество раундов для генерации соли bcrypt.
  - JWT_ACCESS_SECRET: Секретный ключ для подписи JWT токенов доступа.
  - JWT_ACCESS_EXPIRES: Время жизни JWT токена доступа.
  - JWT_REFRESH_SECRET: Секретный ключ для подписи JWT токенов обновления.
  - JWT_REFRESH_EXPIRES: Время жизни JWT токена обновления.
  - CLIENT_URL: URL клиентского приложения.
  - MAILER_HOST: Хост почтового сервера.
  - MAILER_PORT: Порт почтового сервера.
  - MAILER_USER: Имя пользователя для почтового сервера.
  - MAILER_PASS: Пароль для почтового сервера.
  - MAILER_FROM: Email адрес отправителя.
  - FILE_FOLDER: Путь к папке для хранения файлов.

## Документация
### Доступ к Swagger UI
После запуска серверной части Swagger UI будет доступен по адресу:
```
http://localhost:3000/api-docs
```
### Структура проекта
**server**: Серверная часть приложения на Express.js.
  - **__test__**: Тесты.
  - **aggregation**: Агрегации данных.
  - **constants**: Константы.
  - **controllers**: Контроллеры роутов.
  - **dtos**: Data Transfer Objects.
  - **exceptions**: Обработка исключений.
  - **libs**: Библиотеки.
  - **middlewares**: Middleware.
  - **models**: Модели данных.
  - **repositories**: Репозитории для работы с данными.
  - **routes**: Роуты Express.
  - **services**: Сервисы бизнес-логики.
  - **storage**: Работа с файловым хранилищем.
  - **utils**: Вспомогательные утилиты.
  - **validations**: Валидации входных данных.