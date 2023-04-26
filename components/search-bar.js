class SearchBar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
    this.innerHTML = `
    <div class="search-bar">
        <input type="text" class="search-bar__input"
        placeholder="search in recipes..." aria-label="search" 
        id="searchbar" onkeyup="checkEnterClick(event)" name="search"/>
        
        <button class="search-bar__submit" onclick="search()">
            <img src="img/search.png" 
            aria-label="submit search">
        </button>
    </div>`;
    }
}
customElements.define('search-bar', SearchBar);