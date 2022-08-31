import { VEmbed } from '@/delta-based-editor/view/abstract/vembed';

export class VBreak extends VEmbed {
  public static tagName = 'BR';

  public static createDomNode(): HTMLElement {
    return document.createElement(VBreak.tagName);
  }

  public optimize(): void {
    if (this.prev || this.next) {
      // 如果有父元素有其他节点，则需要移除站位 br
      this.remove();
    }
  }

  public override length(): number {
    return 0;
  }
}