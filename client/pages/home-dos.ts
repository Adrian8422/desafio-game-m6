import { Router } from "@vaadin/router";
import { state } from "../state";

class HomePageDos extends HTMLElement {
  connectedCallback() {
    this.render();
    const style = document.createElement("style");
    style.innerHTML = `
    .container-title{
      display: flex;
      font-size: 65px;
      flex-direction: column;
      justify-content: center;
      width: 66vh;
      margin: 0 auto;
      color: green;
      font-family: 'Source Code Pro', monospace;
    }
   
    .container-inputs{
      display: grid;
      gap: 17px;
      margin: 0 auto;
      width: 66vh;
      
    }
    .container-full-page{
      margin-top: 28vh;
      width: 100%;
     display: grid;
     gap: 42px;
    }
    .container-hands{
      display:flex;
      flex-direction:row;
      justify-content: space-evenly;
    }
    .form{
      display: none;
      max-width: 104%;
      height: 199px;
      
      gap: 1px;
      padding: 53px;
  }
  .label{
      font-size: 20px;
      width: 100%;
      height: 30px;
      border-radius: 4px;
      font-family: 'Russo One', sans-serif;
      margin: 0 0 -20px 0;
  }
  .input{
      width:100%;
      border-radius: 11px;
      height: 25px;
  }
  .button{
    width: 150px;
    border-radius: 11px;
    font-weight: 500;
  }
  .container-button{
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .form-idRoomExist{
    display: none;
    max-width: 104%;
    height: 199px;
    
    gap: 1px;
    padding: 53px;

  }
    
    `;
    this.appendChild(style);
  }
  addListeners() {
    /// REALIZO EL SIGNIN PARA CREAR UNA SALA NUEVA
    const cs = state.getState();
    const nuevoJuego = this.querySelector(".nuevo-juego");
    const accederSala = this.querySelector(".access-room");
    const containerInputs = this.querySelector(".container-inputs");
    const form = this.querySelector(".form");
    const formIngresarASalaExist = this.querySelector(".form-idRoomExist");
    const inputRoomId = this.querySelector(".input-room");
    nuevoJuego.addEventListener("click", () => {
      containerInputs.setAttribute("style", "display:none");
      form.setAttribute("style", "display:grid");
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;

      state.setNombre(target.nombre.value);
      state.signIn(() => {
        state.askNewRoom(() => {
          state.setValuesPlayer1Rtdb();
          state.accessToRoom();
        });
      });
      Router.go("share-code");
    });
    /// REALIZO EL SIGNIN PARA INGRESAR A SALA EXISTENTE(REVISAR ESTO, TENGO QUE PODER HACER UN SIGNIN COMO EN EL QUE ES PARA CREAR UNA NUEVA SALA Y LUEGO MANDARME A LA SALA CONECTADA, TAMBIEN REVISAR QUE EN EL HTML DE ABAJO AGREGE LOS FORMULARIOS PARA EL ACCESTOROOM PERO HAY QUE VER COMO ORGANIZARLO.DALEEPAPAAAA,(CREO QUE LA SOLUCION ES QUE EL BOTON INGRESAR A SALA ME REDIRIJA A UNA NUEVA PAGE QUE SEA ACCES TOROOM Y AHI MISMO EN ESA PAGE HACER DENUEVO EL SIGN IN Y ASI PODER ACCEDER AL ACCES TOO ROOM))
    accederSala.addEventListener("click", () => {
      Router.go("access-room");
    });
    // formIngresarASalaExist.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   const target = e.target as any;
    //   state.setNombre(target.nombre.value);

    //   state.signIn(() => {
    //     state.data.roomId = (inputRoomId as HTMLInputElement).value.toString();
    //     state.setState(cs);
    //     state.accessToRoom(state.data.roomId);
    //     state.setState(cs);
    //   });
    // });
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    
    <div class="container-full-page">
        <div class="container-title"  
            <h1 class="title-page">Piedra,
            Papel ó
            Tijera</h1>             
       </div>
       <div class="container-inputs">
          
       <button-comp class="nuevo-juego">Nuevo Juego</button-comp>
       <button-comp class="access-room">Ingresar a sala</button-comp>

          
       </div>
       <form class="form">
           <label class="label">Nombre</label>
         <div class="container-input">
             <input class="input" type="text" name="nombre" />
         </div>
         <div class="container-button">
                 <button class="button">Ingresar</button>
         </div>
       </form>



       <form class="form-idRoomExist">
          <div>
        
             <input class="input-room" type="text" placeholder="Ingrese su ID de Sala ej:1234" name="idroom" />
          </div>
          <button class="button">Ingresar a sala</button>


       </form>



       <div class="container-hands">       
           <hands-el jugada="piedra"></hands-el>
           <hands-el jugada="papel"></hands-el>
           <hands-el jugada="tijera"></hands-el>
       </div>
    </div>
    
    `;

    this.appendChild(div);
    this.addListeners();
  }
}
customElements.define("home-dos", HomePageDos);
