import { Router } from "@vaadin/router";
import { state } from "../state";

class Register extends HTMLElement {
  connectedCallback() {
    this.render();

    const style = document.createElement("style");
    style.innerHTML = `

    
    .container-form-sign-up{
        display: flex;
        background-color: rgb(24 36 39);
        font-family: 'Russo One', sans-serif;
        flex-direction: column;
        color: whitesmoke;
        font-size: 18px;
        width: 100%;
        height: 97vh;
      
      }
      .label-signup{
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
     
    
      .submit{
        display: grid;
        max-width: 104%;
        height: 199px;
        
        gap: 1px;
        padding: 53px;
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
      .sign-up-title{
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 16vh 16vh 4vh;
      }
      .cloud-register{
          display:none;
          background-color:aqua;
      }
  
    
    
    
    
    `;
    this.appendChild(style);
  }

  addListeners() {
    const cs = state.getState();
    const form = this.querySelector(".submit");
    const button = this.querySelector(".button");
    const cloudRegister = this.querySelector(".cloud-register");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const nombre = target.nombre.value;

      state.setNombre(target.nombre.value);
      state.setState(cs);

      state.signUp(nombre);

      Router.go("home-dos");
    });

    // el mensagge del cloud de registro si fue correcto o no debe figurar en la pantalla home-dos, en esta de registro no

    // button.addEventListener("click", () => {
    //   cloudRegister.setAttribute("style", "display:flex");
    // });
  }
  render() {
    const div = document.createElement("div");

    div.innerHTML = `
         
         <div class="container-form-sign-up">
         <h2 class="sign-up-title">Registrarse</h2>
         <div class="cloud-register">Agregar nube que diga mensage del registro de estado </div>
    
            <form class="submit">
            
                <label class="label-signup" for="nombre">Nombre</label>
            <div>
                <input class="input" type="text" name="nombre">
            </div>
            <div class="container-button">
                 <button class="button">Registrarme</button>
            </div>
           </form>
         </div>
         
         
         
    
    `;
    this.appendChild(div);
    this.addListeners();
  }
}
customElements.define("sign-up", Register);
