class Utils {
  constructor() {
  }

  /*
  *
  * NUMBERS
  *
  */
  isNumber(num=0) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  }

  rand (min=0, max=1) {
    return Math.round(Math.random() * (max - min) + min);
  }

  max (list=[0]) {
    return Math.max(...list);
  }

  min (list=[0]) {
    return Math.min(...list);
  }

  root (num=0,nth=2,decimal) {
    if (decimal) return this.round(Math.pow(num, (1/nth)), decimal);
    return Math.pow(num, (1/nth));
  }

  average (list=[0], decimal) {
    if (decimal) return this.round(this.totalSum(list) / list.length, decimal);
    return this.totalSum(list) / list.length;
  }

  totalSum (list=[0]) {
    return list.reduce((total, value) => total + value);
  }

  round (num=0, digits=0) {
    let power = 1;
    for (let i=0; i < digits; i += 1) {
      power *= 10;
    }
    return Math.round(num * power) / power;
  }

  reverseNumber (num=0) {
    return parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num);
  }

  degToRad(degrees=0) {
    return degrees * (Math.PI/180)
  }

  radToDeg(radians=0) {
    return radians * (180/Math.PI)
  }

  base (num=0, base=10) {
    return +num.toString(base);
  }

  isPrime (num=0) {
    if (num === 2) {
      return true;
    } else if (num > 1) {
      for (var i = 2; i < num; i++) {
        if (num % i !== 0) {
          return true;
        } else if (num === i * i) {
          return false
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  getPrimeFactors(num=0) {
    const factors = [];
    let divisor = 2;

    while (num >= 2) {
      if (num % divisor == 0) {
        factors.push(divisor);
        num = num / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  }

  getDivisors (num=0) {
    let divisors = [];
    for (let mod = num; mod > 0; mod -= 1) {
      if (num % mod === 0) divisors.push(mod);
    }
    return divisors.sort();
  }

  allSameDigit(num=0) {
    const first = num % 10;
    while (num) {
      if (num % 10 !== first) return false;
      num = Math.floor(num / 10);
    }
    return true;
  }

  factorial (num=0) {
    let result = 1;
    for (let i=1; i <= num; i += 1) {
      result *= i;
    }
    return result;
  }

  async sleep (ms=1000) {
    return new Promise((resolve) =>
      setTimeout(resolve, ms)
    );
  }



  /*
  *
  * STRINGS
  *
  */
  strGetcsv (input='', delimiter=',', enclosure='', escape='\\') {
    const output = [];
    const _backwards = (str) => str.split('').reverse().join('');
    const _pq = (str) => String(str).replace(/([\\.+*?[^\]$(){}=!<>|:])/g, '\\$1');
    const pqEnc = _pq(enclosure);
    const pqEsc = _pq(escape);
    input = input.replace(new RegExp('^\\s*' + pqEnc), '').replace(new RegExp(pqEnc + '\\s*$'), '');
    input = _backwards(input).split(new RegExp(pqEnc + '\\s*' + _pq(delimiter) + '\\s*' + pqEnc + '(?!' + pqEsc + ')', 'g')).reverse();
    for (let i=0, inpLen=input.length; i<inpLen; i++) {
      output.push(_backwards(input[i]).replace(new RegExp(pqEsc + pqEnc, 'g'), enclosure));
    }
    return output;
  }

  replaceAt (input='', index=0, replacement=input[index]) {
    if (index >= input.length) return input.valueOf();
    return input.substring(0, index) + replacement + input.substring(index + 1);
  }

  strReverse(str='') {
    return str.split("").reverse().join("");
  }

  escapeHtml(text='') {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
    return text.trim().replace(/[&<>"']/g, (m) => map[m] );
  }

  checkName(name='') {
    return /^[\w'\-,.][^0-9_!????????/\\+=@#$%??&*(){}|~<>;:[\]]{0,}$/.test(name.trim());
  }

  checkEmail(email='') {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkPassword(password='') {
    return /^[a-zA-Z-0-9]+$/.test(password);
  }


  /*
  *
  * DATES
  *
  */
  today (format='en', fullYear=true) {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    if (fullYear) yyyy = yyyy.toString().substr(2);

    if (format === 'eu') return `${dd}/${mm}/${yyyy}`;
    return `${mm}/${dd}/${yyyy}`;
  }

  getTime () {
    let d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }

  weekDay () {
    return new Date().getDay();
  }

  dateFormat(str='M/D/Y H:I:S') {
    let d = new Date();
    return str
      .replace('h', d.getHours().toString())
      .replace('H', d.getHours().toString().padStart(2, '0'))
      .replace('i', d.getMinutes().toString())
      .replace('I', d.getMinutes().toString().padStart(2, '0'))
      .replace('s', d.getSeconds().toString())
      .replace('S', d.getSeconds().toString().padStart(2, '0'))
      .replace('m', String(d.getMonth()+1))
      .replace('M', String(d.getMonth()+1).padStart(2, '0'))
      .replace('d', d.getDate().toString())
      .replace('D', d.getDate().toString().padStart(2, '0'))
      .replace('y', d.getFullYear().toString().substr(2))
      .replace('Y', d.getFullYear().toString());
  }
}

const utils = new Utils();
