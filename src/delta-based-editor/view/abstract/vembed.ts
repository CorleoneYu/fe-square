import { VLeaf } from '@/delta-based-editor/view/abstract/vleaf';

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

  public update(): void {
    // empty
  }
}