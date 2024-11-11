const categoryId = new URLSearchParams(window.location.search).get('id');

if (categoryId) {
  async function fetchCategoryData() {
    try {
      // Busca os dados da categoria
      const categoryResponse = await fetch(`http://localhost:8080/api/categories?id=${categoryId}`);
      const categoryData = await categoryResponse.json();
      document.getElementById('category-name').textContent = categoryData.name || 'Categoria';
      document.getElementById('category-image').src = categoryData.icon_url || 'https://via.placeholder.com/80';

      // Busca os produtos relacionados a essa categoria
      const productsResponse = await fetch(`http://localhost:8080/api/products?category_id=${categoryId}`);
      const productsData = await productsResponse.json();

      const shadowHost = document.querySelector('featured-section');

      if (shadowHost && shadowHost.shadowRoot) {
        const shadowRoot = shadowHost.shadowRoot;
        const featuredSection = shadowRoot.querySelector('.featured');

        let gridContainer = shadowRoot.querySelector('.grid-container');
        if (!gridContainer) {
          gridContainer = document.createElement('div');
          gridContainer.classList.add('grid-container');
          featuredSection.appendChild(gridContainer);
        }

        let productsToShow = window.innerWidth > 1600 ? 12 : 8;  // 12 para telas grandes, 8 para pequenas
        let productsIncrement = window.innerWidth > 1600 ? 6 : 4; // Incremento de 6 ou 4 produtos
        let displayedProducts = productsData.slice(0, productsToShow); // Armazena os produtos visíveis inicialmente
        const totalProducts = productsData.length;

        function updateProductDisplay() {
          gridContainer.innerHTML = '';

          displayedProducts.forEach((product, index) => {
            const productCard = document.createElement('product-card');
            productCard.setAttribute('slot', 'featured-cards');
            productCard.setAttribute('image', product.image_url || './assets/capa.jpg');
            productCard.setAttribute('title', product.name);
            productCard.setAttribute('price', `R$ ${parseFloat(product.price).toFixed(2)}`);
            gridContainer.appendChild(productCard);

            // Adiciona evento de clique para redirecionar para a página do produto
            productCard.addEventListener('click', () => {
              window.location.href = `/product.html?id=${product.id}`;
            });

            setTimeout(() => {
              productCard.classList.add('visible');
            }, index * 100); // Atraso progressivo baseado no índice do produto
          });

          const loadMoreBtn = shadowRoot.querySelector('.ver-mais-div');
          if (loadMoreBtn) {
            if (productsToShow >= totalProducts) {
              loadMoreBtn.style.display = 'none';
            } else {
              loadMoreBtn.style.display = '';  // Exibe o botão "Ver mais" se houver mais produtos
            }

            // Animação no "Ver mais"
            loadMoreBtn.addEventListener('click', () => {
              // Marca que estamos atualizando os produtos
              isUpdating = true;

              // Aplica uma opacidade baixa durante o carregamento dos novos produtos
              gridContainer.style.transition = 'all 0.5s ease-in-out';
              gridContainer.style.opacity = 0;

              // Incrementa a quantidade de produtos a serem exibidos
              productsToShow += productsIncrement;
              displayedProducts = productsData.slice(0, productsToShow);

              // Após a animação de desaparecer, atualiza os produtos e faz aparecer de novo
              setTimeout(() => {
                updateProductDisplay();

                // Controla a exibição do botão "Ver mais"
                if (displayedProducts.length >= totalProducts) {
                  loadMoreBtn.style.display = 'none';
                } else {
                  loadMoreBtn.style.display = '';
                }

                // Restaura a opacidade após a atualização
                gridContainer.style.opacity = 1; // Restaura a opacidade

                isUpdating = false;
              }, 500); // Tempo para que a animação de desaparecer aconteça antes de atualizar os produtos
            });
          }
        }

        updateProductDisplay();

        // Debounce para a pesquisa
        const searchInput = document.getElementById('product-search');
        if (searchInput) {
          let timeout;
          let isUpdating = false; // Flag para controlar a atualização dos produtos

          searchInput.addEventListener('input', () => {
            clearTimeout(timeout);  // Limpa o timeout anterior

            // Espera 300ms de inatividade antes de realizar a pesquisa
            timeout = setTimeout(() => {
              const searchTerm = searchInput.value.toLowerCase();

              // Marca que estamos atualizando os produtos
              isUpdating = true;

              // Aplica uma opacidade baixa durante a pesquisa
              gridContainer.style.transition = 'all 0.5s ease-in-out';
              gridContainer.style.opacity = 0;

              // Filtra os produtos
              const filteredProducts = productsData.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
              );

              // Atualiza os produtos exibidos
              displayedProducts = filteredProducts.slice(0, productsToShow);

              // Após a animação de desaparecer, atualiza os produtos e faz aparecer de novo
              setTimeout(() => {
                updateProductDisplay();

                // Controla a exibição do botão "Ver mais"
                const loadMoreBtn = shadowRoot.querySelector('.ver-mais-div');
                if (loadMoreBtn) {
                  if (displayedProducts.length >= filteredProducts.length) {
                    loadMoreBtn.style.display = 'none';
                  } else {
                    loadMoreBtn.style.display = '';
                  }
                }

                // Restaura a opacidade após a atualização
                gridContainer.style.opacity = 1; // Restaura a opacidade

                isUpdating = false;
              }, 500); // Tempo para que a animação de desaparecer aconteça antes de atualizar os produtos
            }, 1000); // Tempo de atraso de 1000ms
          });
        }
      } else {
        console.error('Elemento featured-section ou shadowRoot não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da categoria ou produtos:', error);
    }
  }

  fetchCategoryData();
}

document.addEventListener('DOMContentLoaded', () => {
  const shadowHost = document.querySelector('featured-section');

  if (shadowHost && shadowHost.shadowRoot) {
    const shadowRoot = shadowHost.shadowRoot;
    const featured = shadowRoot.querySelector('.featured');

    if (featured) {
      featured.style.marginTop = '60px';
      featured.style.marginBottom = '60px';
    }

    const featuredH2 = shadowRoot.querySelector('#title-featured');
    if (featuredH2) {
      featuredH2.style.display = 'none';
    }
  }
});
