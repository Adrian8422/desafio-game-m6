import { state } from "../state";
import { Router } from "@vaadin/router";
class CompartirCod extends HTMLElement {
  connectedCallback() {
    this.render();
    const cs = state.getState();
    state.setValuesPlayer1Rtdb();
    state.listenRoom();
    state.subscribe(() => {
      if (
        cs.dataRtdb[0].online == true &&
        cs.dataRtdb[1].online == true &&
        window.location.pathname == "/share-code"
      ) {
        Router.go("waiting-start");
      }
    });
  }
  addStyles() {
    const styleHeader = document.createElement("style");

    styleHeader.innerHTML = `
    .header{
      display:flex;
      justify-content:space-between;
      width: 455px;
      margin: 0 auto;
      padding:11px;
      background-color:#4ad3dea3;
      border: solid 2px #211d1c;
      border-radius: 9px;

    }
    .user2{
      color:red;
    }
    
    
    
    `;
    const containerUser = this.querySelector(".container-page");
    const containerHands = this.querySelector(".container-hands");
    const containerTitle = this.querySelector(".container-titles");
    containerTitle.setAttribute(
      "style",
      "font-size: 38px; display: flex; flex-direction: column; align-items: center;margin-top: 27vh;"
    );

    containerUser.setAttribute(
      "style",
      "display: flex; flex-direction: column; height: 698px; justify-content: space-between; width: 100%;"
    );
    const userDos = this.querySelector(".user2");
    userDos.setAttribute("style", "color:red;");

    containerHands.setAttribute(
      "style",
      " display:flex;flex-direction:row;justify-content: space-evenly;margin-top: 32vh;"
    );
    this.appendChild(styleHeader);
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
