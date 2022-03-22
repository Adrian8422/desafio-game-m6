import { state } from "../state";
import { Router } from "@vaadin/router";

const winImg = require("../assets/lenny.jpg");

class WinnerPage extends HTMLElement {
  connectedCallback() {
    this.render();
    const style = document.createElement("style");
    style.innerHTML = `
    .container-page {
        background-color: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        margin: 0 auto;
        height: 697px;
      }
      .img{
        width: 250px;
        height: 250px;
        border-radius: 100px;
        border: solid 5px black;
      }
     
      `;
    this.appendChild(style);
    const cs = state.getState();

    const buttonRestart = this.querySelector(".button-restart");
    if (cs.userName1 == "") {
      buttonRestart.addEventListener("click", (e) => {
        e.preventDefault();
        state.restart();
        Router.go("waiting-start");
      });
    } else if (cs.userName2 == "") {
      buttonRestart.addEventListener("click", (e) => {
        e.preventDefault();
        state.restart();
        Router.go("waiting-start");
      });
    }
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
  
      <div class="container-page">
         <img class="img" src="${winImg}"/>
         <score-compo></score-compo>
         <button-comp class="button-restart">Restart</button-comp>

       
      </div> 
      `;

    this.appendChild(div);
  }
}
customElements.define("winner-page", WinnerPage);
