document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category");
  const form = document.getElementById("serviceForm");
  const responseMessage = document.getElementById("responseMessage");

  // Carregar categorias
  fetch("http://localhost:8080/api/categories")
      .then(response => response.json())
      .then(categories => {
          categories.forEach(category => {
              const option = document.createElement("option");
              option.value = category.id;  // ID numérico da categoria
              option.textContent = category.name;
              categorySelect.appendChild(option);
          });
      })
      .catch(error => {
          console.error("Erro ao carregar categorias:", error);
      });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const statusMap = {
        "ativo": "active",
        "inativo": "inactive",
        "fora_de_estoque": "out_of_stock"
    };

    // Converter category_id para número
    const categoryId = parseInt(categorySelect.value, 10);  // Garantir que seja um número

    // Obter a data de publicação atual no formato YYYY-MM-DD
    const postedDate = new Date().toISOString().split('T')[0];  // Pega apenas a parte da data (YYYY-MM-DD)

    const formData = {
        category_id: categoryId,  // category_id agora é um número
        name: form.name.value,
        price: parseFloat(form.price.value),  // Garantir que o preço seja um número decimal
        stock_quantity: parseInt(form.stock_quantity.value, 10),  // Garantir que seja um número
        sold_quantity: 0,
        description: form.description.value,
        image_url: "./assets/banner_lorem.png",
        status: statusMap[form.status.value],
        rating: 0,
        posted_date: postedDate  // Data de publicação no formato YYYY-MM-DD
    };

    console.log("Dados enviados para o servidor:", formData);  // Verifique os dados aqui

    try {
        const response = await fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao cadastrar serviço:", errorText);
            responseMessage.textContent = "Erro ao cadastrar serviço. Verifique os detalhes no console.";
            return;
        }

        const data = await response.json();
        responseMessage.textContent = "Serviço cadastrado com sucesso!";
        form.reset();
    } catch (error) {
        console.error("Erro ao cadastrar serviço:", error);
        responseMessage.textContent = "Erro ao cadastrar serviço. Tente novamente.";
    }
  }); 
});
