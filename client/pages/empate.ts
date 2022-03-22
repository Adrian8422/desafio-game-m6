import { Router } from "@vaadin/router";
import { state } from "../state";

class EmpateGame extends HTMLElement {
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

    .container-title{
       display: flex;
       width: 250px;
       height: 250px;
       border-radius: 100px;
       border: solid 5px black;
       justify-content: center;
       align-items: center;
       background-color: #f8f11eeb;
       font-size: 42px;
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
        <div class="container-title">
             <h2 class="empate">Empataste</h2>
         </div>
         <score-compo></score-compo>
         <button-comp class="button-restart">Restart</button-comp>

       
      </div> 
      `;

    this.appendChild(div);
  }
}
customElements.define("empate-page", EmpateGame);
