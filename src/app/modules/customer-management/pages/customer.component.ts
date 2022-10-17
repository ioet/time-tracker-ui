import { Store } from '@ngrx/store';
import { Customer } from 'src/app/modules/shared/models';
import { SetCustomerToEdit } from 'src/app/modules/customer-management/store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  showCustomerForm = false;
  hasChangeComponent = false;

  activityName: string;

  constructor(private store: Store<Customer>) { }

  activateCustomerForm() {
    this.store.dispatch(new SetCustomerToEdit(null));
    this.showCustomerForm = true;
  }

  closeCustomerForm(event) {
    this.showCustomerForm = event;
  }

  getChangesInputs(event) {
    this.hasChangeComponent = event;
  }


  scrollToCustomerForm(): void {
    const element = document.getElementById("bottom");
    element.scrollIntoView();
    this.isVisible(element);
  }


  isVisible( elm ) {
    /* Check if an element is visible on the screen */
    const vpH = $(window).height(); // Viewport Height
    const st = $(window).scrollTop(); // Scroll Top
    const y = $(elm).offset().top;
    const elementHeight = $(elm).height();

    return ((y < (vpH + st)) && (y > (st - elementHeight)));
  }
}
