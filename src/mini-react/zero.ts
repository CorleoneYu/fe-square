/**
 * what these code do?
 * const element = <h1 title="foo">Hello</h1>
 * const container = document.getElementById("root")
 * ReactDOM.render(element, container)
 */

// - VDome
const element = {
    type: 'h1',
    props: {
        title: 'foo',
        children: 'Hello',
    },
};

// - create node
const node = document.createElement(element.type);
node.title = element.props.title;

// - create children
const text = document.createTextNode("");
text.nodeValue = element.props.children;

// - append children
node.appendChild(text);

// - append the node to the root
const root = document.getElementById('react-root');
root?.appendChild(node);

export const stepZero = 'zero';
