export default class Shorting {
  constructor() {
  }

  short(text) {

    if(text.length > 15) {
      const result = text.split('').filter((item, index) => index < 15).join('')

      return `${result}...`
    }

    return `${text}`;
  }
}
