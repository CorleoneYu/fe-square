/** @jsxRuntime classic */

/**
 * step 5: render and commit phases
 */

let nextUnitOfWork = null;
let wipRoot = null;

function commitRoot() {
  // add node to dom
  commitWork(wipRoot.child);
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  const domRarent = fiber.parent.dom;
  domRarent.appendChild(fiber.dom);

  // 递归
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    console.log('current fiber', nextUnitOfWork);
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // finish all the work
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // create new fibers
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const current = elements[index];

    const newFiber = {
      type: current.type,
      props: current.props,
      parent: fiber,
      dom: null,
    };
    console.log('newFiber', newFiber);
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  // return next unit of work
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  return null;
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  // set nextUnitOfWork
  nextUnitOfWork = wipRoot;
}

function isProperty(key) {
  return key !== 'children';
}

function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });

  return dom;
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
    <h1>
      <p>p</p>
      <a href="www.baidu.com">百度</a>
    </h1>
    <h2>h2</h2>
  </div>
);

console.log('element', element);
MiniReact.render(element, document.getElementById('mini-react-root'));
