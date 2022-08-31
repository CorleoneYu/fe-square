import { VContainer } from '@/delta-based-editor/view/abstract/vcontainer';

export class VInline extends VContainer {
  public static tagName = 'SPAN';

  public static createDomNode() {
    return document.createElement(VInline.tagName);
  }
}