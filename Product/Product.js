const productId = new URLSearchParams(window.location.search).get('id');

if (productId) {
  async function fetchProductData() {
    try {
      // Busca os dados do produto
      const productResponse = await fetch(`http://localhost:8080/api/products?id=${productId}`);
      const productData = await productResponse.json();

      // Preenche os dados do produto
      const productNameElem = document.getElementById('product-name');
      if (productNameElem) productNameElem.textContent = productData.name;

      const productDescriptionElem = document.getElementById('product-description');
      if (productDescriptionElem) productDescriptionElem.textContent = productData.description;

      const productPriceElem = document.getElementById('product-price');
      if (productPriceElem) productPriceElem.textContent = `R$ ${parseFloat(productData.price).toFixed(2)}`;

      const productStockElem = document.getElementById('product-stock');
      if (productStockElem) productStockElem.textContent = `${productData.stock_quantity}`;

      const productSoldElem = document.getElementById('product-sold');
      if (productSoldElem) productSoldElem.textContent = `${productData.sold_quantity}`;

      const availableCountElem = document.getElementById('available-count');
      if (availableCountElem) availableCountElem.textContent = `${productData.stock_quantity - productData.sold_quantity}`;

      const productImageElem = document.getElementById('product-image');
      if (productImageElem) productImageElem.src = productData.image_url || './assets/lol.png';

      // Busca a categoria do produto
      const categoryResponse = await fetch(`http://localhost:8080/api/categories?id=${productData.category_id}`);
      const categoryData = await categoryResponse.json();

      const categoryNameElem = document.getElementById('category-name');
      if (categoryNameElem) categoryNameElem.textContent = categoryData.name;

      const categoryIconElem = document.getElementById('category-icon');
      if (categoryIconElem) categoryIconElem.src = categoryData.icon_url;

      // Atualiza a classificação
      const ratingValue = productData.rating || 0;
      const ratingValueElem = document.getElementById('rating-value');
      if (ratingValueElem) ratingValueElem.textContent = ratingValue;

      const ratingStars = document.getElementById('rating-stars');
      if (ratingStars) {
        ratingStars.innerHTML = '';
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('i');
          star.classList.add('fas', 'fa-star');
          if (i < ratingValue) {
            star.classList.add('filled');
          }
          ratingStars.appendChild(star);
        }
      }

      // Exibe perguntas sobre o produto
      await displayQuestions();

      // Função para enviar pergunta
      const askQuestionBtn = document.getElementById('ask-question-btn');
      const newQuestionTextarea = document.getElementById('new-question');

      if (askQuestionBtn && newQuestionTextarea) {
        askQuestionBtn.addEventListener('click', async () => {
          const questionText = newQuestionTextarea.value.trim();
          if (questionText) {
            try {
              const questionData = { product_id: productId, question: questionText };
              await fetch('http://localhost:8080/api/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questionData),
              });

              // Limpa o campo de texto e exibe todas as perguntas atualizadas
              newQuestionTextarea.value = '';
              await displayQuestions(); // Atualiza lista de perguntas para exibir a nova
            } catch (error) {
              console.error('Erro ao enviar pergunta:', error);
            }
          }
        });
      }
    } catch (error) {
      console.error('Erro ao buscar dados do produto:', error);
    }
  }

  async function displayQuestions() {
    const questionsList = document.getElementById('questions-list');
    try {
      const questionsResponse = await fetch(`http://localhost:8080/api/questions?product_id=${productId}`);
      const questionsData = await questionsResponse.json();
      questionsList.innerHTML = '';
      questionsData.forEach((question) => appendQuestion(question));
    } catch (error) {
      console.error('Erro ao buscar perguntas:', error);
    }
  }

  function appendQuestion(question) {
    const questionsList = document.getElementById('questions-list');
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <p><strong>Anônimo:</strong> ${question.question}</p>
      <p><em>Criado em: ${new Date(question.created_at).toLocaleString()}</em></p>
      <div class="question-answer">Resposta: (Resposta ainda não fornecida)</div>
    `;
    questionsList.appendChild(questionElement);
  }

  fetchProductData();
}

document.getElementById('share-button').addEventListener('click', async () => {
  if (navigator.share) {
    try {
      const shareData = {
        title: document.getElementById('product-name').textContent,
        text: 'Confira este produto!',
        url: window.location.href
      };
      await navigator.share(shareData);
      console.log('Produto compartilhado com sucesso');
    } catch (error) {
      console.error('Erro ao compartilhar o produto:', error);
    }
  } else {
    alert('Compartilhamento não suportado neste navegador');
  }
});
