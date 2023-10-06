// ==UserScript==
// @name        Bring back Twitter headlines
// @namespace   Violentmonkey Scripts
// @match       https://twitter.com/*
// @grant       none
// @version     1.0
// @author      WIStudent
// @description 6.10.2023, 21:01:09
// ==/UserScript==

function addStyles() {
  const styles = `
    .added-title {
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 4px;
      line-height: 16px;
      font-size: 13px;
      font-weight: 400;
      font-family: "TwitterChirp", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overflow-wrap: break-word;
      text-align: center;
      border-radius: 4px;
      display: flex;
      align-items: center;
      max-width: calc(100% - 32px);
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}


function onObserve() {
  document.querySelectorAll('div[data-testid="card.layoutLarge.media"] a[aria-label]:not(.title-added)').forEach(element => {
    if (element.querySelector('div.added-title')) {
      return;
    }
    const ariaLabel = element.getAttribute('aria-label');

    const spanElement = document.createElement('span');
    spanElement.innerHTML = ariaLabel;
    const divElement = document.createElement('div');
    divElement.classList.add('added-title')
    divElement.append(spanElement);

    element.append(divElement);
  });
}

function main() {
  addStyles();
  const observer = new MutationObserver(onObserve);

  observer.observe(document.body, { childList: true, subtree: true });
}

main();
