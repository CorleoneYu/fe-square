import Delta from '@/delta-based-editor/data/delta';
import { NEW_LINE_CHAR } from '@/delta-based-editor/utils/view';
import { VRoot } from '@/delta-based-editor/view/vroot';

/**
 * 数据层与 view 层之间的协调器，同步数据层合 view 层的变化
 * 管理编辑器数据层，也就是 delta
 */
export class DeltaManager {
  private delta: Delta;
  private vRoot: VRoot;

  public constructor(vRoot: VRoot) {
    this.delta = new Delta().insert(NEW_LINE_CHAR);
    this.vRoot = vRoot;
  }
}