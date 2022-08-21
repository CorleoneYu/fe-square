import VNode from '@/delta-based-editor/view/vnode';

export const NEW_LINE_CHAR = '\n';

export const VNODE_KEY = '__vnode';

declare global {
  interface Node {
    __vnode?: VNode;
  }
}

export function getVNodeFromDomNode(domNode: Node | null, bubble: boolean = false): VNode | null {
  if (!domNode) {
    return null;
  }

  if (domNode[VNODE_KEY]) {
    return domNode[VNODE_KEY]!;
  }

  if (!bubble) {
    return null;
  }

  return getVNodeFromDomNode(domNode.parentNode, bubble);
}