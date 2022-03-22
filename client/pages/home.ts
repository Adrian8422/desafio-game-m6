import { Router } from "@vaadin/router";

class HomePage extends HTMLElement {
  connectedCallback() {
    this.render();
    const style = document.createElement("style");
    style.innerHTML = `
    .container-title{
      display: flex;
      font-size: 72px;
      flex-direction: column;
      justify-content: center;
      width: 66vh;
      margin: 0 auto;
      color: #190b0b;
      font-family: 'Source Code Pro', monospace;
      text-shadow: 2px 4px 5px;
      
    }
    .subtitle{
      font-size: 32px;
    }
    .container-inputs{
      display: grid;
      gap: 17px;
      margin: 0 auto;
      width: 66vh;
      font-family: 'Source Code Pro', monospace;
      color:#190b0b;
      text-shadow: 2px 4px 5px;
      font-weight: bolder;
    }
    .container-full-page{
      color:#190b0b;
      margin-top: 16vh;
      width: 100%;
      display: grid;
      gap: 42px;
      font-size: 24px;
    }
    
    `;
    this.appendChild(style);
  }
  addListeners() {
    const inputNo = this.querySelector(".no");
    inputNo.addEventListener("click", () => {
      Router.go("register");
    });
    const inputYes = this.querySelector(".yes");
    inputYes.addEventListener("click", () => {
      Router.go("home-dos");
    });
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    
    <div class="container-full-page">
        <div class="container-title"  
            <h1 class="title-page">Bienvenidxs</h1>
             <h2 class="subtitle"> Estas registradx?</h2>
       </div>
       <div class="container-inputs">
          <div>
              <label for="si">Si </label>
              <input class="yes" id="yes" type="radio" name="select" value="yes" />
          </div>
          <div>
              <label for="no">No </label>
              <input class="no" id="no" type="radio" name="select" value="no"/>
          </div>
       </div>
    </div>
    
    `;

    this.appendChild(div);
    this.addListeners();
  }
}
customElements.define("home-page", HomePage);
