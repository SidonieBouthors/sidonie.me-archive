window.addEventListener("DOMContentLoaded", dynamicGaspars)
window.addEventListener("DOMContentLoaded", highlight)
window.addEventListener("DOMContentLoaded", renderTex)
window.addEventListener("DOMContentLoaded", makeToc)

function dynamicGaspars() {
	const gaspar = new URLSearchParams(window.location.search).get("gaspar") || localStorage.getItem("gaspar")
	if (gaspar === null) return
	localStorage.setItem("gaspar", gaspar)
	for (let spanEl of document.getElementsByClassName('gaspar')) {
        spanEl.textContent = gaspar
	}

}

function highlight() {
	document.querySelectorAll('pre code.language-scala').forEach((el) => {
		hljs.highlightElement(el, {languages: ['scala']});
	});
	document.querySelectorAll('pre code.language-bash').forEach((el) => {
		hljs.highlightElement(el, {languages: ['bash']});
	});
	document.querySelectorAll('pre code.language-shell').forEach((el) => {
		hljs.highlightElement(el, {languages: ['shell']});
	});
	document.querySelectorAll('pre code.language-mips').forEach((el) => {
		hljs.highlightElement(el, {languages: ['mipsasm']});
	});
	document.querySelectorAll('pre code.language-c').forEach((el) => {
		hljs.highlightElement(el, {languages: ['c']});
	});
}

function renderTex() {
	renderMathInElement(document.body, {
		delimiters: [
			{left: '$$', right: '$$', display: true},
			{left: '$', right: '$', display: false}
		]
	});
}

function makeToc() {
	const titleEls = [...document.querySelectorAll("h2, h3, h4, h5, h6")]
	const elToItem = el => ({
		level: parseInt(el.tagName[1]),
		text: el.textContent,
		id: el.querySelector("a").getAttribute("id")
	})
	const tocItems = hierarchize(titleEls.map(elToItem), 1)
	const tocHTML = `<nav id="toc"><h2>On this page</h2><ul>${tocItems.map(renderTocEl).join("")}</ul></nav>`
	document.querySelector("#container").insertAdjacentHTML("beforeend", tocHTML)
}

function renderTocEl(el) {
	return `<li><a href="#${el.id}">${el.text}</a>${
		el.children.length > 0 ? `<ul>${el.children.map(renderTocEl).join("")}</ul>` : ""
	}</li>`
}

function hierarchize(items, shiftLevel = 0) {
    let currentChildrenStack = [[]]
    const last = arr => arr[arr.length - 1]
    const currentChildren = () => last(currentChildrenStack)
    const currentLevel = () => currentChildrenStack.length + shiftLevel
    for (const item of items) {
        while (item.level < currentLevel())
            currentChildrenStack.pop()
        if (item.level > currentLevel() + 1)
            throw new Error("Skipped a heading level")
        else if (item.level == currentLevel() + 1)
            currentChildrenStack.push(last(currentChildren()).children)
        const newItem = {...item, children: []}
        currentChildren().push(newItem)
    }
    return currentChildrenStack[0]
}
