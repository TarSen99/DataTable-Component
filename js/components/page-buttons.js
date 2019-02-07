import Component from "../component.js";

export default class PageButtons extends Component {
  constructor({ element }) {
    super({ element });
    this._pageCount = 0;
    this._currentPage = 0;
    this.maxPage = 0;
    this.buttons = [];

    this.on("click", "[data-page]", event => {
      let button = event.target.closest("[data-page]");

      let currentPage = +button.dataset.page;

      this._makeEvent(this._currentPage, currentPage);
    });

    this.on("click", "[data-page-selector]", event => {
      let button = event.target.closest("[data-page-selector]");

      let step = +button.dataset.pageSelector;
      let currentPage = this._currentPage;
      currentPage += step;

      currentPage = Math.min(currentPage, this.maxPage - 1);
      currentPage = Math.max(currentPage, 0);

      this._makeEvent(this._currentPage, currentPage);
    });

    this._render();
  }

  _makeEvent(currPage, clickedPage) {
    if (clickedPage === currPage) {
      return;
    }

    this._currentPage = clickedPage;
    this.emit("current-page-selected");
  }

  resetCurrentPage() {
    this._currentPage = 0;
    this.emit("current-page-selected");
  }

  updatePageCount(pageCount) {
    this._pageCount = pageCount;
    this.buttons = [];

    for (let i = 0; i < this._pageCount; i++) {
      this.buttons.push("");
    }

    this.maxPage = this.buttons.length;
    this._render();
  }

  getCurrentPage() {
    return this._currentPage;
  }

  _getPageButtonHTML(page) {
    return `
        <li>
          <button
           data-page="${page}"
           class="main_select-button ${
            page === this._currentPage ? "main_select-button--active" : ""
          }"
          >
          ${page + 1}
          </button>
        </li>`;
  }

  _render() {
    const nextPage = 1;
    const prevPage = -1;
    this._element.innerHTML = `
            <div class="main_select-buttons">
               <span class="main_page-text">Current page is ${this._currentPage + 1}</span>
               <ul class="main_select-buttons-list">
                    <li>
                        <button
                         data-page-selector="${prevPage}"
                         class="main_select-button">
                             Previous
                        </button>
                     </li>
                    
                    ${this.buttons
                      .map((item, index) => {
                        return this._getPageButtonHTML(index);
                      })
                      .join("")}
                    
                    <li>
                        <button
                         data-page-selector="${nextPage}"
                         class="main_select-button">
                             Next
                        </button>
                    </li>
                </ul>
            </div>
    `;
  }
}
