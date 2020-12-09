export enum ColType {
  text = 'text',
  number = 'number',
  select = 'select',
  date = 'date',
  people = 'people',
}

export interface IColProps {
  colId: string;
  type: ColType;
  name?: string;
}

class Col {
  public colId: string;
  public type: ColType;
  private name: string = '';

  public constructor(props: IColProps) {
    const { colId, type, name = '' } = props;
    this.colId = colId;
    this.type = type;
    this.name = name;
  }

  public get colName() {
    return this.name ? this.name : `未命名列 ${this.colId}`;
  }
}

export default Col;
