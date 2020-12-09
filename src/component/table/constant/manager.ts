import { CellManager, ColManager, TableManager, RowManager } from '../models';

const manager = {
  cellManager: new CellManager(),
  colManager: new ColManager(),
  rowManager: new RowManager(),
  tableManager: new TableManager(),
};

export default manager;
