import type { ITableRow, ITableForm } from "../../types";
export type { ITableRow, ITableForm };

export interface ITableFormProps {
  initialFields: ITableForm;
  title: string;
  submitLabel: string;
  backTo: string;
  backLabel: string;
  onCancel: () => void;
  onSubmit: (fields: ITableForm) => void;
};

export interface IRowEditorProps {
  rows: ITableRow[];
  onChange: (rows: ITableRow[]) => void;
}

export interface ITableRowProps {
  row: ITableRow;
  columns: string[];
  onUpdateCell: (col: string, value: string) => void;
  onRemove: () => void;
  isRemoveDisabled: boolean;
}
export interface IRenderTableRowProps {
  row?: ITableRow;
  columns?: string[];
  onUpdateCell?: (col: string, value: string) => void;
  onRemove?: () => void;
  isRemoveDisabled?: boolean;
}

export interface ITableHeadProps {
  name: string;
  onRename: (newName: string) => void;
  onRemove: () => void;
  isRoll: boolean;
}
export interface IRenderTableHeadProps {
  name?: string;
  isRoll?: boolean;
  onRename?: (value: string) => void;
  onRemove?: () => void;
}
