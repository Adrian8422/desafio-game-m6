import { Router } from "@vaadin/router";
import { state } from "../state";

////ARREGLAR EL ACCES ROOM PORQUE NO FUNCIONA EL INPUT DEL IDROOM, VER COMO PODEMOS ACCEDER DIRECTAMETNE CON EL SIGN IN Y CONTINUAMENTE EL ACCESS ROOM. DALE PAPAAAAAA QUE SE LOGRAAAA

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
      width: 66vh;
      margin: 0 auto;
      color: green;
      font-family: 'Source Code Pro', monospace;
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
      margin-top: 28vh;
      width: 100%;
     display: grid;
     gap: 42px;
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

    ///logeo de segundo usuario

    const cs = state.getState();
    const form = this.querySelector(".form");
    const button = this.querySelector(".button");

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

    // aca creamos el acceso a la sala poniendo en regla que solo 2 usuarios puedan conectarse ya que esta pactado asi en la rtdb
    const inputName = this.querySelector(".input");
    const inputIdRoom = this.querySelector(".idroom");

    const formRoom = this.querySelector(".form-idRoomExist");

    formRoom.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      cs.roomId = target.idroom.value;

      ////TOQUETEAR ESTO ASI ME FUNCIONA BIEN ESTO Y PUEDO SEGUIR AVANZANDO- NO ME TOMA LOS DATOS DEL SUBSCRIBE

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
        // state.subscribe(() => {
        ///ver como hace funcionar el acces to romm poniendoles los filtros para solo poder acceder copn ese usuario a esa sala
        // const dataRtdbUser1 = state.data.dataRtdb[0].userId;
        // const dataRtdbUser2 = state.data.dataRtdb[1].userId;
        // console.log("dataUserr1Parse", dataRtdbUser1);
        // console.log("dataUserr2", dataRtdbUser2);
        // console.log("data del rtdb en posisicon de user2", cs.dataRtdb[1]);
        // if (cs.dataRtdb[1].userId == dataRtdbUser2) {
        // }
        // });
        // state.subscribe(() => {
        //   if (cs.dataRtdb[1].userId) {
        //     // Router.go("home-dos");
        //   } else if (
        //     !cs.dataRtdb[1].userId &&
        //     location.pathname == "/access-room"
        //   ) {
        //     state.setValuesPlayer2rtdb();
        //     state.listenRoom();

        //     state.subscribe(() => {
        //       if (
        //         cs.dataRtdb[0].online == "false" ||
        //         cs.dataRtdb[1].online == "false"
        //       ) {
        //         console.error("players not connected");
        //       }
        //       if (
        //         cs.dataRtdb[0].online == "true" ||
        //         cs.dataRtdb[1].online == "true"
        //       ) {
        //         Router.go("waiting-start");
        //       }
        //     });
        //   }
        // });
      });
    });
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    
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
              <button class="button">Ingresar</button>
      </div>
    </form> 
    
    
    <form class="form-idRoomExist">
          <div>
        
             <input class="input-room" type="text" placeholder="Ingrese su ID de Sala ej:1234" name="idroom" />
          </div>
          <button class="button">Ingresar a sala</button>


       </form>
        
    </div>
    
    `;

    this.appendChild(div);
  }
}
customElements.define("access-room", AccessRoom);
