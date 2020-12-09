import Table, { ITableProps } from './Table';

class TableManager {
  public tableMap: Map<string, Table> = new Map();

  public createTable(props: ITableProps) {
    const table = new Table(props);
    this.tableMap.set(table.tableId, table);
    return table;
  }
}

export default TableManager;
