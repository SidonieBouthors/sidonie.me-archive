class Header extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if (this.getAttribute("hero")=="no-hero"){
            this.innerHTML = `
            <header>
            <img src="../img/logo.svg" alt="SidoniePyLogo" class="logo">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/recipes">Recipes</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            </header>`;
        } 
        else if (this.getAttribute("hero") != null) {
            this.innerHTML = `
            <header>
            <img src="../img/logo.svg" alt="SidoniePyLogo" class="logo">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/recipes">Recipes</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            </header>

            <section class="page-hero ${this.getAttribute("hero")}">
                <div class="container">
                    <h1 class="title">${this.title}</h1>
                </div>
            </section>`;
        }
        else {
            this.innerHTML = `
            <header>
            <img src="../img/logo.svg" alt="SidoniePyLogo" class="logo">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/recipes">Recipes</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            </header>

            <section class="page-hero"
                    style="background-image: url('${this.getAttribute("bg")}');
                    background-color:rgba(0,0,0, 0.6);
                    background-blend-mode: overlay;">
                <div class="container">
                    <h1 class="title">${this.title}</h1>
                </div>
            </section>`;
        }
    }
}
customElements.define('header-component', Header);