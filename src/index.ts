import { Api } from './components/base/api';
import './scss/styles.scss';
import { IApi } from './types';
import { API_URL, CDN_URL} from './utils/constants';
import {ActionApi} from "./components/ActionApi";
import { EventEmitter, IEvents } from './components/base/events';
import { Card, ICards } from './components/Card';
import { testCards } from './utils/tempConstants';
import { Page } from './components/Page';

const events = new EventEmitter();

const api = new ActionApi(CDN_URL, API_URL);

const page = new  Page(
    document.querySelector('.gallery'), events
);


api.getProductList ()
// .then(res =>  console.log(res));

 api.getProduct ('854cef69-976d-4c2a-a18c-2aa45046c390')
// .then(res =>  console.log(res));

// const gallery = document.querySelector('.gallery')
// console.log(gallery + 'gallery')

const cardTemlate: HTMLTemplateElement = 
    document.querySelector('.card')

    // console.log(cardTemlate + 'cardTemlate')



const card = new Card(cardTemlate, events);
const card2 = new Card(cardTemlate, events);

const cardArray = [];

cardArray.push(card.render(testCards[0]));
cardArray.push(card2.render(testCards[1]));
cardArray.push(card2.render(testCards[2]));

console.log(cardArray[0] + ' cardArray[0]')
console.log(cardArray[1] + ' cardArray[1]')

// page.append(card.render(testCards[2]))

page.render({gallery:cardArray});



events.onAll((event)=> {
    console.log(event.eventName, event.data + 'event.eventName, event.data')
})

