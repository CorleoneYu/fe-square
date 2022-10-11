import Delta from '@/delta-based-editor/data/delta';
import { NEW_LINE_CHAR, NEW_LINE_CHAR_LENGTH, vBlockToDelta, vRootToLines } from '@/delta-based-editor/utils/view';
import { VRoot } from '@/delta-based-editor/view/vnodes/vroot';
import isEqual from 'lodash/isEqual';

interface IDeltaManager {
  getLength(): number;
  getDelta(): Delta;
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

  /**
   * 获取文本长度。需要去除最后的 \n
   */
  public getLength(): number {
    return this.delta.length() - NEW_LINE_CHAR_LENGTH;
  }

  public getDelta(): Delta {
    return this.delta.slice(0, this.getLength());
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
    return delta;
  }
}