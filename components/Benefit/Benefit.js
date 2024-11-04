class Benefit extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="featured-section">
        <div class="feature-item">
          <h3>Compra segura</h3>
          <p>entrega garantida ou o seu dinheiro de volta.</p>
        </div>
        <div class="feature-item">
          <h3>Suporte 24 horas</h3>
          <p>equipe pronta para te atender sempre que precisar.</p>
        </div>
        <div class="feature-item">
          <h3>Melhores Services</h3>
          <p>o melhor site de services da america latina.</p>
        </div>
      </div>
    `;
  }
}

customElements.define('website-benefits', Benefit);
