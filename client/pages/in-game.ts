import { Router } from "@vaadin/router";
import { state } from "../state";

class InGame extends HTMLElement {
  connectedCallback() {
    this.render();

    const style = document.createElement("style");
    style.innerHTML = `
    
    .container-page{
      margin-top: 104px;
      display: grid;
      gap: 111px;
      justify-content: center;
      transform: rotate(185deg) translateY(0%);
    }
    
    .container-hands{
      display:flex;
      flex-direction:row;
      justify-content: space-evenly;
    }
    .container-hands-user1{
      height: 362px;
      width: 180px;
      transform-origin: top;
      transform: rotate(159deg) translateY(-82%);


    }
    .container-hands-user2{
      height: 173px;
      width: 180px;
      transform-origin: unset;
      transform: rotate(13deg) translateY(-18%);
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
        Router.go("winner-page");
      } else if (cs.userName2 && results == "ganaste") {
        Router.go("winner-page");
      } else if (cs.userName1 && results == "perdiste") {
        Router.go("lose-page");
      } else if (cs.userName2 && results == "perdiste") {
        Router.go("lose-page");
      } else if (cs.userName1 && results == "empate") {
        Router.go("empate-page");
      } else if (cs.userName2 && results == "empate") {
        Router.go("empate-page");
      }
    }, 3000);
  }

  render() {
    this.innerHTML = `
    <div class="container-page">

      <div class="container-hands-user1">
         <hands-el class="user1" jugada="${
           state.getState().dataRtdb[0].move
         }" in-game="true"></hands-el>
      </div>
      <br>

      <div class="container-hands-user2">
         <hands-el class="user2" jugada="${
           state.getState().dataRtdb[1].move
         }" in-game="true"></hands-el>
      </div>  
    </div>
    
    
    `;
    this.addListeners();
  }
}
customElements.define("in-game", InGame);
