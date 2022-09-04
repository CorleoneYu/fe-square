import { ZERO_WIDTH_NO_BREAK_SPACE } from '@/delta-based-editor/utils/view';
import { VEmbed } from '@/delta-based-editor/view/vnodes/abstract/vembed';

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