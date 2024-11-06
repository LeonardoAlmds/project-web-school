class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="content-navbar">
        <img src="./assets/logo.svg" alt="Logo K+">
        
        <div class="search-bar">
          <button class="search-btn" id="search-btn">
            <i class="fas fa-search"></i>
          </button>
          <input type="text" id="search-input" placeholder="Anúncio, usuário ou categoria">
        </div>

        <nav class="navigation">
          <button id="categories">Categorias <i class="fas fa-chevron-down"></i></button>
          <button class="highlight-btn">Anunciar</button>
          <button class="icon-btn"><i class="fas fa-shopping-cart"></i></button>
          <button class="icon-btn" id="btn-menu"><i class="fas fa-bars"></i></button>
        </nav>
      </div>
    `;

    this.searchBorder();
    this.onClickMenu();
    this.loadThemePreference();
    this.setupCategoriesModal();
  }

  setupCategoriesModal() {
    const categoriesButton = this.querySelector('#categories');
  
    // Verifica se o modal já existe
    let modal = this.querySelector('categories-modal');
    
    if (!modal) {
      // Cria uma instância do modal se não existir
      modal = new CategoriesModal();
      this.appendChild(modal);  // Adiciona o modal ao DOM
    }
  
    categoriesButton.addEventListener('click', async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('http://localhost:8080/api/categories');
        if (response.ok) {
          const categories = await response.json();
          modal.show(categories);  // Exibe o modal com categorias
        } else {
          console.error('Erro ao carregar categorias:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    });
  }
  
  changeTheme(newTheme) {
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('themeChanged')); 
  }
  
  updateBorder() {
    const divInput = this.querySelector('.search-bar');
    const savedTheme = localStorage.getItem('theme');
    divInput.style.border = savedTheme === 'dark' ? '2px solid #343434' : '2px solid #E9E9E9';
  }

  searchBorder() {
    const input = this.querySelector('#search-input');
    const divInput = this.querySelector('.search-bar');
  
    input.addEventListener('focus', () => {
      divInput.style.border = '2px solid #89b3d2';
    });
  
    input.addEventListener('blur', this.updateBorder.bind(this));
  
    window.addEventListener('themeChanged', this.updateBorder.bind(this));
  
    this.updateBorder();
  }

  onClickMenu() {
    const button = this.querySelector('#btn-menu');
  
    button.addEventListener('click', () => {
      const existingMenu = this.querySelector('.menu-options');
      
      if (existingMenu) {
        existingMenu.classList.remove('show');
        existingMenu.addEventListener('transitionend', () => {
          if (!existingMenu.classList.contains('show')) {
            existingMenu.remove();
          }
        }, { once: true });
      } else {
        const menuContainer = document.createElement('div');
        menuContainer.className = 'menu-options';
        menuContainer.innerHTML = `
          <button id="btn-login"><i class="fas fa-sign-in-alt"></i> Entrar</button>
          <button id="btn-dark-theme"><i class="fas fa-moon"></i> Tema Escuro</button>
        `;
        this.appendChild(menuContainer);
  
        setTimeout(() => {
          menuContainer.classList.add('show');
        }, 0);

        this.toggleDarkMode();
      }
    });
  }

  toggleDarkMode() {
    const themeButton = this.querySelector('#btn-dark-theme');
    if (!themeButton) return; // Verificação para evitar erro
  
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
  
      this.updateBorder();
  
      themeButton.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i> Tema Claro'
        : '<i class="fas fa-moon"></i> Tema Escuro';
    });
  
    // Define o texto do botão ao carregar a preferência de tema
    const savedTheme = localStorage.getItem('theme');
    themeButton.innerHTML = savedTheme === 'dark'
      ? '<i class="fas fa-sun"></i> Tema Claro'
      : '<i class="fas fa-moon"></i> Tema Escuro';
  }
  
  loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Verifica se o botão existe antes de tentar definir o conteúdo
  const themeButton = this.querySelector('#btn-dark-theme');
  if (themeButton) {
    themeButton.innerHTML = savedTheme === 'dark'
      ? '<i class="fas fa-sun"></i> Tema Claro'
      : '<i class="fas fa-moon"></i> Tema Escuro';
  }
}
}

customElements.define('main-header', Navbar);
