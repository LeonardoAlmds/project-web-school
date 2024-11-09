class Featured extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isMobile = window.matchMedia("(max-width: 1600px)").matches;
    this.itemsToShow = this.isMobile ? 8 : 12; // Define o número inicial de itens com base na largura da tela
    this.itemsIncrement = this.isMobile ? 4 : 6; // Define o incremento com base na largura da tela
  }

  connectedCallback() {
    this.render();

    // Observa mudanças na largura da tela e ajusta `itemsToShow` e `itemsIncrement` conforme necessário
    window.matchMedia("(max-width: 1600px)").addEventListener('change', (e) => {
      this.isMobile = e.matches;
      this.itemsToShow = this.isMobile ? 8 : 12;
      this.itemsIncrement = this.isMobile ? 4 : 6;
      this.limitItems(); // Reaplica a limitação de itens após ajuste
      this.render();
    });

    // Configura o comportamento do botão "Ver mais"
    this.shadowRoot.addEventListener('click', (event) => {
      if (event.target.id === 'ver-mais-btn') {
        this.showMoreItems();
      }
    });

    // Observa mudanças no slot para limitar itens quando o conteúdo mudar
    const slot = this.shadowRoot.querySelector('slot[name="featured-cards"]');
    slot.addEventListener('slotchange', () => {
      this.limitItems();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import "./components/Featured/Featured.css";
      </style>
      <div class="featured">
        <h2 id="title-featured">Em Destaque</h2>
        <div class="grid-container">
          <slot name="featured-cards"></slot>
        </div>
        <div class="ver-mais-div" style="display: none;">
          <hr>
          <button class="ver-mais" id="ver-mais-btn">Ver mais serviços</button>
          <hr>
        </div>
      </div>
    `;
  }

  limitItems() {
    const items = this.querySelectorAll('[slot="featured-cards"]');
    const verMaisDiv = this.shadowRoot.querySelector('.ver-mais-div');

    // Exibe apenas o número inicial de itens
    items.forEach((item, index) => {
      item.style.display = index < this.itemsToShow ? 'block' : 'none';
    });

    // Exibe o botão "Ver mais" apenas se houver mais itens do que o número inicial a mostrar
    verMaisDiv.style.display = items.length > this.itemsToShow ? 'flex' : 'none';
  }

  showMoreItems() {
    const items = this.querySelectorAll('[slot="featured-cards"]');
    // Incrementa o número de itens a exibir com base na largura da tela
    this.itemsToShow += this.itemsIncrement;
    this.limitItems(); // Reaplica a limitação de itens
  }
}

customElements.define('featured-section', Featured);