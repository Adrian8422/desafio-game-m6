class FullSala extends HTMLElement {
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

    .text{
        max-width:25vh;
        font-size:25px;
        margin: 0 auto
    }
    .container-hands{
        display:flex;
        flex-direction:row;
        justify-content: space-evenly;
      }
    `;
    this.appendChild(style);
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `

    <div class="container-page">
        <div class="container-title">
            <h1 class="title">Piedra, 
            papel ó 
            tijera</h1>
        </div>

     <p class="text">Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.</p>
     
    
       <div class="container-hands">       
         <hands-el jugada="piedra"></hands-el>
         <hands-el jugada="papel"></hands-el>
         <hands-el jugada="tijera"></hands-el>
       </div>
    </div> 
    `;

    this.appendChild(div);
  }
}
customElements.define("full-sala", FullSala);
