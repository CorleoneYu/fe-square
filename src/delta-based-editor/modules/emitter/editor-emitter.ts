import { EventEmitter } from 'eventemitter3';

enum EditorInnerEvent {
  viewChange = 'viewChange',
}

export interface IViewChangeEventProps {
  mutations: MutationRecord[];
  context: Record<string, any>;
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

  public removeListener(event: EditorInnerEvent, fn: (...args: any) => void) {
    this.eventEmitter.removeListener(event, fn);
  }
}



