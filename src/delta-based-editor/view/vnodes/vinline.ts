import { VContainer } from '@/delta-based-editor/view/vnodes/abstract/vcontainer';

export class VInline extends VContainer {
  public static tagName = 'SPAN';

  public static createDomNode() {
    return document.createElement(VInline.tagName);
  }
}