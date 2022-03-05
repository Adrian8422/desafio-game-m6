import { state } from "../state";
class CompartirCod extends HTMLElement {
  connectedCallback() {
    state.subscribe(() => {
      state.getState();
      this.render();
    });
    this.render();
  }
  addStyles() {
    const containerUser = this.querySelector(".container-page");
    const containerHands = this.querySelector(".container-hands");
    const containerTitle = this.querySelector(".container-titles");
    containerTitle.setAttribute(
      "style",
      "display: flex;flex-direction: column;align-items: center;"
    );

    containerUser.setAttribute(
      "style",
      "display: flex;flex-direction: column;height: 97vh;justify-content: space-evenly;"
    );
    const userDos = this.querySelector(".user2");
    userDos.setAttribute("style", "color:red;");

    containerHands.setAttribute(
      "style",
      " display:flex;flex-direction:row;justify-content: space-evenly;"
    );
  }
  render() {
    this.innerHTML = `
    <header-data></header-data>
    <div class="container-page">
        <div class="container-titles">
            <div class="user1">Comparti el codigo:</div>
            <div class="salaId">${state.data.roomId}</div>
            <div class="user2">con tu contrincante</div>

        </div>

        <div class="container-hands">       
             <hands-el jugada="piedra"></hands-el>
             <hands-el jugada="papel"></hands-el>
             <hands-el jugada="tijera"></hands-el>
        </div>

      
     
     </div>
     `;
    this.addStyles();
  }
}
customElements.define("share-code", CompartirCod);
