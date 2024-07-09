# Клиентская часть

## Установка зависимостей
```sh
cd client
npm install
# или
yarn install
```

## Запуск в режиме разработки
```sh
cd client
npm run dev
# или
yarn dev
```
## Запуск в режиме тестирования
```sh
cd client
npm run test
# или
yarn test
```

## Переменные окружения
```env
VITE_API=http://localhost:8080
VITE_SITE_NAME='Site Blog'
```

**Описание переменных**:
 - VITE_API: URL API сервера.
 - VITE_SITE_NAME: Название сайта.


## Документация
### Структура проекта
**client**: Клиентская часть приложения на Nuxt.js.
  - **composables**: Повторно используемые Vue.js композиции.
  - **layouts**: Шаблоны макетов страниц.
  - **middleware**: Middleware для обработки запросов.
  - **pages**: Роуты страниц.
  - **stores**: Хранилища состояния приложения.
  - **utils**: Вспомогательные функции.