import { DeltaManager } from '@/delta-based-editor/core/delta-manager';
import { IEditorRange, ISelection } from '@/delta-based-editor/core/selection/interface';
import { Selection } from '@/delta-based-editor/core/selection/selection';
import Delta from '@/delta-based-editor/data/delta';
import { IDeltaBasedEditor, IDeltaBasedEditorProps } from '@/delta-based-editor/interface';
import { EditorInnerEmitter } from '@/delta-based-editor/modules/emitter/editor-emitter';
import { BASE_STYLE } from '@/delta-based-editor/modules/formats/base-style';
import { Bold } from '@/delta-based-editor/modules/formats/bold';
import { IDeltaStyle, IFormatProps } from '@/delta-based-editor/modules/formats/interface';
import { bubbleFormats, getVNodeFromDomNode } from '@/delta-based-editor/utils/view';
import { Styler } from '@/delta-based-editor/view/styler';
import { VRoot } from '@/delta-based-editor/view/vnodes/vroot';

export class DeltaBasedEditor implements IDeltaBasedEditor {
  public innerEmitter = new EditorInnerEmitter();

  private input: HTMLDivElement = document.createElement('div');
  private vRoot!: VRoot;
  private styler!: Styler;
  private deltaManager!: DeltaManager;
  private selection!: ISelection;

  public constructor(props: IDeltaBasedEditorProps) {
    this.initInputDom(props.inputContainer, props.id);
    this.initModules();
    this.initEvents();
  }

  public getDelta(): Delta {
    return this.deltaManager.getDelta();
  }

  public hasFocus() {
    return this.selection.hasFocus();
  }

  public getFormat(): IFormatProps {
    const [, nativeRange] = this.selection.getRange();
    if (!nativeRange) {
      return {};
    }
    const vNode = getVNodeFromDomNode(nativeRange.start.node, true);
    if (!vNode) {
      return {};
    }

    return bubbleFormats(vNode);
  }

  /**
   * 获取当前光标的样式（包括 editor 的 base 样式）
   */
  public getFormatWithBaseStyle(): IDeltaStyle {
    const formatProps = this.getFormat();
    const selectionFormats = {
      ...formatProps,
      bold: formatProps.bold || false,
      italic: formatProps.italic || false,
      strikethrough: formatProps.strikethrough || false,
      underline: formatProps.underline || false,
    };
    return {
      ...BASE_STYLE,
      ...selectionFormats,
    }
  }

  /**
   * 对富文本选区内容进行样式设置
   * 会对 delta 层 和 view 层进行样式信息的更新
   */
  public setFormat(key: string, value: string | number) {
    this.sync();

    return this.modify(() => {
      const range = this.getSelection();
      if (!range) {
        return new Delta();
      }

      // 对光标聚焦情况进行 format 操作
      if (range.getStart() === range.getEnd()) {
        this.selection.format(key, value);
        return new Delta();
      }

      // 对 delta-manager 进行改动
      // 同时会修改到 view 层
      return new Delta();
    })
  }

  public getSelection(): IEditorRange | null {
    return this.selection.getRange()?.[0] ?? null
  }

  private initInputDom(parent: HTMLDivElement, id: string) {
    this.input.setAttribute('id', id);
    this.input.setAttribute('contenteditable', 'true');
    this.input.setAttribute('spellcheck', 'false');

    this.input.style.display = 'block';
    this.input.style.position = 'relative';
    this.input.style.width = '100%';
    this.input.style.height = '100%';
    this.input.style.overflowY = 'auto';
    this.input.style.overflowX = 'hidden';
    this.input.style.boxSizing = 'border-box';
    this.input.style.outline = 'none';
    this.input.style.padding = '0px 4px';
    this.input.style.textDecorationSkipInk = 'none';
    // 文字
    this.input.style.lineHeight = '20px';
    this.input.style.fontSize = '14px';
    this.input.style.whiteSpace = 'pre-wrap';
    this.input.style.wordBreak = 'break-word';
    this.input.style.wordWrap = 'break-word';

    parent.appendChild(this.input)
  }

  private initModules() {
    this.styler = this.initStyler();
    this.vRoot = new VRoot({
      domNode: this.input,
      innerEmitter: this.innerEmitter,
      styler: this.styler,
    });
    this.deltaManager = new DeltaManager(this.vRoot);
    this.selection = new Selection({
      vRoot: this.vRoot,
      input: this.input,
    });
  }

  private initEvents() {
    this.innerEmitter.onViewChange(() => {
      this.modify(() => this.deltaManager.update());
    });

    document.addEventListener('selectionchange', () => {
      if (!this.hasFocus()) {
        return;
      }

      // TODO 发送事件
    })
  }

  private initStyler() {
    const styler = new Styler();
    styler.addFormat(Bold.key, new Bold());
    return styler;
  }

  private sync() {
    this.vRoot.sync(undefined);
  }

  // 处理 Delta 改变的 API
  private modify(
    modifier: () => Delta,
  ): Delta {
    const change = modifier();
    if (change.ops.length === 0) {
      return new Delta();
    }

    this.innerEmitter.emitTextChange({
      diffDelta: change,
      delta: this.getDelta(),
    });

    return change;
  }
}