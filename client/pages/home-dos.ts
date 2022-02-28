import { Router } from "@vaadin/router";

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
    
    `;
    this.appendChild(style);
  }
  addListeners() {}
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
          
              <button-comp>Ingresar a sala</button-comp>
              <button-comp>Nuevo Juego</button-comp>
          
       </div>
    </div>
    
    `;

    this.appendChild(div);
    this.addListeners();
  }
}
customElements.define("home-dos", HomePageDos);
