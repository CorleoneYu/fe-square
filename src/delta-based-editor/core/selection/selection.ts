import { IEditorRange, INormalizedNativeRange, ISelection } from '@/delta-based-editor/core/selection/interface';
import { EditorRange } from '@/delta-based-editor/core/selection/range';
import { isDescendant, normalizedNativeRange } from '@/delta-based-editor/utils/selection';
import { getVNodeFromDomNode } from '@/delta-based-editor/utils/view';
import { VLeaf } from '@/delta-based-editor/view/vnodes/abstract/vleaf';
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
  private lastRange: IEditorRange | null = null;

  public constructor(props: ISelectionProps) {
    this.vRoot = props.vRoot;
    this.input = props.input;

    this.cursor = new VCursor(VCursor.createDomNode());
    this.lastRange = new EditorRange(0, 0);
  }

  public clear() {
    this.cursor.restore();
    this.lastRange = new EditorRange(0, 0);
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
      this.setRange(new EditorRange(0, 0));
    }
  }

  public blur() {
    this.input.blur();
  }

  /**
   * 光标状态下，进行格式设置
   */
  public format(formatKey: string, value: string | number | boolean): void {
    const nativeRange = this.getNativeRange();
    if (!nativeRange?.native.collapsed) {
      return
    }

    if (nativeRange.start.node !== this.cursor.textNode) {
      const vNode = getVNodeFromDomNode(nativeRange.start.node, true);
      if (!vNode) {
        return;
      }

      const after = vNode.split(nativeRange.start.offset, false);
      vNode.parent.insertBefore(this.cursor, after);
    }

    this.cursor.formatCursor(formatKey, value);


  }

  public setRange(range: EditorRange) {

  }

  public getRange(): [IEditorRange, INormalizedNativeRange] | [null, null] {
    const nativeRange = this.getNativeRange();
    if (!nativeRange) {
      return [null, null];
    }

    return [this.nativeRangeToEditorRange(nativeRange), nativeRange];
  }

  private getNativeRange(): INormalizedNativeRange | null {
    const selection = document.getSelection();
    if (!selection || selection.rangeCount <= 0) {
      return null;
    }

    const nativeRange = selection.getRangeAt(0);

    if (!isDescendant(this.input, nativeRange.startContainer)) {
      // 如果选区开始区域不在 editor 中，返回空
      return null;
    }

    if (!nativeRange.collapsed && isDescendant(this.input, nativeRange.endContainer)) {
      // 如果选区结束区域不在 editor 中，返回空
      return null;
    }

    return normalizedNativeRange(nativeRange);
  }

  private nativeRangeToEditorRange(normalizedNativeRange: INormalizedNativeRange): EditorRange {
    const positions: [Node, number][] = [[normalizedNativeRange.start.node, normalizedNativeRange.start.offset]];
    if (!normalizedNativeRange.native.collapsed) {
      positions.push([normalizedNativeRange.end.node, normalizedNativeRange.end.offset]);
    }

    const indexes = positions.map((position) => {
      const [node, offset] = position;
      const vNode = getVNodeFromDomNode(node, true)!;

      // 叶子节点内部的 offset
      let leafOffset = offset;
      if (vNode instanceof VLeaf) {
        leafOffset = vNode.getOffsetFromNativeRangePosition(node, offset);
      }
      // 叶子节点外部的 offset
      const index = vNode.offset(this.vRoot);
      return index + leafOffset;
    });

    const end = Math.min(Math.max(...indexes), this.vRoot.length() - 1);
    const start = Math.min(end, ...indexes);
    return new EditorRange(start, end);
  }
}