/** @jsxRuntime classic */

/**
 * step 1: createElement Function
 */
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'object' ? child : createTextElement(child);
      }),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

const MiniReact = {
  createElement,
};

/** @jsx MiniReact.createElement */
export const element = <div id="mini-react">123</div>;
console.log('[build-my-react]step1: element: ', element);
