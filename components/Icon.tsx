import { IconProps } from "@/types/icon";
import React, { View } from "react-native";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Icon = ({ name, style, size }: IconProps) => {
  return (
    <View>
      <FontAwesomeIcon
        icon={name as IconName}
        style={[{ color: "#FFF" }, style]}
        size={size ?? 20}
      />
    </View>
  );
};

export { Icon };
