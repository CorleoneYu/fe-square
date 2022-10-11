import { EditorInnerEmitter } from '@/delta-based-editor/modules/emitter/editor-emitter';
import { getVNodeFromDomNode } from '@/delta-based-editor/utils/view';
import { VBlock } from '@/delta-based-editor/view/vnodes/vblock';
import { VContainer } from '@/delta-based-editor/view/vnodes/abstract/vcontainer';
import VNode from '@/delta-based-editor/view/vnodes/abstract/vnode';
import { Styler } from '@/delta-based-editor/view/styler';

/**
 * view 层的根节点
 * - 一个 Editor 只有一个 vRoot
 * - 通过 MutationObserver 负责监听 Dom 变化
 */
export class VRoot extends VContainer {
  public static tagName = 'DIV';
  public styler: Styler;

  private mutationObserver!: MutationObserver;
  private innerEmitter: EditorInnerEmitter;

  public static createDomNode() {
    return document.createElement(VRoot.tagName);
  }

  public constructor({ domNode, innerEmitter, styler }: {
    domNode: Node;
    innerEmitter: EditorInnerEmitter;
    styler: Styler;
  }) {
    super(domNode);
    this.root = this;
    this.innerEmitter = innerEmitter;
    this.styler = styler;

    this.startMutationObserver();

    this.clean();
  }

  public clean() {
    for (const child of this.children) {
      child.remove();
    }
    this.optimize();
  }

  public remove() {
    throw new Error('root node cannot be removed');
  }

  public insertBefore(childVNode: VNode, refChild?: VNode | null) {
    if (!(childVNode instanceof VBlock)) {
      throw new Error('root node can only insert block');
    }

    super.insertBefore(childVNode, refChild);
  }

  public override formatAt(index: number, length: number, name: string, value: any): void {
    this.children.forEachAt(index, length, (child, offset, length) => {
      child.formatAt(offset, length, name, value);
    });
    this.optimize();
  }

  /**
   * 把整个 Dom 的内容同步到 vTree，并且进行整理。
   */
  public sync(mutations?: MutationRecord[]) {
    const context = {};
    mutations = mutations || this.mutationObserver.takeRecords();

    if (mutations.length === 0) {
      return;
    }

    // 收集此次变更对应的 vNode
    mutations.map((mutation: MutationRecord) => {
      const vNode = getVNodeFromDomNode(mutation.target, true);
      if (!vNode) {
        return null;
      }

      // 此次更新中第一次遇到这个 vNode, 创建 mutations 数组
      if (!vNode.mutations) {
        vNode.mutations = [mutation];
        return vNode;
      }

      // 第二次遇到这个 vNode
      vNode.mutations.push(mutation);

      // 返回 null，因为之前已经遇到过了
      return null;
    }).forEach((vNode: VNode | null) => {
      if (!vNode || vNode === this) {
        return;
      }

      vNode.update(context);
    });

    if (this.mutations) {
      this.update(context);
    }

    this.optimize(context);

    this.innerEmitter.emitViewChange({
      mutations,
      context,
    });
  }

  public optimize(context: Record<string, any> = {}) {
    super.optimize(context);

    if (this.children.getSize() === 0) {
      const child = new VBlock(VBlock.createDomNode());
      this.insertBefore(child);
      child.optimize(context);
    }
  }

  private startMutationObserver() {
    this.mutationObserver = new MutationObserver((mutationList) => {
      this.sync(mutationList);
    });

    this.mutationObserver.observe(this.domNode, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
      characterDataOldValue: true,
    })
  }
}
