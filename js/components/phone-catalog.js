import Component from "../component.js";

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });
    this._phones = [];

    this.on('click', '[data-sort]', (event) => {
      let target = event.target.closest('[data-sort]');
      let orderBy = target.dataset.sort;

      this.emit('order-changed', orderBy);
    });

    this.on('dblclick', '[data-description-edit="false"]', (event) => {
      let target = event.target.closest('[data-description-edit]');

      this._editCurrentField(target);
    });

    this.on('click', '[data-btn]', (event) => {
      this._endEditing(event);
    });

    this._render();
  }

  updatePhones(phones) {
    this._phones = phones;

    this._render();
  }

  _endEditing(event) {
    let btnValue = event.target.closest('[data-btn]').dataset.btn;

    let editingField = event.target.closest('[data-edit]');
    let editingValue = editingField.querySelector('textarea').value;

    let field = event.target.closest('[data-description-edit]');

    if(btnValue === 'save') {
      field.textContent = editingValue;
    }

    field.dataset.descriptionEdit = 'false';
    editingField.remove();
  }

  _editCurrentField(field) {
    field.dataset.descriptionEdit= "true";
    let currValue = field.textContent;

    field.insertAdjacentHTML('beforeend', `
        <div data-edit>
          <textarea class="edit"></textarea>
      
          <div class="edit_buttons">
            <button data-btn="save" class="edit_button">Save</button>
            <button data-btn="cancel" class="edit_button">Cancel</button>
          </div>
        </div>
    `);

    let input = field.querySelector('textarea');

    input.value = currValue;
  }

  _getListItemHTML(item) {
    return `
      <tr>
        <td><img src="${item['imageUrl']}"
         alt="phone" /></td>
        <td data-description-edit="false">${item['name']}</td>
        <td data-description-edit="false">${item['snippet']}</td>
        <td data-description-edit="false">${item['age']}</td>
      </tr>
    `;
  }

  _render() {
    this._element.innerHTML = `
      <table class="main__phones-list">
      <tr>
        <td></td>
        <td data-sort="name">Name</td>
        <td>Description</td>
        <td data-sort="age">Age</td>
      </tr>
      ${
        this._phones.map(item => {
          return this._getListItemHTML(item);
        }).join('')
      }
      </table>
    `;
  }
}
