import React, { View } from "react-native";
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from "@fortawesome/react-native-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  name: string;
  customStyle?: FontAwesomeIconStyle;
  size?: number;
};

const Icon = (icon: IconProps) => {
  return (
    <View>
      <FontAwesomeIcon
        icon={icon.name as IconName}
        style={[{ color: "#FFF" }, icon.customStyle]}
        size={icon.size || 20}
      />
    </View>
  );
};

export type { IconProps };
export { Icon };
