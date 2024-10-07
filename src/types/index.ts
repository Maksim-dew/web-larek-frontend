
// Cписок карточек
// export interface IListData {
//   items: IProduct[]; //Все карточки
//   getCard(cardId: IProduct): void; //Получение карточки по id
// }

export type category = 'другое' | 'софт-скил' | 'дополнительное' | 'кнопка' | 'хард-скил'; //got

// карточка
export interface IProduct { //got
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

//карточка в списке на главной
export type IProductList = Pick<IProduct, 'title' | 'image' | 'category' | 'price'>; 

//карточка в списке корзины
export type IProductBascket = Pick<IProduct, 'id' | 'title' | 'price'>; 

// export type payment = 'online' | 'offline';

//Запрос на заказ
export interface IOrder  extends IOrderForm, IContactsForm {
  items: IProductBascket[];
  total: number;
}

export interface IContactsForm { 
  email: string;
  phone: string;
}

export interface IOrderForm {
  payment: string;
  address: string;
}

export interface IOrderSuccess {
  id: string;
  total: number;
}

export interface IOrderResult extends IOrder {
  id: string;
  error?: string
}

export type ApiPostMethods = 'POST' | 'GET'; //got

export interface IApi { //got
  baseUrl: string; 
  getProductList: () => Promise<IProduct[]>;
  getProduct: (id: string) => Promise<IProduct>;
  createOrder: (order: IOrder) => Promise<IOrderSuccess>;
}

export interface IAppState { //got
  catalog: IProduct[];
  selectedProduct: IProduct | null;
  order: IOrder | null;
  basket: string[] | null;
  preview: string | null;
  formErrors: FormErrors;
}


// Тип для обобщенной структуры ошибок в форме
export type FormErrors = Partial<Record<keyof IOrder, string>>; //got

export interface IActions {
  onClick: (event: MouseEvent) => void;
}