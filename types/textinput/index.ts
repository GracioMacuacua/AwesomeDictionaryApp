import { Dispatch, SetStateAction } from "react";

export interface TextInputProps {
  label: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}
