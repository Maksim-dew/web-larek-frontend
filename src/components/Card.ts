import { IProduct, IActions} from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";

export interface ICards extends IProduct{
    index?: string;
    buttonTitle? : string;
  }

  export class Card extends Component<ICards> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _category?: HTMLElement;
    protected _index?: HTMLElement;
  
    constructor(container: HTMLElement, actions?: IActions) {
      super(container);
  
        this._title = ensureElement<HTMLElement>('.card__title', this.container);
        this._price = ensureElement<HTMLElement>('.card__price', this.container);
        this._image = this.container.querySelector('.card__image');
        this._button = this.container.querySelector('.card__button');
        this._description = this.container.querySelector('.card__text');
        this._category = this.container.querySelector('.card__category');
        this._index = this.container.querySelector('.basket__item-index');

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    disableButton(value: number | null) {
        if (value === null && this._button) {
          this._button.disabled = true;
        }
      }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set buttonText(value: string) {
        if (this._button) {
          this._button.textContent = value;
        }
      }
    
    set price(value: number | null) {
        this.setText(this._price, (value) ? `${value.toString()} синапсов` : '');
        this.disableButton(value);
    }

  get price(): number {
    return Number(this._price.textContent || '');
  }

    set category(value:  string) {
        this.setText(this._category, value);
    }

    get category(): string {
        return this._category.textContent || '';
    }

    set index(value: string) {
        this._index.textContent = value;
      }
    
    get index(): string {
        return this._index.textContent || '';
    }

    set description(value: string) {
        this.setText(this._description, value);
    }
}
