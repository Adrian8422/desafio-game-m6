class ButtonComp extends HTMLElement{
 
  constructor(){
    super()
    this.render()
    
  }
  connectedCallback(){
    const style= document.createElement("style")
    style.innerHTML= `
    .button-elem{
      border-radius: 18px;
      font-family: 'Source Code Pro', monospace;
      background-color: #102626;
      height: 84px;
      width: 360px;
      font-size: 29px;
      border:solid 6px #00fff9;
      color: silver;
      
    } 
    `
    this.appendChild(style)
    
    
  }
  render(){
   this.innerHTML = `
   <button class="button-elem">${this.textContent}</button>
   `
    
  }
}
customElements.define("button-comp", ButtonComp)