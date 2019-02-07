import Component from '../component.js';
import PhoneCatalog from './phone-catalog.js';
import PhoneFilter from './phone-filter.js';
import PhoneService from '../services/phone-service.js';
import PageButtons from './page-buttons.js';
import PhoneAmount from './phone-amount.js';

export default class PhonesPage extends Component {
  constructor({ element }) {
    super({ element });

    this._render();
    this._initCatalog();
    this._initFilter();
    this._initPageButtons();
    this._initPhoneAmount();

    this.showPhones();
  }

  showPhones() {
    let options = {
      orderValue: this._fiter.getOrderValue(),
      orderBy: this._fiter.getOrderName(),
      filterValue: this._fiter.getFilterValue(),
      phonesAmount: this._phoneAmount.getAmountOfItems(),
      currentPage: this._pageButtons.getCurrentPage()
    };

    PhoneService.getAll(options).then(({ currPagePhones, pageCount }) => {
      this._catalog.updatePhones(currPagePhones);
      this._pageButtons.updatePageCount(pageCount);
    });
  }

  _initPhoneAmount() {
    this._phoneAmount = new PhoneAmount({
      element: this._element.querySelector('[data-element="phone-amount"]')
    });

    this._phoneAmount.subscribe('page-size-selected', () => {
      this._pageButtons.resetCurrentPage();
    });
  }

  _initPageButtons() {
    this._pageButtons = new PageButtons({
      element: this._element.querySelector('[data-element="page-buttons"]')
    });

    this._pageButtons.subscribe('current-page-selected', () => {
      this.showPhones();
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-element="phone-catalog"]')
    });

    this._catalog.subscribe('order-changed', sortBy => {
      this._fiter.updateOrderValue(sortBy);
      this.showPhones();
    });
  }

  _initFilter() {
    this._fiter = new PhoneFilter({
      element: this._element.querySelector('[data-element="find-input"]')
    });

    this._fiter.subscribe('input-enter', () => {
      this._pageButtons.resetCurrentPage();
      this.showPhones();
    });
  }

  _render() {
    this._element.innerHTML = `
       <header class="header">
        <div class="container">
            <div class="header__logo">Phones.ua</div>
            <div 
            data-element="find-input" 
            class="header__find-input"
            >
            </div>
        </div>
    </header>
    <main class="main">
        <div class="container">
        <div data-element="phone-amount"></div>
          <div 
          data-element="phone-catalog"
          class="container"
          >
          </div>
          <div data-element="page-buttons"></div>
        </div>
    </main>
    `;
  }
}
