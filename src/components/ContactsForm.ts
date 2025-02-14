import {Form} from "./common/Form";
import {IContactsForm} from "../types";
import {IEvents} from "./base/events";

export class ContactsForm extends Form<IContactsForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
      }

      get phone(): string {
        return (this.container.elements.namedItem('phone') as HTMLInputElement).value;
      }
    
      set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
      }

      get email(): string {
        return (this.container.elements.namedItem('email') as HTMLInputElement).value;
      }
    
      set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
      }
}