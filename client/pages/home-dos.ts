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
    width: 27vh;
    margin: 0 auto;
    color: #190b0b;
    font-family: 'Source Code Pro', monospace;
    margin-bottom: 3vh;
    text-shadow: 1px 2px 7px;
    }
   
    .container-inputs{
      display: grid;
      gap: 16px;
      margin: 0 auto;
      width: 100%;
      justify-content: center;
    }
    .container-full-page{
      width: 100%;
      display: grid;
      gap: 42px;
  }
  
    
    .container-hands{
      padding: 7vh 0 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    margin: 0 auto;
    }
    .form{
      width: 100%;
      display: none;
      
      height: 199px;
      gap: 53px;
      padding: 0 57px 104px;
      margin: 0 auto;
  }
  .label{
    font-size: 20px;
    width: 73px;
    border-radius: 4px;
    font-family: 'Russo One', sans-serif;
    margin: 0 0 -20px 0;
    
    height: 30px;
    text-shadow: 2px 3px 1px black;
    color: #969090;
    margin-bottom: -9px;
    font-weight: bold;
  }
  .container-input{

    margin: 0 auto;
  }
  .input{
    border-radius: 6px;
    height: 25px;
    border: solid 2px;
    font-family: 'Russo One', sans-serif;
    width: 100%;
  }
  .button{
    margin: 0 auto;
  }
  .container-button{
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin: 0 auto;
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
      state.signIn((err) => {
        if (err) {
          console.error("Ocurrio error en el logueo");
        }
        if (cs.messageForRegister == "user not found") {
          alert("no hay un usuario llamado asi");
          Router.go("home-dos");
        }
        state.askNewRoom(() => {
          state.accessToRoom(() => {
            if (cs.idUser1 && location.pathname == "/home-dos") {
              Router.go("share-code");
              ///sideja de funcionAR QUITAR EL STATEVALUES
              state.setValuesPlayer1Rtdb();
            }
          });
        });
      });
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
    this.innerHTML = `
    
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
       <div class="container-input">
             <label class="label">Nombre</label>
             <input class="input" type="text" name="nombre" placeholder="Ingrese su nombre" />
             </div>
             <button-comp class="button">Ingresar</button-comp>
       
       </form>



       <form class="form-idRoomExist">
          <div>
        
             <input class="input-room" type="text" placeholder="Ingrese su ID de Sala ej:1234" name="idroom" />
          </div>
          <button-comp class="button">Ingresar a sala</button-comp>


       </form>



       <div class="container-hands">       
           <hands-el jugada="piedra"></hands-el>
           <hands-el jugada="papel"></hands-el>
           <hands-el jugada="tijera"></hands-el>
       </div>
    </div>
    
    `;

    this.addListeners();
  }
}
customElements.define("home-dos", HomePageDos);
