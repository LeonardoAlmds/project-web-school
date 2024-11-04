class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="navbar">
        <div class="content-navbar">
          <img src="./assets/logo.svg" alt="Logo K+">
          
          <div class="search-bar">
            <button class="search-btn" id="search-btn">
              <i class="fas fa-search"></i>
            </button>
            <input type="text" id="search-input" placeholder="Anúncio, usuário ou categoria">
          </div>

          <nav class="navigation">
            <a href="#">Categorias <i class="fas fa-chevron-down"></i></a>
            <button class="highlight-btn">Anunciar</button>
        
            <button class="icon-btn" id="">
              <i class="fas fa-shopping-cart"></i>
            </button>

            <button class="icon-btn" id="btn-menu">
              <i class="fas fa-bars"></i>
            </button>
          </nav>
        </div>
      </header>
    `;

    this.searchBorder();
    this.onClickMenu();
    this.loadThemePreference();
  }

  searchBorder() {
    const input = this.querySelector('#search-input');
    const divInput = this.querySelector('.search-bar');

    input.addEventListener('focus', () => {
      divInput.style.border = '2px solid #89b3d2'; 
    });

    input.addEventListener('blur', () => {
      divInput.style.border = '2px solid #E9E9E9';
    });
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

    themeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
  }

  loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }
}

customElements.define('main-header', Navbar);
