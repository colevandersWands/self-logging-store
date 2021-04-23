let isInBrowser = true;
try {
  window;
  document;
  fetch;
  prompt;
  alert;
  confirm;
} catch (err) {
  isInBrowser = false;
}

export { isInBrowser };
