const PHONES_URL = 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json';

const compareByAge = (a, b) => {
  if (a.age > b.age) {
    return 1;
  } else {
    return -1;
  }
};

const compareByName = (a, b) => {
  if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
};

const PhoneService = {
  _loadDataFromServer(url) {
    return fetch(url)
      .then((response) => {
        return response.json();
    })
      .catch((error => console.log(error)));
  },

  getAll({
           orderValue = 'down',
           orderBy = 'age',
           filterValue = '',
           phonesAmount = 5,
           currentPage = 0
  }) {
    return this._loadDataFromServer(PHONES_URL).then((phones) => {
      let filteredPhones = this._filterPhones(filterValue, phones);
      let orderedPhones = this._sort(filteredPhones, orderBy, orderValue);

      let pageCount = Math.ceil(filteredPhones.length / phonesAmount);
      let currPagePhones = orderedPhones.filter((item, index) => {
        return (
          index >= currentPage * phonesAmount &&
          index < currentPage * phonesAmount + phonesAmount
        );
      });

      return { currPagePhones, pageCount };
    });
  },

  _sort(phones, orderBy, orderValue) {
    if(orderValue === 'up') {
      return phones.sort(PhoneService.sortTypes[orderBy]);
    }

    return phones.sort(PhoneService.sortTypes[orderBy]).reverse();
  },

  sortTypes: {
    name: compareByName,
    age: compareByAge
  },

  _filterPhones(filterValue, phones) {
    filterValue = filterValue.toLowerCase();

    return phones.filter(phone => {
      let phoneName = phone.name.toLowerCase().trim();

      if (phoneName.includes(filterValue)) {
        return phone.name;
      }
    });
  },

};

export default PhoneService;