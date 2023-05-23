class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
    this.innerHTML = `
    <footer>
        <div class="container footer-container">
            <div class="footer-col">
                <p>
                    Hope you like this website and found what you were looking for!
                </p>
                <p>
                    ⓒ Sidonie Bouthors 2021. All rights reserved
                </p>
            </div>
            

            <div class="footer-col">
                <h3>Social Media</h3>
                <ul class="unstyled-list">
                    <li ><a href="https://www.linkedin.com/in/sidonie-bouthors/" target="_blank" rel="noopener noreferrer">
                        <img class="footer-icon"
                            alt="linkedin logo"
                            src="../img/icons/linkedin-logo-round.svg"> LinkedIn
                    </a></li>
                    <li><a href="https://t.me/sidonie_b" target="_blank" rel="noopener noreferrer">
                        <img class="footer-icon"
                        alt="telegram logo"
                        src="../img/icons/telegram-logo-round.svg"> Telegram
                    </a></li>
                    <li><a href="mailto:sidonie@bouthors.com" target="_blank" rel="noopener noreferrer">
                        <img class="footer-icon"
                        alt="github logo"
                        src="../img/icons/email-logo-round.svg"> Email
                    </a></li>
                    <li><a href="https://github.com/SidonieBouthors" target="_blank" rel="noopener noreferrer">
                        <img class="footer-icon"
                        alt="github logo"
                        src="../img/icons/github-logo-round.svg"> GitHub
                    </a></li>
                    
                </ul>
            </div>
        </div>
    </footer>`;
    }
}
customElements.define('footer-component', Footer);