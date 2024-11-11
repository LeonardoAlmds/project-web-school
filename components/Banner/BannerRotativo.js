class BannerRotativo extends HTMLElement {
  constructor() {
    super();
    this.indiceSlide = 0;
    this.imagens = [
      './assets/fortnite_2.png',
      './assets/vava_2.png',
      './assets/minecraft_2.png'
    ];
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="banner-rotativo">
        <div class="slides">
          ${this.imagens
            .map((src, index) => `<img src="${src}" class="${index === 0 ? 'ativo' : ''}" alt="Imagem ${index + 1}">`)
            .join('')}
        </div>
        <button class="anterior">&#10094;</button>
        <button class="proximo">&#10095;</button>
      </div>
    `;

    this.querySelector('.anterior').addEventListener('click', () => this.mostrarSlide(this.indiceSlide - 1));
    this.querySelector('.proximo').addEventListener('click', () => this.mostrarSlide(this.indiceSlide + 1));

    this.startAutoSlide();
  }

  mostrarSlide(n) {
    const slides = this.querySelectorAll('.slides img');
    slides[this.indiceSlide].classList.remove('ativo');
    this.indiceSlide = (n + slides.length) % slides.length;
    slides[this.indiceSlide].classList.add('ativo');
  }

  startAutoSlide() {
    setInterval(() => {
      this.mostrarSlide(this.indiceSlide + 1);
    }, 5000);
  }
}

customElements.define('banner-rotativo', BannerRotativo);
