import { IErrorInputTextProps } from "../types";

export default function ErrorInputText({ children }: IErrorInputTextProps) {
    return children ? <p className="text-red-500 text-sm mt-1">{children}</p> : null;
  }