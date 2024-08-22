
// Cписок карточек
export interface IListData {
  items: ICard[]; //Все карточки
  getCard(cardId: ICard): void; //Получение карточки по id
}

export type category = 'другое' | 'софт-скил' | 'дополнительное' | 'кнопка' | 'хард-скил';

// карточка
export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

//карточка в списке на главной
export type ICardList = Pick<ICard, 'title' | 'image' | 'category' | 'price'>;

export type ICardBascket = Pick<ICard, 'id' | 'title' | 'price'>;

export type payment = 'online' | 'offline';

//Запрос на заказ
export interface IOrderBascket {
  payment: payment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: ICardBascket[];
  validateEmail(email: string): boolean;
  validatePhoneNumber(phone: string): boolean;
}

export interface IBascketData {
  items: ICardBascket[];
  addItem(id: ICard): void;
  removeItem(id: ICard): void;
}


//Надо ли тут вообще это
// Ошибку
export interface IErrorResponse {
  error: string;
}

// 200
export interface ISuccessResponse {
  id: string;
  total: number;
}