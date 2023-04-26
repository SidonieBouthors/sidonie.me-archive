class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
    this.innerHTML = `
        <footer>
            <div class="container">
                <div class="col-3">
                    <p>
                        Hope you like this website and found what you were looking for!
                    </p>
                    <p>
                        Here are some of my favorite YouTube Channels related to cooking & programming if you'd like to check it out.
                    </p>
                </div>
                <div class="col-1">
                    <ul class="unstyled-list">
                        <li><strong>Cooking Channels</strong></li>
                        <li><a href="https://www.youtube.com/user/FrenchGuyCooking">Alex</a></li>
                        <li><a href="https://www.youtube.com/channel/UChBEbMKI1eCcejTtmI32UEw">Joshua Weissman</a></li>
                        <li><a href="https://www.youtube.com/user/BrothersGreenEats">Pro Home Cooks</a></li>
                    </ul>
                </div>

                <div class="col-1">
                    <ul class="unstyled-list">
                        <li><strong>Science Channels</strong></li>
                        <li><a href="https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw">3Blue1Brown</a></li>
                        <li><a href="https://www.youtube.com/channel/UC4JX40jDee_tINbkjycV4Sg">Tech with Tim</a></li>
                        <li><a href="https://www.youtube.com/user/keeroyz">Two Minute Papers</a></li>
                    </ul>
                </div>
            </div>
        </footer>`;
    }
}
customElements.define('footer-component', Footer);