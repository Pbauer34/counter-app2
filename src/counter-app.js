import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.count = 0;
    this.min= 0;
    this.max = 50;
    this.getColor="white";
  }

  static get properties() {
    return {
      title: { type: String },
      count: { type: Number },
      max: { type: Number },
      min: { type: Number },
      getColor: { type: String }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-pughBlue);  
        
      }
      div {
        padding: 0;
        margin: 0;
      }

      .face{
        display: inline-block;
        text-align: center;
        font-size: var(--ddd-font-size-xl);
        padding: var(--ddd-spacing-30);
        margin: var(--ddd-spacing-30);
      }

      #counter{
        font-size: var(--ddd-font-size-xxl);
        


      }

    

      button:hover {
        background-color: var(--ddd-theme-default-beaverBlue);
        color: white;

      }

      button:focus{
        outline-color:  var(--ddd-theme-default-keystoneYellow);  
      }

      
      
    `];
  }


  

  increment(e)
  {
    if (this.count < this.max){
      this.count ++;
      

    }
    this._getColor();
  }

  decrement(e){
    if (this.count > this.min) {
      this.count --;
      
    }
    this._getColor();
  }
 _getColor(){

 if (this.count === this.min){
  this.getColor = "red";  
  }
  else if (this.count===this.max){
    this.getColor = "green";
  }
  else if(this.count === 18){
    this.getColor = "blue";
  }
  else if(this.count === 21){
    this.getColor = "yellow"
    this.makeItRain();
  }
  else
  {
    this.getColor = "white";
  }
}


updated(changedProperties) {
  if (changedProperties.has('counter')) {
    // do your testing of the value and make it rain by calling makeItRain
  }
}

makeItRain() {
  // this is called a dynamic import. It means it won't import the code for confetti until this method is called
  // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
  // will only run AFTER the code is imported and available to us
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      // This is a minor timing 'hack'. We know the code library above will import prior to this running
      // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
      // this "hack" ensures the element has had time to process in the DOM so that when we set popped
      // it's listening for changes so it can react
      setTimeout(() => {
        // forcibly set the poppped attribute on something with id confetti
        // while I've said in general NOT to do this, the confetti container element will reset this
        // after the animation runs so it's a simple way to generate the effect over and over again
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}
  

  render() {
    return html`

<confetti-container id="confetti">
  <div class="wrapper">
  <div class="face">
    ${this.title}
    
    <div id="counter" style="color: ${this.getColor};">${this.count}</div>
    <button @click="${this.decrement}" ?disabled="${this.counter === this.min}"> - </button>
    <button @click="${this.increment}" ?disabled="${this.counter === this.max}"> + </button>
  </div>
</confetti-container>
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);