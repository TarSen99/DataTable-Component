import Component from '../component.js';

const INPUT_CHANGE_DELAY = 300;

export default class PhoneFilter extends Component {
  constructor({ element }) {
    super({ element });
    this._order = 'up';
    this._orderName = 'age';
    this._inputValue = '';
    this._render();

    this._makeInputEvent = this._debounce(
      this._makeInputEvent.bind(this),
      INPUT_CHANGE_DELAY
    );

    this.on('input', '[data-element="input"]', this._makeInputEvent);

    this._input = this._element.querySelector('[data-element="input"]');
  }

  _makeInputEvent() {
    this._inputValue = this._input.value;
    this.emit('input-enter');
  }

  _debounce(f, delay) {
    let timerId;

    return () => {
      clearTimeout(timerId);
      timerId = setTimeout(f, delay);
    };
  }

  getFilterValue() {
    return this._inputValue;
  }

  getOrderName() {
    return this._orderName;
  }

  getOrderValue() {
    return this._order;
  }

  updateOrderValue(sortBy) {
    if (this._orderName === sortBy) {
      this._order = this._order === 'down' ? 'up' : 'down';
      return;
    }

    this._orderName = sortBy;
    this._order = 'up';
  }

  _render() {
    this._element.innerHTML = `
      <input 
      data-element="input"
      type="text" 
      class="input" 
      placeholder="What do you want to find?" 
      />
    `;
  }
}
