import { isInBrowser } from './is-in-browser.js';

export const calledFrom = isInBrowser
  ? // ()=>new Error().stack
    //         .replace(new RegExp(window.location.origin, 'g'), '')
    //         .split('\n')
    //         .filter(line => line)
    //         .map(line => line.trim())
    //         .pop()
    //         .replaceAll(window.origin, '')
    (() => {
      const isInIframe = window.parent !== window;
      return () => {
        const stack = new Error().stack
          .replace(new RegExp(window.location.origin, 'g'), '')
          .split('\n')
          .filter(line => line)
          .map(line => line.trim())
          .pop()
          .replaceAll(window.origin, '');
        return isInIframe
          ? stack.replaceAll('about:blank', window.parent.location.pathname)
          : stack;
      };
    })()
  : () => {
      const splitStack = new Error().stack
        .split('\n')
        .filter(line => line)
        .map(line => line.trim());
      return splitStack
        .slice(splitStack.length - 3, splitStack.length - 2)
        .pop();
    };
