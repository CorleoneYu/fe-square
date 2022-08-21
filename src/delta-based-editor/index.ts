import { DeltaManager } from '@/delta-based-editor/core/delta-manager';
import { IDeltaBasedEditor, IDeltaBasedEditorProps } from '@/delta-based-editor/interface';
import { VRoot } from '@/delta-based-editor/view/vroot';

export class DeltaBasedEditor implements IDeltaBasedEditor {
  private input: HTMLDivElement = document.createElement('div');
  private vRoot!: VRoot;
  private deltaManager!: DeltaManager;

  public constructor(props: IDeltaBasedEditorProps) {
    this.initInputDom(props.inputContainer, props.id);
    this.initModules();
  }

  // contenteditable
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
    this.vRoot = new VRoot(this.input);
    this.deltaManager = new DeltaManager(this.vRoot);
  }
}