import { state } from "../../state";
class HeaderData extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  ////ACA LO QUE HICE EN EL HEADER FUE PONER UN SUBSCRIBE EN EL INNET HTML PARA QUE PUEDA CARGAR TODOS LOS DATOS IGUALES QUE GUARDO DE LA RTDB A LA DATARTDB DEL STATE...TENGO QUE VER SI FUNCIONA BIEN O SINO PROBAR OTRA FORMA
  connectedCallback() {}
  addStyles() {
    const containerUser = this.querySelector(".header");
    containerUser.setAttribute(
      "style",
      "display:flex; justify-content:space-between; width: 455px; margin: 0 auto; padding:11px; background-color:#4ad3dea3;border: solid 2px #211d1c; border-radius: 9px;"
    );
    const userDos = this.querySelector(".user2");
    userDos.setAttribute("style", "color:red;");
  }
  render() {
    this.innerHTML = `
       <div class="header">
          <div class="container-users">
              <div class="user1">${state.getState().dataRtdb[0].name}:${
      state.data.history.user1
    }</div>
              <div class="user2">${state.getState().dataRtdb[1].name}:${
      state.data.history.user1
    }</div>
  
          </div>
          <div class="container-users-online">
          <div class="user1">${state.getState().dataRtdb[0].name}:online:${
      state.getState().dataRtdb[0].online
    }</div>
              <div class="user2">${state.getState().dataRtdb[1].name}:online:${
      state.getState().dataRtdb[1].online
    }</div>
          
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
