export type Nullable<T> = T | null | undefined;

export interface Content {
  title?: string;
  text?: string;
}

export interface IDialog {
  title: string;
  text: string;
  closeDelay: number;
  isConfirm: boolean;
  resolve: (v?: boolean) => void;
}
