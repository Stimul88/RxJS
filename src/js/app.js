import { ajax } from 'rxjs/ajax';
import {
  map,
  catchError,
  of,
  interval,
  switchMap
} from 'rxjs';
import BindToDom from "./BindToDom";
import ReformatDate from "./ReformatDate";
import Shorting from "./Shorting";

const reformatDate = new ReformatDate();
const shorting = new Shorting();

const container = document.querySelector('.container');


const server ='http://localhost:8080'


const form = new BindToDom(container);


document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault()
  form.bindToDOM();
})

let responseArray = [];


const obs$ = interval(2000).pipe(
  switchMap( () =>
    ajax.getJSON(`${server}/messages/unread`).pipe(
      map(userResponse => userResponse.messages.filter(item => !responseArray.includes(item.id))),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    )
  ),
);



obs$.subscribe(
  {
  next: value => {
    const messages = container.querySelector('.messages');

    if(Array.from(value).length === 0) {
      console.log('Новых сообщений нет')
      return;
    }

    Array.from(value).forEach(item => {
      if(!responseArray.includes(item.id)) {
        responseArray.push(item.id)

          const short = shorting.short(item.subject);

          const message = `
                <div class="message">
                  <div class="email">${item.from}</div>
                  <div class="hello">${short}</div>
                  <div class="date">${reformatDate.reformat(item.received)}</div>
                </div> `

          messages.insertAdjacentHTML('afterbegin', message)
      }
    })
  },
  error: err => console.log(err)
});
