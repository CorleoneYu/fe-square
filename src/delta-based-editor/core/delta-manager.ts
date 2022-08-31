import Delta from '@/delta-based-editor/data/delta';
import { NEW_LINE_CHAR, vBlockToDelta, vRootToLines } from '@/delta-based-editor/utils/view';
import { VRoot } from '@/delta-based-editor/view/vroot';
import isEqual from 'lodash/isEqual';

interface IDeltaManager {
  update(change?: Delta): Delta;
  getDeltaFromView(): Delta;
}

/**
 * 数据层与 view 层之间的协调器，同步数据层合 view 层的变化
 * 管理编辑器数据层，也就是 delta
 */
export class DeltaManager implements IDeltaManager {
  private delta: Delta;
  private vRoot: VRoot;

  public constructor(vRoot: VRoot) {
    this.delta = new Delta().insert(NEW_LINE_CHAR);
    this.vRoot = vRoot;
  }

  public getDeltaFromView(): Delta {
    return vRootToLines(this.vRoot).reduce((delta, line) => {
      return delta.concat(vBlockToDelta(line));
    }, new Delta());
  }

  /**
   * 更新 delta 的唯一接口
   * 所有的 delta 修改都要走到这
   * 返回 diff 的 delta
   */
  public update(change?: Delta): Delta {
    const oldDelta = this.delta;

    this.delta = this.getDeltaFromView();

    let updateDelta: Delta | undefined;
    if (!change || !isEqual(oldDelta.compose(change), this.delta)) {
      updateDelta = oldDelta.diff(this.delta);
    }

    const delta = updateDelta ?? new Delta();
    console.log('delta: ', delta);
    return delta;
  }
}