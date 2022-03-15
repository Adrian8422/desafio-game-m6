const piedra2 = require("../../../assets/piedra (1).svg");
const papel2 = require("../../../assets/papel.svg");
const tijera2 = require("../../../assets/tijera (1).svg");

class HandsPlay2 extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const style = document.createElement("style");
    const attackHover = this.hasAttribute("hover");

    if (attackHover == true) {
      style.innerHTML = `.hands{
        opacity: 0.8;
      }
      .hands:hover{
        opacity:1;
        width:90px;
        transition-duration:0.7s;
      }
      `;
    }
    this.shadow.appendChild(style);
    this.render();
  }
  addListeners() {
    const handEl: any = this.shadow.querySelector(".hands");
    const inGame: any = this.getAttribute("in-game");
    if (inGame) {
      (handEl.style.height = "325px"), (handEl.style.width = "180px");
    }
  }
  render() {
      const cs = state.getState()
    const jugada = this.getAttribute("jugada");
    let gameType = "";
    if (jugada == "piedra") {
      gameType = piedra2;
    } else if (jugada == "papel") {
      gameType = papel2;
    } else {
      gameType = tijera2;
    }
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
    <img class="hands" src="${gameType}">
    </div>
    
    
    `;

    this.shadow.appendChild(div);
    this.addListeners();
    if
  }
}
customElements.define("hands-playerdos", HandsPlay2);
