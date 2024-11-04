class PopularCategories extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="popular-categories">
        <h2>Categorias Populares</h2>
        <div class="categories-container">
          <div class="category-item">
              <img src="./assets/genshin.png" alt="Genshin Impact">
          </div>
          <div class="category-item">
              <img src="./assets/throne_liberty.png" alt="Throne and Liberty">
          </div>
          <div class="category-item">
              <img src="./assets/genshin.png" alt="Genshin Impact">
          </div>
          <div class="category-item">
              <img src="./assets/throne_liberty.png" alt="Throne and Liberty">
          </div>
          <div class="category-item">
              <img src="./assets/genshin.png" alt="Genshin Impact">
          </div>
        </div>
        <div class="view-all">
          <a href="#">Ver todas categorias</a>
        </div>
      </div>
    `;
  }
}

// Definindo o componente com um nome que contém um hífen
customElements.define('popular-categories', PopularCategories);
