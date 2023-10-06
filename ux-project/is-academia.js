const container = document.getElementById("container");
const topPane = document.getElementById("top-pane");
const bottomPane = document.getElementById("bottom-pane");
const resizeBar = document.getElementById("resize-bar");

let isResizing = false;

resizeBar.addEventListener("mousedown", () => {
  isResizing = true;
});

document.addEventListener("mousemove", (event) => {
  if (!isResizing) return;

  const containerRect = container.getBoundingClientRect();
  const containerTop = containerRect.top;
  const containerHeight = containerRect.height;

  const mouseY = event.pageY;
  const offsetTop = mouseY - containerTop;

  const topPaneHeight = (offsetTop / containerHeight) * 100;
  const bottomPaneHeight = 100 - topPaneHeight;

  topPane.style.height = `${topPaneHeight}%`;
  bottomPane.style.height = `${bottomPaneHeight}%`;
  resizeBar.style.top = `${topPaneHeight}%`;
});

document.addEventListener("mouseup", () => {
  isResizing = false;
});

// Adjust the initial position of the resize bar on page load
window.addEventListener("load", () => {
  const containerRect = container.getBoundingClientRect();
  const containerHeight = containerRect.height;

  const initialTopPaneHeight = (topPane.offsetHeight / containerHeight) * 100;
  const initialBottomPaneHeight = 100 - initialTopPaneHeight;

  topPane.style.height = `${initialTopPaneHeight}%`;
  bottomPane.style.height = `${initialBottomPaneHeight}%`;
  resizeBar.style.top = `${initialTopPaneHeight}%`;
});

function openPopup() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
}