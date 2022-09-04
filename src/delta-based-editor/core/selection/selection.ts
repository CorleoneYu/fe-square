import { ISelection } from '@/delta-based-editor/core/selection/interface';
import { Range } from '@/delta-based-editor/core/selection/range';
import { isDescendant } from '@/delta-based-editor/utils/selection';
import { VCursor } from '@/delta-based-editor/view/vnodes/vcursor';
import { VRoot } from '@/delta-based-editor/view/vnodes/vroot';

interface ISelectionProps {
  input: HTMLDivElement;
  vRoot: VRoot;
}


export class Selection implements ISelection {
  private input: HTMLDivElement;
  private vRoot: VRoot;
  private cursor: VCursor;
  private lastRange: Range | null = null;

  public constructor(props: ISelectionProps) {
    this.vRoot = props.vRoot;
    this.input = props.input;

    this.cursor = new VCursor(VCursor.createDomNode());
    this.lastRange = new Range(0, 0);
  }

  public clear() {
    this.cursor.restore();
    this.lastRange = new Range(0, 0);
  }

  /**
   * 编辑器是否处于 focus:
   * 1. document.activeElement 焦点元素是否在 input 中
   * 2. document.getSelection 选区是否正常
   */
  public hasFocus(): boolean {
    // 焦点元素是否在 input 中
    const isActiveElement = document.activeElement === this.input || isDescendant(this.input, document.activeElement!);
    // 选区状态
    const sel = document.getSelection();
    const selectionStatus = !!(sel && sel.rangeCount > 0);
    return isActiveElement && selectionStatus;
  }

  public focus() {
    if (this.hasFocus()) {
      return;
    }

    this.input.focus();
    // 如果选区为空（异常情况），需要手动设置一下
    const sel = document.getSelection();
    if (sel && !sel.rangeCount) {
      this.setRange(new Range(0, 0));
    }
  }

  public blur() {
    this.input.blur();
  }

  public setRange(range: Range) {

  }

  public getRange() {

  }
}