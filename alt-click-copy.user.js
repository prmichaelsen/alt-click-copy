// ==UserScript==
// @name                Alt Click Copy
// @namespace           http://tampermonkey.net/
// @version             0.2.0
// @description         Alt click an HTML element on the page to copy it to your clipboard.
// @author              mchpatr
// @match               *://*/*
// @icon                https://github.com/prmichaelsen/alt-click-copy/releases/download/alt-click-copy/save.icon.png
// @run-at              document-start
// @updateUrl           https://github.com/prmichaelsen/alt-click-copy/raw/refs/heads/main/alt-click-copy.user.js
// ==/UserScript==
// Source               https://github.com/prmichaelsen/alt-click-copy/
(() => {
  document.addEventListener("click", function(event){
    const clickedEl = event.target
    if (event.altKey && event.metaKey && clickedEl) {
      event.preventDefault();
      event.stopPropagation();
      if (clickedEl.tagName === 'A') {
        const href = clickedEl.href;
        navigator.clipboard.writeText(href);
        return false;
      }
      const aEl = clickedEl.querySelector('a');
      if (aEl) {
        const href = aEl.href;
        navigator.clipboard.writeText(href);
        return false;
      }
    }
    if (event.altKey && event.shiftKey && clickedEl) {
      event.preventDefault();
      event.stopPropagation();
      if (clickedEl.tagName === 'A') {
        navigator.clipboard.write([new ClipboardItem({
          "text/plain": new Blob(
            [clickedEl.parentElement.innerText],
            { type: "text/plain" }
          ),
          "text/html": new Blob(
            [clickedEl.parentElement.outerHTML],
            { type: "text/html" }
          ),
        })]);
        return false;
      }
      const aEl = clickedEl.querySelector('a');
      if (aEl) {
        navigator.clipboard.write([new ClipboardItem({
          "text/plain": new Blob(
            [aEl.parentElement.innerText],
            { type: "text/plain" }
          ),
          "text/html": new Blob(
            [aEl.parentElement.outerHTML],
            { type: "text/html" }
          ),
        })]);
        return false;
      }
    }
    if (event.altKey && clickedEl && clickedEl.textContent) {
      event.preventDefault();
      event.stopPropagation();
      navigator.clipboard.writeText(clickedEl.textContent);
      return false;
    }
  });
})()
