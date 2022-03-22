import { state } from "../../state";

class Score extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  connectedCallback() {
    const style = document.createElement("style");

    style.innerHTML = `
      .container-border{
          height: 300px;
          width: 250px;
          border: solid 6px black;
          border-radius: 12px;
          background-color: white;
          text-align: center;
      }
      .title{
        font-family: 'Odibee Sans', cursive;
        font-size: 55px;
        color: rgb(29, 29, 53);
      }
      .items{
        font-size: 40px;
        font-family: 'Odibee Sans', cursive;
        color: rgb(21, 21, 44);
      } 
      `;
    this.appendChild(style);
  }
  render() {
    const cs = state.getState();

    this.innerHTML = `
    <div class="container-border">
    <h2 class="title">Score</h2>
    <h3 class="items">${state.getState().dataRtdb[0].name}:${
      cs.history.user1
    }</h3>
    <h3 class="items">${state.getState().dataRtdb[1].name}:${
      cs.history.user2
    }</h3>
      
      `;
  }
}
customElements.define("score-compo", Score);
