// const loseImg = require("");

class LosePage extends HTMLElement {
  connectedCallback() {
    this.render();
    const style = document.createElement("style");
    style.innerHTML = `
    .container-pag {
        background-color: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        margin: 0 auto;
        height: 697px;
      }
     
      `;
    this.appendChild(style);
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
  
      <div class="container-page">
      <img class="img" src=""/>
      <button-comp>Restart</button-comp>

       
      </div> 
      `;

    this.appendChild(div);
  }
}
customElements.define("lose-page", LosePage);
