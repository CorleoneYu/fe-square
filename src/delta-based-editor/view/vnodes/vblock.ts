import { NEW_LINE_CHAR_LENGTH } from '@/delta-based-editor/utils/view';
import { VContainer } from '@/delta-based-editor/view/vnodes/abstract/vcontainer';
import { VBreak } from '@/delta-based-editor/view/vnodes/vbreak';

export class VBlock extends VContainer {
  public static tagName = 'P';

  public static createDomNode() {
    return document.createElement(VBlock.tagName);
  }

  public override length(): number {
    return super.length() + NEW_LINE_CHAR_LENGTH;
  }

  public override optimize(context: Record<string, any>): void {
    super.optimize(context);
    if (this.children.getSize() !== 0) {
      return;
    }
    // 如果没有子元素，则使用 br 占位
    let childDomNode: Node;
    if (
      this.domNode.childNodes.length === 1
      && (this.domNode.lastChild as HTMLElement).tagName === 'BR'
    ) {
      childDomNode = this.domNode.lastChild as Node;
    } else {
      childDomNode = VBreak.createDomNode();
    }
    const child = new VBreak(childDomNode);
    this.insertBefore(child);
    child.optimize();
  }
}