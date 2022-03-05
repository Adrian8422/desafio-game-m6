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
  }

  signIn() {
    const cs = state.getState();
    const form = this.querySelector(".form");
    const button = this.querySelector(".button");
    const formRoom = this.querySelector(".form-idRoomExist");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      state.setState(cs);
      state.setNombreUser2(target.nombre.value);
      state.setState(cs);
      state.signInUser2(() => {
        state.accessToRoom();
      });
    });
    button.addEventListener("click", () => {
      form.setAttribute("style", "display:none");
      formRoom.setAttribute("style", "display:grid");
    });
  }
  enterRoom() {
    const inputName = this.querySelector(".input");
    const inputIdRoom = this.querySelector(".idroom");
    const cs = state.getState();
    const formRoom = this.querySelector(".form-idRoomExist");

    formRoom.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      state.data.roomId = target.idroom.value;
      state.setState(cs);
      state.accessToRoom(state.data.roomId);
      console.log("evento submit del acces room", state.data.roomId);
      state.setState(cs);
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
    this.signIn();
    this.enterRoom();
  }
}
customElements.define("access-room", AccessRoom);
