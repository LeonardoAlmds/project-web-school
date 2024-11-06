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

    this.fetchCategories()
  }

  fetchCategories() {
    if (typeof axios !== 'undefined') { // Verifica se o axios está disponível
      axios
        .get(`http://localhost:8080/api/categories`)
        .then((response) => {
          const resp = response.data;
          console.log(resp);
        })
        .catch(error => console.error("Erro ao buscar categorias:", error));
    } else {
      console.error("Axios não está disponível");
    }
  }
}

// Definindo o componente com um nome que contém um hífen
customElements.define('popular-categories', PopularCategories);
