document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o recarregamento da página

  // Mostra uma mensagem de confirmação para o usuário
  document.getElementById("confirmation-message").style.display = "block";

  // Limpa o formulário, se desejado
  event.target.reset();
});