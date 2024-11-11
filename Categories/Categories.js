// Função para buscar as categorias da API
async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:8080/api/categories');
    const categories = await response.json();
    
    const categoriesList = document.getElementById('categories-s');
    categoriesList.innerHTML = ''; // Limpar lista antes de preencher

    // Armazenar categorias para futura filtragem
    window.categoriesData = categories;

    renderCategories(categories); // Renderiza todas as categorias inicialmente
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

// Função para renderizar as categorias no DOM
function renderCategories(categories) {
  const categoriesList = document.getElementById('categories-s');
  categoriesList.innerHTML = ''; // Limpa a lista de categorias antes de adicionar

  categories.forEach(category => {
    // Criar um container para o card da categoria
    const categoryCard = document.createElement('div');
    categoryCard.classList.add('category-card');
    
    // Criar um container para o banner da categoria
    const categoryBanner = document.createElement('div');
    categoryBanner.classList.add('category-banner');
    categoryBanner.style.backgroundImage = `url(${category.banner_url})`;
    categoryBanner.style.backgroundSize = 'cover';
    categoryBanner.style.backgroundPosition = 'center';
    categoryBanner.style.height = '200px'; // Altura do banner dentro do card

    // Criar o texto com o nome da categoria
    const categoryName = document.createElement('div');
    categoryName.classList.add('category-name');
    categoryName.textContent = category.name;

    // Adicionar o nome da categoria ao banner
    categoryBanner.appendChild(categoryName);
    categoryCard.appendChild(categoryBanner);

    // Adiciona um evento de clique para redirecionar para a página de categorias
    categoryCard.addEventListener('click', () => {
      window.location.href = `category.html?id=${category.id}`; // Redireciona para a página Category.html
    });

    // Adicionar o card ao container principal
    categoriesList.appendChild(categoryCard);
  });
}

// Função de filtro para as categorias
function filterCategories(query) {
  const filteredCategories = window.categoriesData.filter(category =>
    category.name.toLowerCase().includes(query.toLowerCase()) // Filtra pelo nome da categoria
  );
  renderCategories(filteredCategories); // Renderiza as categorias filtradas
}

// Evento para capturar a digitação do usuário e filtrar as categorias
document.getElementById('category-search').addEventListener('input', (event) => {
  const searchTerm = event.target.value; // Texto digitado pelo usuário
  filterCategories(searchTerm); // Filtra as categorias com base no texto
});

// Chama a função para buscar categorias ao carregar a página
window.onload = fetchCategories;
