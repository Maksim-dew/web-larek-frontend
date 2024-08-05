
// карточка
interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

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

// Ответ - список карточек
interface IlistCardResponse<T> {
  total: number; //кол-во карточек
  items: ICard[]; //элементы карточек
}


type payment = 'online' | 'offline';

//Запрос на заказ
interface IOrderRequest {
  payment: payment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

// Ответ для создания заказа
interface IOrderResponse {
  id: string;
  total: number;
  price: number | null;
}

// Ответ на ошибку
interface IErrorResponse {
  error: string;
}

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

type CategoryType = 'другое' | 'софт-скил' | 'дополнительное' | 'кнопка' | 'хард-скил';