import { MouseEvent } from "react";

export interface DEvent<T = Element> extends MouseEvent<T, DragEvent> {
  dataTransfer: DataTransfer;
}