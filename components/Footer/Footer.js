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
                <li><a href="#">Anunciar</a></li>
                <li><a href="#">Categorias</a></li>
                <li><a href="#">Central de Ajuda</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h3>COMO FUNCIONA</h3>
              <ul>
                <li><a href="#">Como funciona</a></li>
                <li><a href="#">Vantagens</a></li>
                <li><a href="#">Verificador de contas</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h3>INSTITUCIONAL</h3>
              <ul>
                <li><a href="#">Termos de uso</a></li>
                <li><a href="#">Política de privacidade</a></li>
                <li><a href="#">Trabalhe conosco</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          © K+ Services 2024 | TODOS OS DIREITOS RESERVADOS
        </div>
    `;
  }
}

customElements.define('website-footer', Footer);
