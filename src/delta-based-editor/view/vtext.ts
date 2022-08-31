import { VLeaf } from '@/delta-based-editor/view/abstract/vleaf';

export class VText extends VLeaf {
  public static tagName = 'text';

  public static createDomNode(value: string) {
    return document.createTextNode(value);
  }

  public static getValueByNode(domNode: Text): string {
    let text = domNode.data;
    if (text.normalize) {
      text = text.normalize();
    }
    return text;
  }

  private text: string = '';

  public constructor(domNode: Node) {
    super(domNode);
    this.text = VText.getValueByNode(this.domNode as Text);
  }

  public length(): number {
    return this.text.length;
  }

  public value(): string {
    return this.text;
  }

  public update() {
    const { mutations } = this;
    if (!mutations) {
      return;
    }

    const shouldUpdate = mutations.some(mutation => mutation.type === 'characterData' && mutation.target === this.domNode);
    if (!shouldUpdate) {
      return;
    }

    // 重新从 dom 获取文本内容
    this.text = VText.getValueByNode(this.domNode as Text);
  }

  public insertBefore(): void {
    throw new Error('Text node cannot insert child node');
  }
}