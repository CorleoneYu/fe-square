import Delta from '@/delta-based-editor/data/delta';
import { EventEmitter } from 'eventemitter3';

export enum EditorInnerEvent {
  viewChange = 'viewChange',
  textChange = 'textChange',
}

export interface IViewChangeEventProps {
  mutations: MutationRecord[];
  context: Record<string, any>;
}

export interface ITextChangeEventProps {
  diffDelta: Delta;
  delta: Delta;
}

/**
 * 编辑器内部事件
 * 仅供内部使用
 */
export class EditorInnerEmitter {
  private eventEmitter = new EventEmitter();

  public emitViewChange(props: IViewChangeEventProps) {
    this.eventEmitter.emit(EditorInnerEvent.viewChange, props);
  }

  public onViewChange(fn: (props: IViewChangeEventProps) => void) {
    this.eventEmitter.addListener(EditorInnerEvent.viewChange, fn);
  }

  public emitTextChange(props: ITextChangeEventProps) {
    this.eventEmitter.emit(EditorInnerEvent.textChange, props);
  }

  public onTextChange(fn: (props: ITextChangeEventProps) => void) {
    this.eventEmitter.addListener(EditorInnerEvent.textChange, fn);
  }

  public removeListener(event: EditorInnerEvent, fn: (...args: any) => void) {
    this.eventEmitter.removeListener(event, fn);
  }
}



