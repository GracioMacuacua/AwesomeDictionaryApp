import { COLOR } from "../theme/color";

export type ColorProps = {
  selected: string;
  color: { name: COLOR; code: string };
  onSelect: (name: COLOR) => void;
};
