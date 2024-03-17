export default class BindToDom{
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup () {
    return `
          <div class="head"></div>
  <form class="messages-container">
    <div class="incoming">Incoming</div>
    <div class="messages">
    </div>
  </form>
        `;
  }

  bindToDOM() {
    this.parentEl.innerHTML = BindToDom.markup
  }
}

