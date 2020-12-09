export interface IRowProps {
  rowId: string;
  colIds: string[]; // 列 id 列表
}

class Row {
  public rowId: string;
  public colIds: string[] = [];

  public constructor(props: IRowProps) {
    const { rowId, colIds } = props;
    this.rowId = rowId;
    this.colIds = colIds;
  }
}

export default Row;
