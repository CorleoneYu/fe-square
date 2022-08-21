import { VContainer } from '@/delta-based-editor/view/vcontainer';

export class VBlock extends VContainer {
  public static tagName = 'P';

  public static createDomNode() {
    return document.createElement(VBlock.tagName);
  }
}