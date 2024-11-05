class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const image = this.getAttribute('image') || './assets/default.jpg';
    const title = this.getAttribute('title') || 'Título do Produto';
    const price = this.getAttribute('price') || 'R$ 0,00';

    this.shadowRoot.innerHTML = `
      <style>
        @import "./components/Card/Card.css";
      </style>
      <div class="card">
        <img src="${image}" alt="Imagem do Produto">
        <h3>${title}</h3>
        <p class="price">${price}</p>
      </div>
    `;
  }
}

customElements.define('product-card', Card);