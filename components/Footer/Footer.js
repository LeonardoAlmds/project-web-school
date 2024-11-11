class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="footer-container">
        <div class="footer-section sobre">
          <h3>SOBRE</h3>
          <p>No mundo dos jogos, o tempo é precioso e a evolução pode ser desafiadora. Pensando nisso, criamos o K+ Services, um software especializado na venda de serviços para gamers que buscam melhorar suas experiências e conquistar novos níveis.</p>
          <div class="social-icons">
            <a href="#"><i class="fab fa-discord"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="content-footer-right">
          <div class="footer-section">
            <h3>ACESSO RÁPIDO</h3>
            <ul>
              <li><a href="./announce.html">Anunciar</a></li>
              <li><a href="./categories.html">Categorias</a></li>
              <li><a href="./about.html">Sobre</a></li>
            </ul>
          </div>
          <div class="newsletter">
            <h3>Inscreva-se para receber novidades!</h3>
            <form id="newsletter-form">
              <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required>
              <button type="submit">Inscrever-se</button>
            </form>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        © K+ Services 2024 | TODOS OS DIREITOS RESERVADOS
      </div>
    `;

    // Adiciona o evento de envio do formulário
    const form = this.querySelector('#newsletter-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Previne o comportamento padrão do formulário

      const email = this.querySelector('#email').value;

      // Verifique se o email é válido
      if (this.isValidEmail(email)) {
        this.sendEmail(email);
      } else {
        alert("Por favor, insira um e-mail válido.");
      }
    });

    // Carrega o SDK do EmailJS
    const scriptEmailJS = document.createElement('script');
    scriptEmailJS.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    scriptEmailJS.onload = () => {
      // Inicializa o EmailJS com a chave pública após o carregamento do script
      emailjs.init("x_qXyO_YJl-4QhKVh");
    };
    document.body.appendChild(scriptEmailJS);
  }

  // Função para verificar se o email é válido
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Função para enviar o email com EmailJS
  sendEmail(email) {
    emailjs.send('service_w3lqgjt', 'template_qpvntwa', {
      to_email: email  // Passa o e-mail inserido no campo de e-mail
    })
    .then((response) => {
      console.log('E-mail enviado com sucesso!', response);
      alert('Você se inscreveu com sucesso!');
      
      // Limpa o campo de entrada de e-mail
      this.querySelector('#email').value = '';
    }, (error) => {
      console.log('Erro ao enviar o e-mail:', error);
      alert('Houve um erro ao tentar enviar o e-mail. Tente novamente mais tarde.');
    });
  }  
}

customElements.define('website-footer', Footer);
