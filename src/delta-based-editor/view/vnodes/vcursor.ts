import { ZERO_WIDTH_NO_BREAK_SPACE } from '@/delta-based-editor/utils/view';
import { VEmbed } from '@/delta-based-editor/view/vnodes/abstract/vembed';
import VNode from '@/delta-based-editor/view/vnodes/abstract/vnode';
import { VBlock } from '@/delta-based-editor/view/vnodes/vblock';

export class VCursor extends VEmbed {
  public static tagName = 'SPAN';

  public static createDomNode(): HTMLElement {
    return document.createElement(VCursor.tagName);
  }

  public textNode: Text;
  private savedLength = 0;

  public constructor(domNode: Node) {
    super(domNode);
    this.textNode = document.createTextNode(ZERO_WIDTH_NO_BREAK_SPACE);
    this.domNode.appendChild(this.textNode);
  }

  public override length(): number {
    return this.savedLength;
  }

  /**
   * cursor 本身没长度，所以 offset 为 0
   */
  public override getOffsetFromNativeRangePos(node: Node, offset: number): number {
    return 0;
  }

  public override detach(): void {
    this.parent.children.remove(this);
  }

  public override update() {
    const { mutations } = this;
    if (!mutations) {
      return;
    }

    if (mutations.some(mutation => mutation.type === 'characterData' && mutation.target === this.textNode)) {
      this.restore();
    }
  }

  public formatCursor(name: string, value: any): void {
    let index = 0;
    let target: VNode = this;

    // 计算出光标在 p 节点中的 offset，且找到 p 节点
    while (target && !(target instanceof VBlock)) {
      index += target.offset(target.parent);
      target = target.parent;
    }

    if (target) {
      this.savedLength = 1;
      target.formatAt(index, this.length(), name, value);
      this.savedLength = 0;
    }
  }

  /**
   * 这个方法在光标处有用户输入时，需要将本 cursor 提出来，因为它是 embed 类
   * cursor 里的实质内容需要 optimize 到 view tree 里面
   */
  public restore() {
    if (!this.parent) {
      return;
    }
  }
}