import { VBlock } from '@/delta-based-editor/view/vblock';
import VNode from '@/delta-based-editor/view/abstract/vnode';
import { VRoot } from '@/delta-based-editor/view/vroot';
import Delta from '@/delta-based-editor/data/delta';
import { VText } from '@/delta-based-editor/view/vtext';
import { VInline } from '@/delta-based-editor/view/vinline';

export const NEW_LINE_CHAR_LENGTH = 1;
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

/**
 * 将 vRoots 按行拆分
 * @param vRoot 
 * @param index
 * @param length
 */
export function vRootToLines(vRoot: VRoot, index = 0, length = Number.MAX_VALUE) {
  const lines: VBlock[] = [];
  vRoot.children.forEachAt(index, length, (child) => {
    if (!(child instanceof VBlock)) {
      throw new Error('VRoot has a child that is not a VBlock');
    }
    lines.push(child);
  });
  return lines;
}

/**
 * 将 vBlock 解析成 delta
 * 末尾补上换行符
 * @param vBlock 
 */
export function vBlockToDelta(vBlock: VBlock) {
  return vBlock.getLeaves().reduce((delta, leaf) => {
    if (leaf.length() === 0) {
      return delta;
    }

    return delta.insert(leaf.value(), {})
  }, new Delta()).insert(NEW_LINE_CHAR, {});
}

/**
 * 从某个节点冒泡到根节点，获取所有的 format 集合
 * @param vNode 
 * @param formats 
 * @returns 
 */
export function bubbleFormats(vNode: VNode, formats = {}) {
  if (!vNode) {
    return formats;
  }

  // TODO: 补齐
}

/**
 * 根据 dom 来创建 vNode
 */
export function createVNodeFromDomNode(key: Node | string, value?: any): VNode {
  if (key instanceof Node) {
    if (key.nodeType === Node.TEXT_NODE) {
      return new VText(key);
    }

    if ((key as HTMLElement).tagName === VBlock.tagName) {
      return new VBlock(key);
    }

    if ((key as HTMLElement).tagName === VInline.tagName) {
      return new VInline(key);
    }
  }


  throw new Error('Cannot create VNode with given params');
}