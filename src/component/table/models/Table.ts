export interface ITableProps {
  rowIds: string[];
  colIds: string[];
  tableId: string;
}

class Table {
  public tableId: string;
  public rowIds: string[] = [];
  public colIds: string[] = [];

  public constructor(props: ITableProps) {
    const { rowIds, colIds, tableId } = props;
    this.tableId = tableId;
    this.rowIds = rowIds;
    this.colIds = colIds;
  }
}

export default Table;
