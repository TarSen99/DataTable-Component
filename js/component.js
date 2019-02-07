export default class Component {
  constructor({ element }) {
    this._element = element;

    this._callbacksMap = {};
  }

  on(eventName, selector, callback) {
    this._element.addEventListener(eventName, e => {
      let elementToDelegate = e.target;

      if (!elementToDelegate.closest(selector)) {
        return;
      }

      callback(e);
    });
  }

  subscribe(eventName, callback) {
    if (!this._callbacksMap[eventName]) {
      this._callbacksMap[eventName] = [];
    }

    this._callbacksMap[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (!this._callbacksMap.hasOwnProperty(eventName)) {
      return;
    }

    this._callbacksMap[eventName].forEach(callback => {
      callback(...args);
    });
  }
}
