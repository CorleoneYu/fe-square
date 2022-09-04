export function isDescendant(parent: Node, child: Node) {
  let node: Node | null = child;
  while (node) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }
  return false;
}
