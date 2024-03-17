export default class ReformatDate {
  constructor() {
  }

  reformat(timeStamp) {
    const created = new Date(timeStamp);

    const date = created.toLocaleDateString();
    const time = created.toLocaleTimeString('ru', { hour: 'numeric', minute: 'numeric' });

    return `${time} ${date}`;
  }
}
