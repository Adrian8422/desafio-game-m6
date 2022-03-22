import { Router } from "@vaadin/router";
import { state } from "../state";

class AccessRoom extends HTMLElement {
  connectedCallback() {
    this.render();
    const style = document.createElement("style");
    style.innerHTML = `
    .container-title{
      display: flex;
      font-size: 65px;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      margin: 0 auto;
      color: #190b0b;
      font-family: 'Source Code Pro', monospace;
      text-shadow: 1px 2px 7px;
    }
    .subtitle{
      font-size: 25px;
    }
    .container-inputs{
      display: grid;
      gap: 17px;
      margin: 0 auto;
      width: 66vh;
      
    }
    .container-full-page{
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      text-align: center;
      padding: 18vh 0 0 0;
    }
    .form{
      display: flex;
      flex-direction: column;
      margin-top: 65px;
    }
    .label{
      font-size: 20px;
      width: 50px;
      border-radius: 4px;
      /* font-family: 'Russo One', sans-serif; */
      margin: 0 0 -20px 0;
      /* background-color: darkgrey; */
      height: 30px;
      text-shadow: 2px 2px 1px black;
      color: #969090;
      margin-bottom: -8px;
      font-weight: bold;
    }
    .input{
      width: 361px;
      border: solid 2px #190b0b;
      border-radius: 7px;
    }
    .container-button{
      margin-top: 58px;
    
    }
    .form-idRoomExist{
      display: none;
      height: 199px;
      gap: 53px;
      padding: 88px;
      margin: 0 auto;
    }
    .input-room{
      border-radius: 6px;
      height: 25px;
      border: solid 2px;
      font-family: 'Russo One', sans-serif;
      width: 100%;
    }
    `;
    this.appendChild(style);

    ///logeo del segundo usuario

    const cs = state.getState();
    const form = this.querySelector(".form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;

      state.setNombreUser2(target.nombre.value);

      state.signInUser2((err) => {
        if (err) {
          console.error("Ocurrio error en el logueo");
        }
        if (cs.messageForRegister == "user not found") {
          alert("no hay un usuario llamado asi");
          Router.go("home-dos");
        }
        if (cs.idUser2 && location.pathname == "/access-room") {
          form.setAttribute("style", "display:none");
          formRoom.setAttribute("style", "display:grid");
        }
      });
    });

    // creamos el acceso a la sala poniendo en regla que solo 2 usuarios puedan conectarse ya que esta pactado asi en la rtdb

    const formRoom = this.querySelector(".form-idRoomExist");

    formRoom.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      cs.roomId = target.idroom.value;

      state.accessToRoom(() => {
        state.subscribe(() => {
          if (cs.dataRtdb[1].userId && location.pathname == "/access-room") {
            Router.go("full-sala");
          } else if (
            !cs.dataRtdb[1].userId &&
            location.pathname == "/access-room"
          ) {
            state.setValuesPlayer2rtdb();
            state.listenRoom();
            // segun los datos (online) de la rtdb redirigimos a la pagina correspondiente

            state.subscribe(() => {
              if (
                cs.dataRtdb[0].online == false ||
                cs.dataRtdb[1].online == false
              ) {
                console.error("somo player is not connected");
              }
              if (
                cs.dataRtdb[0].online == true &&
                cs.dataRtdb[1].online == true &&
                window.location.pathname == "/access-room"
              ) {
                Router.go("waiting-start");
              }
            });
          }
        });
      });
    });
  }
  render() {
    this.innerHTML = `
    
    <div class="container-full-page">
        <div class="container-title"  
            <h1 class="title-page">Ingrese usuario</h1>
        </div>
      <form class="form">
        <label class="label">Nombre</label>
         <div class="container-input">
              <input class="input" type="text" name="nombre" />
         </div>
           <div class="container-button">
              <button-comp class="button">Ingresar</button-comp>
         </div>
      </form> 
       
    <form class="form-idRoomExist">
          <div>
             <input class="input-room" type="text" placeholder="Ingrese su ID de Sala ej:1234" name="idroom" />
          </div>
          <button-comp class="button">Ingresar a sala</button-comp>
       </form>     
    </div>
   
    `;
  }
}
customElements.define("access-room", AccessRoom);
