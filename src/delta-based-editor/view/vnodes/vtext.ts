import { createVNodeFromDomNode } from '@/delta-based-editor/utils/view';
import { VLeaf } from '@/delta-based-editor/view/vnodes/abstract/vleaf';
import vnode from '@/delta-based-editor/view/vnodes/abstract/vnode';
import { VInline } from '@/delta-based-editor/view/vnodes/vinline';

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

  public getNativeRangePosition(index: number): [Node, number] {
    return [this.domNode, index];
  }

  public getOffsetFromNativeRangePosition(node: Node, offset: number): number {
    if (this.domNode === node) {
      return offset;
    }

    return -1;
  }

  public format(name: string, value: any): void {
    // empty
  }

  public formatAt(index: number, length: number, name: string, value: any): void {
    const vNode = this.isolate(index, length);
    if (!(vNode instanceof VText)) {
      return;
    }
    const parent = vNode.wrap();
    parent.format(name, value);

  }
  public split(index: number, force: boolean): vnode | null {
    if (index === 0) {
      return this;
    }

    if (index >= this.length()) {
      return this.next;
    }

    // splitText 执行后，dom 节点就被分割了
    const afterText = (this.domNode as Text).splitText(index)
    const after = new VText(afterText);

    this.parent.insertBefore(after, this.next);
    this.text = VText.getValueByNode(this.domNode as Text);
    return after;
  }

  private wrap() {
    const wrapperNode = document.createElement(VInline.tagName);
    const wrapper = createVNodeFromDomNode(wrapperNode);
    this.parent.insertBefore(wrapper, this.next);
    wrapper.insertBefore(this);
    return wrapper;
  }
}