class CategoriesModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import "./components/CategoriesModal/CategoriesModal.css";
      </style>
      <div class="modal hidden" id="categories-modal">
        <div class="modal-content">
          <span class="close-btn" id="close-modal">&times;</span>
          <h2>Categorias</h2>
          <ul id="categories-list"></ul>
        </div>
      </div>
    `;

    // Verifica o tema armazenado no localStorage e aplica os estilos para a barra de rolagem se for "dark"
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.applyDarkScrollbar();
    }
  }

  show(categories) {
    console.log(categories); // Verifique os dados das categorias

    const categoriesList = this.shadowRoot.querySelector('#categories-list');
    const modal = this.shadowRoot.querySelector('#categories-modal');
    const closeModalButton = this.shadowRoot.querySelector('#close-modal');

    categoriesList.innerHTML = ''; // Limpa a lista

    // Verifica se 'categories' é um array e tem itens
    if (Array.isArray(categories) && categories.length > 0) {
      categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.classList.add('category-item');

        const icon = document.createElement('img');
        icon.classList.add('category-icon');
        icon.src = category.icon_url;
        listItem.appendChild(icon);

        // Cria o nome da categoria
        const name = document.createElement('span');
        name.textContent = category.category || 'Categoria sem nome';
        listItem.appendChild(name);

        // Adiciona o link para a página específica da categoria
        listItem.addEventListener('click', () => {
          window.location.href = `/categoria/${category.id}`; // Modifique a URL conforme necessário
        });

        categoriesList.appendChild(listItem);
      });
    } else {
      // Exibe uma mensagem se não houver categorias
      const listItem = document.createElement('li');
      listItem.textContent = 'Nenhuma categoria encontrada';
      categoriesList.appendChild(listItem);
    }

    modal.classList.remove('hidden');

    closeModalButton.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  applyDarkScrollbar() {
    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar {
        width: 12px; /* Largura da barra de rolagem */
      }

      ::-webkit-scrollbar-track {
        background: #333; /* Cor do trilho (a parte de fundo da barra de rolagem) */
      }

      ::-webkit-scrollbar-thumb {
        background: #555; /* Cor da parte que você arrasta (thumb) */
        border-radius: 10px; /* Deixa os cantos arredondados */
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #888; /* Cor ao passar o mouse sobre a thumb */
      }
    `;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define('categories-modal', CategoriesModal);
