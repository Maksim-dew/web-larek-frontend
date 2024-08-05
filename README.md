# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Классы и интерфейсы
### 1. Класс Card

Класс Card реализует интерфейс ICard и представляет собой карточку с информацией о товаре.
```
class Card implements ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;

  constructor(data: ICard) {
    this.id = data.id;
    this.description = data.description;
    this.title = data.category;
    this.category = data.category;
    this.price = data.price;
  }
}
```
- Интерфейс ICard cодержит:
```
id: string — уникальный идентификатор карточки.
description: string — описание карточки.
image: string — ссылка на изображение карточки.
title: string — заголовок карточки.
category: CategoryType — категория карточки.
price: number | null — цена карточки, может быть null.
```
Конструктор принимает объект типа ICard и инициализирует свойства класса.

### 2. Интерфейс IListCardResponse
Интерфейс для ответа, содержащего список карточек.
```
interface IListCardResponse {
  total: number; // Количество карточек
  items: ICard[]; // Массив карточек
}
```
- Поля
```
total: number — общее количество карточек.
items: ICard[] — массив карточек.
```
### 3. Тип Payment
Тип, определяющий способы оплаты:
```
type Payment = 'online' | 'offline';
```
### 4. Интерфейс IOrderRequest
Интерфейс для запроса на создание заказа.
```
interface IOrderRequest {
  payment: Payment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
```
- Поля
```
payment: Payment — способ оплаты.
email: string — email покупателя.
phone: string — телефон покупателя.
address: string — адрес доставки.
total: number — общая сумма заказа.
items: string[] — массив идентификаторов товаров.
```
### 5. Интерфейс IOrderResponse
Интерфейс для ответа при создании заказа.
```
interface IOrderResponse {
  id: string;
  total: number;
  price: number | null;
}
```
- Поля
```
id: string — уникальный идентификатор заказа.
total: number — общая сумма заказа.
price: number | null — цена заказа, может быть null.
```
### 6. Интерфейс IErrorResponse
Интерфейс для ответа об ошибке.
```
interface IErrorResponse {
  error: string;
}
```
- Поля
```
error: string — сообщение об ошибке.
```
### 7. Класс OrderResponse
Класс OrderResponse реализует интерфейсы IOrderResponse и IErrorResponse, представляя собой ответ на создание заказа, который может содержать ошибку.
```
class OrderResponse implements IOrderResponse, IErrorResponse  {
  id: string;
  total: number;
  price: number | null;
  error: string;

  constructor(data: IOrderResponse & IErrorResponse) {
    this.id = data.id;
    this.total = data.total;
    this.price = data.price;
    this.error = data.error;
  }
}
```
Конструктор - gринимает объект типа ```IOrderResponse & Partial<IErrorResponse>``` и инициализирует свойства класса.
### 8. Тип CategoryType
Тип, определяющий категории карточек:
```
type CategoryType = 'другое' | 'софт-скил' | 'дополнительное' | 'кнопка' | 'хард-скил';
```
