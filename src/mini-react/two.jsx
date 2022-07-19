/** @jsxRuntime classic */

/**
 * step 2: render Function
 */
function render(element, container) {
  // 创建节点
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);

  // 挂载 props
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  // 递归子节点
  element.props.children.forEach((child) => render(child, dom));

  // 插入节点
  container.appendChild(dom);
}

function isProperty(key) {
  return key !== 'children';
}

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
  render,
};

/** @jsx MiniReact.createElement */
export const element = (
  <div id="mini-react">
    <div>mini-react: first-child</div>
    <br />
  </div>
);

MiniReact.render(element, document.getElementById('mini-react-root'));
