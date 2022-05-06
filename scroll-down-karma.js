// ==UserScript==
// @name     Scroll Down Karma 985971
// @version  1
// @grant    none
// ==/UserScript==

let attemptCount = 0;

const main = () => {
  try {
    attemptCount++;
    if (attemptCount > 30) {
      clearInterval(mainInterval);
      return;
    }
    
    const appLogPrefix = '[scroll down karma]';
    const url = window.location;
    if (!url || !url.toString() === 'http://localhost:9876/') {
      console.log(`${appLogPrefix} not a url`);
      return;
    }
    const runnerIframe = document.querySelector('iframe');
    if (!runnerIframe) {
      console.log(`${appLogPrefix} no runnerIframe element found, returning`);
      return;
    }
    const runnerContentDocument = runnerIframe.contentDocument;
    if (!runnerContentDocument) {
      console.log(`${appLogPrefix} no runnerContentWindow element found, returning`);
      return;
    }

    const karmaIncompleteSelector = `.jasmine-incomplete`;
    const incompleteElement = runnerContentDocument.querySelector(karmaIncompleteSelector);
    if (!incompleteElement) {
      console.log(`${appLogPrefix} no incomplete element found, returning`);
      return;
    }
    const incompleteElementTextContent = incompleteElement.textContent;
    if (!incompleteElementTextContent) {
      console.log(`${appLogPrefix} no incomplete text content, returning`);
      return;
    }

    if (!incompleteElementTextContent.includes('Incomplete: fit() or fdescribe() was found')) {
      console.log(`${appLogPrefix} incomplete text content "${incompleteElementTextContent}" invalid, returning`);
      return;
    }
  	console.log(`${appLogPrefix} scrolling down`);
  	window.scrollTo(window.scrollX, window.scrollMaxY);
    clearInterval(mainInterval);
    attemptCount = 0;
  } catch (e) {
    console.error(`${appLogPrefix} error: ${e}`);
    throw e;
  }
}

const mainInterval = setInterval(main, 700);
