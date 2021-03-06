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
    margin: 0 auto;
  }
  .label{
    font-size: 20px;
    width: 73px;
    border-radius: 4px;
    margin: 0 0 -20px 0;
    height: 30px;
    text-shadow: 2px 2px 1px black;
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

    ////ACA HACEMOS LA VERIFICAON DE QUE USE EL ID USER DEL NOMBRE QUE COLOCO CUANDO SE REGISTRO

    nuevoJuego.addEventListener("click", () => {
      if (cs.idUser1) {
        state.askNewRoom(() => {
          state.accessToRoom(() => {
            state.setValuesPlayer1Rtdb();
            Router.go("share-code");
          });
        });
      } else if (cs.idUser1 == "") {
        console.log(
          "entro por donde el usuario todavia no esta logueado y necesita loguearse para poder crear sala"
        );
        containerInputs.setAttribute("style", "display:none");
        form.setAttribute("style", "display:grid");
      }
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
              state.setValuesPlayer1Rtdb();
            }
          });
        });
      });
    });
    ///Redirect a la page access room para logear en ella al user2
    accederSala.addEventListener("click", () => {
      Router.go("access-room");
    });
  }
  render() {
    this.innerHTML = `
    
    <div class="container-full-page">
        <div class="container-title"  
            <h1 class="title-page">Piedra,
            Papel ??
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
