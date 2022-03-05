import { state } from "../../state";
class HeaderData extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  connectedCallback() {
    state.subscribe(() => {
      state.getState();
      this.render();
    });
    this.render();
  }
  addStyles() {
    const containerUser = this.querySelector(".header");
    containerUser.setAttribute(
      "style",
      "display:flex;justify-content:space-between;"
    );
    const userDos = this.querySelector(".user2");
    userDos.setAttribute("style", "color:red;");
  }
  render() {
    this.innerHTML = `
     <div class="header">
        <div class="container-users">
            <div class="user1">${state.data.userName1}:${state.data.history.user1}</div>
            <div class="user2">${state.data.userName2}:${state.data.history.user1}</div>

        </div>
        <div class="container-users-online">
        <div class="user1">${state.data.userName1}:online:${state.data.userOnline1}</div>
            <div class="user2">${state.data.userName2}:online:${state.data.userOnline2}</div>
        
        </div>

        <div class="container-roomId">

             <div class="salaId">Sala:</div>
             <div class="salaId">${state.data.roomId}</div>

       </div>
     
     
     </div>
     `;
    this.addStyles();
  }
}
customElements.define("header-data", HeaderData);
