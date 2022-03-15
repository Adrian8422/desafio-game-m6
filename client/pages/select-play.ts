import { Router } from "@vaadin/router";
import { state } from "../state";

class SelectPlay extends HTMLElement {
  connectedCallback() {
    this.render();
    // setTimeout(() => {
    //   Router.go("home-dos");
    // }, 4200);
    const style = document.createElement("style");
    style.innerHTML = `
    
    .container-page{
      display: grid;
      gap: 42vh;
    }
    .container-hands{
      display:flex;
      flex-direction:row;
      justify-content: space-evenly;
    }
    `;
    this.appendChild(style);
  }
  addListeners() {
    const cs = state.getState();
    const hoverChoices = this.querySelectorAll(".choice");
    hoverChoices.forEach((e) => {
      e.addEventListener("click", (event) => {
        event.stopPropagation();
        const move = e.getAttribute("jugada");
        if (move == "piedra") {
          state.setMoveUser1("piedra");
        } else if (move == "papel") {
          state.setMoveUser1("papel");
        } else {
          state.setMoveUser1("tijera");
        }
      });
    });
  }
  render() {
    this.innerHTML = `
    <div class="container-page">
    
         <counter-element></counter-element>




        <div class="container-hands">       
            <hands-el class="choice" jugada="piedra" hover="true"></hands-el>
            <hands-el class="choice" jugada="papel" hover="true"></hands-el>
            <hands-el class="choice" jugada="tijera" hover="true"></hands-el>
       </div>


    
    </div>
    
    
    `;
    this.addListeners();
  }
}
customElements.define("select-play", SelectPlay);
