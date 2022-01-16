const Commons = {
  convertToRupiah(angka) {
    let rupiah = '';

    if (angka === undefined) {
      return '0';
    }

    const angkarev = angka.toString().split('').reverse().join('');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < angkarev.length; i++)
      if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`;
    return `Rp${rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')}`;
  },

  capitalized(word) {
    if (word) {
      const lower = word.toLowerCase();
      if (word.length > 4) {
        return word.charAt(0).toUpperCase() + lower.slice(1);
      } else {
        return word.toUpperCase();
      }
    }

    return '';
  },

  jsCoreDateCreator(dateString) {
    let dateParam = dateString.split(/[\s-:]/);
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
    return new Date(...dateParam);
  },

  formatDate(value) {
    // let date = new Date(value);
    let date = new Commons.jsCoreDateCreator(value);
    
    const day = date.toLocaleString('default', {day: '2-digit'});
    const month = date.toLocaleString('id', {month: 'long'});
    const year = date.toLocaleString('default', {year: 'numeric'});
    return `${day} ${month} ${year}`;
  },
};

export default Commons;
