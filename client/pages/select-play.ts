import { Router } from "@vaadin/router";
import { state } from "../state";

class SelectPlay extends HTMLElement {
  connectedCallback() {
    this.render();

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
    ///si el usuario 1 no tiene name significa que estamos siendo el usuario 2 y viceversa
    //LUEGO CUANDO AMBOS USUARIOS ELIGEN UNA JUGADA , ME REDIRIGE A LA PROXIMA PAGE CON LA ELECCION DE CADA UNO

    const cs = state.getState();
    const hoverChoices = this.querySelectorAll(".choice");
    hoverChoices.forEach((e) => {
      e.addEventListener("click", () => {
        e.getAttribute("in-game");
      });
    });

    hoverChoices.forEach((e) => {
      e.addEventListener("click", (event) => {
        event.stopPropagation();
        const move = e.getAttribute("jugada");
        if (cs.userName1 == "" && move == "piedra") {
          state.setMoveUser2("piedra");
        } else if (cs.userName2 == "" && move == "piedra") {
          state.setMoveUser1("piedra");
        } else if (cs.userName1 == "" && move == "papel") {
          state.setMoveUser2("papel");
        } else if (cs.userName2 == "" && move == "papel") {
          state.setMoveUser1("papel");
        } else if (cs.userName1 == "" && move == "tijera") {
          state.setMoveUser2("tijera");
        } else {
          state.setMoveUser1("tijera");
        }
      });
    });
    state.subscribe(() => {
      if (cs.dataRtdb[0].move && cs.dataRtdb[1].move) {
        Router.go("in-game");
      }
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
