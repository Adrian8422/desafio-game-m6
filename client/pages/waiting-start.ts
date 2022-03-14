import { Router } from "@vaadin/router";
import { state } from "../state";
class WaitingStart extends HTMLElement {
  connectedCallback() {
    this.render();
    state.accessToRoom();
    const cs = state.getState();
    const style = document.createElement("style");
    style.innerHTML = `
    .container-text{
      display: flex;
      font-size: 65px;
      flex-direction: column;
      justify-content: center;
      width: 66vh;
      margin: 0 auto;
      color: green;
      font-family: 'Source Code Pro', monospace;
    }
    
    .text{
      max-width:25vh;
      font-size:25px;
      margin: 0 auto;
    }
    .text-two{
      display:none;
      max-width:25vh;
      font-size:25px;
      margin: 0 auto;

    }
    .container-hands{
      display:flex;
      flex-direction:row;
      justify-content: space-evenly;
    }
    `;
    this.appendChild(style);

    ///listeners
    const buttonStart = this.querySelector(".start");
    const textTwo = this.querySelector(".text-two");
    const text = this.querySelector(".text");
    buttonStart.addEventListener("click", () => {
      if (cs.dataRtdb[0].userId) {
        state.setStartPlayer1();
      } else {
        console.error("no coinciden");
      }
      if (cs.dataRtdb[1].userId) {
        state.setStartPlayer2();
      } else {
        console.error("no coinciden");
      }
      text.setAttribute("style", "display:none");
      textTwo.setAttribute("style", "display:flex");
      buttonStart.setAttribute("style", "display:none");
    });
  }
  changePageForDate() {
    state.subscribe(() => {
      const cs = state.getState();
      if (
        cs.dataRtdb[0].start == false &&
        cs.dataRtdb[1].start == false &&
        location.pathname == "/waiting-start"
      ) {
        console.error("no todos apretaron start");
      }
      if (
        cs.dataRtdb[0].start == true &&
        cs.dataRtdb[1].start == true &&
        location.pathname == "/waiting-start"
      ) {
        console.log("la data despues del startuser1", cs.dataRtdb[0].start);
        console.log("la data despues del startuser2", cs.dataRtdb[1].start);

        Router.go("select-play");
      }
    });
  }
  render() {
    const cs = state.getState();
    const div = document.createElement("div");
    div.innerHTML = `
    
      <div class="container-page">
      <header-data></header-data>
          <div class="container-text">
          <p class="text">Presioná jugar
          y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
          <p class="text-two">Esperando a que ${cs.dataRtdb[1].name} presione ¡Jugar!...<p>
              
          </div>

          <button-comp class="start">¡Jugar!</button-comp>
  
       
      
         <div class="container-hands">       
           <hands-el jugada="piedra"></hands-el>
           <hands-el jugada="papel"></hands-el>
           <hands-el jugada="tijera"></hands-el>
         </div>
      </div> 
      `;

    this.appendChild(div);
    this.changePageForDate();
  }
}
customElements.define("waiting-start", WaitingStart);

//REVISAR TODO ESTO , ENTRA A LA PAGINA PERO TENG OQUE HAcerla full llllll
