class Featured extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isMobile = window.matchMedia("(max-width: 1600px)").matches;
  }

  connectedCallback() {
    this.render();

    // Observa mudanças na largura da tela
    window.matchMedia("(max-width: 1600px)").addEventListener('change', (e) => {
      this.isMobile = e.matches;
      this.render();
    });

    // Configura o redirecionamento do botão "Ver mais"
    this.shadowRoot.addEventListener('click', (event) => {
      if (event.target.id === 'ver-mais-btn') {
        window.location.href = '/pagina-de-servicos'; // Ajuste o caminho da página de destino
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import "./components/Featured/Featured.css";
      </style>
      <div class="featured">
        <h2>Em Destaque</h2>
        <div class="grid-container">
          <slot name="featured-cards"></slot>
        </div>
        ${this.isMobile ? `<div class="ver-mais-div"><hr><button class="ver-mais" id="ver-mais-btn">Ver mais serviços</button><hr></div>` : ''}
      </div>
    `;

    const slot = this.shadowRoot.querySelector('slot[name="featured-cards"]');
    slot.addEventListener('slotchange', () => {
      if (this.isMobile) this.limitItems();
    });
  }

  limitItems() {
    const items = this.querySelectorAll('[slot="featured-cards"]');
    items.forEach((item, index) => {
      item.style.display = index < 8 ? 'block' : 'none';
    });
  }
}

customElements.define('featured-section', Featured);
