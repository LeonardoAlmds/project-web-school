class PopularCategories extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="popular-categories">
        <h2>Categorias Populares</h2>
        <div class="categories-container">
          <!-- As categorias serão inseridas aqui dinamicamente -->
        </div>
        <div class="view-all">
          <a href="/categories.html">Ver todas categorias</a>
        </div>
      </div>
    `;

    this.fetchCategories();
  }

  async fetchCategories() {
    try {
      const response = await fetch('http://localhost:8080/api/categories/top');
      
      if (!response.ok) {
        throw new Error("Erro ao buscar categorias populares");
      }
      
      const categories = await response.json();
      this.renderCategories(categories);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  }

  renderCategories(categories) {
    const container = this.querySelector('.categories-container');
    container.innerHTML = ''; // Limpa o container antes de inserir os novos itens

    categories.forEach(category => {
      const categoryItem = document.createElement('div');
      categoryItem.classList.add('category-item');

      // Cria o link com o id da categoria
      const categoryLink = document.createElement('a');
      categoryLink.href = `category.html?id=${category.id}`;

      categoryLink.innerHTML = `
        <img src="${category.banner_url}" alt="${category.name}">
      `;

      categoryItem.appendChild(categoryLink);
      container.appendChild(categoryItem);
    });
  }
}

// Definindo o componente com um nome que contém um hífen
customElements.define('popular-categories', PopularCategories);
