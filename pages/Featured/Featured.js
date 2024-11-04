class Featured extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import "./pages/Featured/Featured.css";
      </style>
      <div class="featured">
        <h2>Em Destaque</h2>
        <div class="grid-container">
          <slot name="featured-cards"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('featured-section', Featured);