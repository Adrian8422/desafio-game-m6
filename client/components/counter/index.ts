import { state } from "../../state";
class CounterCom extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = `
      .container {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-box-reflect: below 1px linear-gradient(#0001, #0004);
      }
      .container .loader {
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: #17bcbc7a;
        animation: animate 3s linear;
      }
      @keyframes animate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .container .loader::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to top, transparent, rgba(0, 255, 249, 0.4));
        background-size: 100px 180px;
        background-repeat: no-repeat;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
      }
      .container .loader::after {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 20px;
        background: #00fff9;
        border-radius: 50%;
        z-index: 10;
        box-shadow: 0 0 10px #00fff9, 0 0 20px #00fff9, 0 0 30px #00fff9,
          0 0 40px #00fff9, 0 0 50px #00fff9, 0 0 60px #00fff9, 0 0 70px #00fff9,
          0 0 80px #00fff9, 0 0 90px #00fff9, 0 0 100px #00fff9;
      }
      .container .loader span {
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 20px;
        background: #22dbff99;
        border-radius: 50%;
      }
      
      
      
      .numero{
        position: relative;
        font-family: 'Odibee Sans', cursive;
        font-size: 150px;
        color: #3a3333;
        text-align: center;
     }`;
    this.shadow.appendChild(style);
    this.render();
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="container">
       <div class="loader"> <span>
        <div class="numero" >3</div>
       </div>
      </div>`;

    let number: any = div.querySelector(".numero");

    let counter = 3;
    let limitCounter = 0;

    var variable = setInterval(() => {
      --counter;
      number.textContent = `${counter}`;

      if (counter <= limitCounter) {
        const currentState = state.getState().currentGame;
        if (currentState.myPlay) {
          clearInterval(variable);
        } else {
          counter = 0;
          clearInterval(variable);
        }
      }
    }, 1000);
    this.shadow.appendChild(div);
  }
}

customElements.define("counter-element", CounterCom);
