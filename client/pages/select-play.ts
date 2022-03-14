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
    const choices = this.querySelectorAll(".choice");
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
  }
}
customElements.define("select-play", SelectPlay);
