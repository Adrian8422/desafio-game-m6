import { Router } from "@vaadin/router";
import { state } from "../state";

class InGame extends HTMLElement {
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
    ////ACA TENGO QUE CAMBIAR LAS PAGINAS A DONDE REDIRECCIONA , POR EJ SI PERDI GANE O EMPATE
    const moveUser1: any = this.querySelector(".user1").getAttribute("jugada");
    const moveUser2: any = this.querySelector(".user2").getAttribute("jugada");
    setTimeout(() => {
      const results = state.whoWins(moveUser1, moveUser2);
      if (cs.userName1 && results == "ganaste") {
        Router.go("full-sala");
      } else if (cs.userName2 && results == "ganaste") {
        Router.go("full-sala");
      } else if (cs.userName1 && results == "perdiste") {
        Router.go("lose-page");
      } else if (cs.userName2 && results == "perdiste") {
        Router.go("lose-page");
      }
    });
  }
  render() {
    this.innerHTML = `
    <div class="container-page">
      <hands-el class="user1" jugada="${
        state.getState().dataRtdb[0].move
      }" in-game="true"></hands-el>
      <br>

      <hands-el class="user2" jugada="${
        state.getState().dataRtdb[1].move
      }" in-game="true"></hands-el>
    
        


    
    </div>
    
    
    `;
    this.addListeners();
  }
}
customElements.define("in-game", InGame);
