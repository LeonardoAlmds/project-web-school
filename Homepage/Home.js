document.addEventListener('DOMContentLoaded', () => {
  const featuredSection = document.querySelector('featured-section');

  if (featuredSection) {
    async function fetchFeaturedProducts() {
      try {
        // Fazendo a requisição para buscar os produtos
        const response = await fetch('http://localhost:8080/api/products/top-rated');
        const productsData = await response.json();

        // Se houver dados, preenche os produtos no featured-section
        if (productsData && productsData.length > 0) {
          // Limpa o conteúdo atual
          featuredSection.innerHTML = '';

          // Adiciona cada produto como um card no featured-section
          productsData.forEach((product) => {
            const productCard = document.createElement('product-card');
            productCard.setAttribute('slot', 'featured-cards');
            productCard.setAttribute('image', product.image_url || './assets/capa.jpg');
            productCard.setAttribute('title', product.name);
            productCard.setAttribute('price', `R$ ${parseFloat(product.price).toFixed(2)}`);
            featuredSection.appendChild(productCard);

            // Adiciona o evento de clique para redirecionar para a página do produto
            productCard.addEventListener('click', () => {
              window.location.href = `/product.html?id=${product.id}`;
            });
          });
        }
      } catch (error) {
        console.error('Erro ao buscar os produtos em destaque:', error);
      }
    }

    fetchFeaturedProducts();
  }
});