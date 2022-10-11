import { createVNodeFromDomNode } from '@/delta-based-editor/utils/view';
import { VLeaf } from '@/delta-based-editor/view/vnodes/abstract/vleaf';
import VNode from '@/delta-based-editor/view/vnodes/abstract/vnode';
import { VInline } from '@/delta-based-editor/view/vnodes/vinline';

export abstract class VEmbed extends VLeaf {
  public static tagName = 'SPAN';

  public static createDomNode() {
    return document.createElement(VEmbed.tagName);
  }

  public value(): any {
    return '';
  }

  public length(): number {
    return 1;
  }

  public insertBefore(): void {
    throw new Error('embed node cannot insert child node');
  }

  public getOffsetFromNativeRangePos(node: Node, offset: number): number {
    return -1;
  }

  public getNativeRangePosition(index: number): [Node, number] {
    let offset = [...this.parent.domNode.childNodes].indexOf(this.domNode as ChildNode);
    if (index > 0) {
      offset += 1;
    }
    return [this.parent.domNode, offset];
  }

  public getOffsetFromNativeRangePosition(node: Node, offset: number): number {
    // TODO code
    return -1;
  }

  public split(index: number, _force: boolean): VNode | null {
    return index === 0 ? this : this.next;
  }

  public format(name: string, value: any): void {
    const parent = this.wrap();
    parent.format(name, value);
  }

  public formatAt(index: number, length: number, name: string, value: any): void {
    if (index === 0 && length === this.length()) {
      this.format(name, value);
    }
  }

  public update(): void {
    // empty
  }

  private wrap() {
    const wrapperNode = document.createElement(VInline.tagName);
    const wrapper = createVNodeFromDomNode(wrapperNode);

    this.parent.insertBefore(wrapper, this.next);
    wrapper.insertBefore(this);
    return wrapper;
  }
}