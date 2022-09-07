[![Tests 14 sprint](https://github.com/AxlLove/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/AxlLove/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд



# API для проекта mesto-react

## **Реализованный функционал Back-end:**
- Регистрация/авторизация/редактирование пользователей (с валидацией всех полей)
- Добавление/удаление лайка 
- Сохранение карточки в БД
- Логирование работы сервера

### Роуты:

### возвращает информацию о текущем пользователе
GET /users/me

### возвращает информацию о всех пользователях
GET /users/me

### возвращает информацию о  пользователе по id
GET /users/:userId

### обновляет информацию о пользователе (Имя описание)
PATCH /users/me

### обновляет информацию о аватаре (url)
PATCH /users/me/avatar


### возвращает все карточки
GET /cards

### добавляет карточку (Имя, url)
POST /cards

### удаляет сохранённый карточку по id
DELETE /cards/_id

### Cтавит лайк карточке (id)
PUT /cards/:cardId/likes

### Удаляет лайк карточке (id)
DELETE /cards/:cardId/likes

### Регистрация пользователя
POST /signup

### Авторизация пользователя
POST /signin

### Запуск

Используйте 'npm start' для запуска приложения

## Используемые навыки и технологии
* node.js
* express.js
* mongoDB
* JWT
* CORS



### Ссылка на сервер и публичный ip

https://axlstar.mesto.nomoredomains.xyz - frontend
https://api.axlstar.mesto.nomoreparties.sbs - backend
