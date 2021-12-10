export type Nullable<T> = T | null | undefined;

export declare type UnionToIntersection<U> =
  (U extends any ?
    (k: U) => void : never
    ) extends (k: infer I) => void ? I : never;


export interface Content {
  title?: string;
  text?: string;
}
