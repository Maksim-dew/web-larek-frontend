import './scss/styles.scss';
import { API_URL, CDN_URL, PaymentMethod } from './utils/constants';
import { ActionApi } from "./components/ActionApi";
import { EventEmitter } from './components/base/events';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { AppState, CatalogChangeEvent, Product } from './components/AppState';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { IContactsForm, IOrder, IOrderForm } from './types';
import { Basket } from './components/Basket';
import { OrderForm } from './components/OrderForm';
import { ContactsForm } from './components/ContactsForm';
import { Success } from './components/Success';

const events = new EventEmitter();
const api = new ActionApi(CDN_URL, API_URL);

const page = new  Page(
    document.querySelector('.gallery'), events
);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

const cardCatalogElm = ensureElement<HTMLTemplateElement>('#card-catalog');
const contactsElm = ensureElement<HTMLTemplateElement>('#contacts');
const successElm = ensureElement<HTMLTemplateElement>('#success');
const cardPreviewElm = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketElm = ensureElement<HTMLTemplateElement>('#card-basket');
const basketElm = ensureElement<HTMLTemplateElement>('#basket');
const orderElm = ensureElement<HTMLTemplateElement>('#order');

// Модель данных приложения
const app = new AppState({}, events);

// Глобальные контейнеры
const pageContainer = new Page(document.body, events);
const modalContainer = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const success = new Success(cloneTemplate(successElm), {
  onClick: () => {
    modalContainer.close();
  }
});

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketElm), events);
const order = new OrderForm(cloneTemplate(orderElm), events, {
  onClick: (ev: Event) => events.emit('payment:toggle', ev.target)
});
const contact = new ContactsForm(cloneTemplate(contactsElm), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Изменились элементы каталога
events.on<CatalogChangeEvent>('items:changed', () => {
    pageContainer.gallery = app.catalog.map(item => {
      const card = new Card(cloneTemplate(cardCatalogElm), {
        onClick: () => events.emit('card:select', item)
      });
      return card.render({
        title: item.title,
        image: item.image,
        price: item.price,
        category: item.category
      })
    })
  });

  // Отправлена форма заказа
  events.on('order:submit', () => {
    modalContainer.render({
      content: contact.render({
        email: '',
        phone: '',
        valid: false,
        errors: []
      })
    })
  })

  // Изменилось состояние валидации формы
  events.on('formErrors:change', (errors: Partial<IOrder>) => {
    const { payment, address, email, phone } = errors;
    order.valid = !payment && !address;
    contact.valid = !email && !phone;
    order.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
    contact.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
  });

  events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
    app.setOrderField(data.field, data.value)
  })
  
  events.on(/^contacts\..*:change/, (data: { field: keyof IContactsForm, value: string }) => {
    app.setContactField(data.field, data.value)
  })
  
  events.on('card:select', handleCardSelect);
  
  events.on('preview:changed', handlePreviewChanged);

  events.on('product:toggle', (item: Product) => {
    if (app.basket.indexOf(item) < 0) {
      events.emit('product:add', item);
    }
    else {
      events.emit('product:delete', item);
    }
  });
  
  events.on('product:add', (item: Product) => {
    app.addProduct(item);
  });
  
  events.on('product:delete', (item: Product) => {
    app.removeProduct(item)
  });
  
  events.on('basket:changed', (items: Product[]) => {
    basket.items = items.map((item, index) => {
      const card = new Card(cloneTemplate(cardBasketElm), {
        onClick: () => {
          events.emit('product:delete', item);
        }
      });
      return card.render({
        index: (index + 1).toString(),
        title: item.title,
        price: item.price,
      });
    });
  
    const total = items.reduce((total, item) => total + item.price, 0);
    basket.total = total;
    app.order.total = total;
    basket.toggleButton(total === 0);
  });
  
  events.on('counter:changed', () => {
    pageContainer.counter = app.basket.length;
  });
  
  events.on('basket:open', () => {
    modalContainer.render({
      content: basket.render({})
    })
  });
  
  events.on('order:open', () => {
    modalContainer.render({
      content: order.render({
        payment: '',
        address: '',
        valid: false,
        errors: []
      })
    });
    app.order.items = app.basket.map(item => item.id);
    console.log( app.order.items + '  app.order.items')
    console.log( app.basket.map(item => item.id) + '  app.basket.map(item => item.id)')
  });
  
  events.on('payment:toggle', (target: HTMLElement) => {
    if (!target.classList.contains('button_alt-active')) {
      order.toggleButtons(target);
      app.order.payment = PaymentMethod[target.getAttribute('name')];
    }
  });
  
  events.on('modal:open', handleModalOpen);
  
  events.on('modal:close', handleModalClose);
  
  events.on('order:ready', () => {
    order.valid = true;
  })
  
  events.on('contact:ready', () => {
    contact.valid = true;
  })
  
  events.on('contacts:submit', handleOrderSubmit);
  
  function handleCardSelect(item: Product) {
    app.selectProduct(item);
  };
  
  function handleOrderSubmit() {
    api.createOrder(app.order)
      .then((result) => {
        app.clearBasket();
        app.clearOrder();
  
        success.description = result.total.toString();
  
        modalContainer.render({
          content: success.render({})
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  function handlePreviewChanged(item: Product) {
    const card = new Card(cloneTemplate(cardPreviewElm), {
      onClick: () => {
        events.emit('product:toggle', item);
        card.buttonText = (app.basket.indexOf(item) < 0) ? 'Купить' : 'Удалить из корзины'
      }
    });
    const buttonText = (app.basket.indexOf(item) < 0) ? 'Купить' : 'Удалить из корзины';
    card.buttonText = buttonText;
    modalContainer.render({
      content: card.render({
        title: item.title,
        description: item.description,
        image: item.image,
        price: item.price,
        category: item.category,
        buttonTitle: buttonText
      })
    })
  };
  
  function handleModalOpen() {
    pageContainer.locked = true;
  }
  
  function handleModalClose() {
    pageContainer.locked = false;
  }
  
  function fetchProductList() {
    api.getProductList()
      .then((catalog) => {
        app.setCatalog(catalog);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  fetchProductList();