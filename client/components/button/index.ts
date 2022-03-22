class ButtonComp extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = `
    .button-elem{
      border-radius: 18px;
      font-family: 'Source Code Pro', monospace;
      background-color: #ff5722f0;
      height: 84px;
      width: 360px;
      font-size: 29px;
      border: solid 6px #190b0b;
      color: #190b0b;
      box-shadow: 10px 10px 10px #190b0b;
      font-weight: bolder;
      
    } 
    `;
    this.appendChild(style);
  }
  render() {
    this.innerHTML = `
   <button class="button-elem">${this.textContent}</button>
   `;
  }
}
customElements.define("button-comp", ButtonComp);
