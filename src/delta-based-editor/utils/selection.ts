import { INormalizedNativeRange } from '@/delta-based-editor/core/selection/interface';

export function isDescendant(parent: Node, descendant: Node) {
  let node: Node | null = descendant;
  while (node) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }
  return false;
}

export function normalizedNativeRange(nativeRange: Range) {
  const range: INormalizedNativeRange = {
    start: {
      node: nativeRange.startContainer,
      offset: nativeRange.startOffset,
    },
    end: {
      node: nativeRange.endContainer,
      offset: nativeRange.endOffset,
    },
    native: nativeRange,
  };

  // 将 range 的 startContainer/endContainer 收归到 Text 节点
  [range.start, range.end].forEach((position) => {
    let { node, offset } = position;
    while (!(node instanceof Text) && node.childNodes.length > 0) {
      if (node.childNodes.length < offset) {
        break;
      }

      if (node.childNodes.length > offset) {
        node = node.childNodes[offset];
        offset = 0;
        continue;
      }

      // node.childNodes.length === offset
      node = node.lastChild as Node;
      if (node instanceof Text) {
        offset = node.data.length;
      } else if (node.childNodes.length > 0) {
        // container case
        offset = node.childNodes.length
      } else {
        // embed case
        offset = 1;
      }
    }

    position.node = node;
    position.offset = offset;
  })

  return range;
}